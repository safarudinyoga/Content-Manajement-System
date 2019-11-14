var express = require('express');
var router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.find({}).exec().then(result => {
    console.log('keluar');
    res.status(200).json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
});

// Register
router.post('/register', (req, res, next) => {
  let response = {
    status: false,
    message: '',
    data: {},
    token: ''
  }
  let { email, password, retypepassword } = req.body
  if (password == retypepassword) {
    User.findOne({ email }).then(result => {
      if (result) {
        response.message = 'Email Exist'
        res.json(response)
      } else {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) console.log(err);
          else {
            const token = jwt.sign({
              email: email
            }, 'secret')
            const user = new User({
              email: req.body.email,
              password: hash,
              token: token
            })
            user.save().then(data => {
              response.status = true
              response.message = 'Register Success'
              response.data.email = email
              response.data.password = password
              response.token = token
              res.status(201).json(response)
              console.log(data);
            }).catch(err => {
              response.message = 'Email or Password not valid'
              res.json(response)
            })
          }
        })
      }
    })
  } else {
    response.message = 'Password not match'
    res.json(response)
  }
})

// Login
router.post('/login', (req, res, next) => {
  let { email, password } = req.body
  let response = {
    status: false,
    message: '',
    data: {},
    token: ''
  }
  User.find({ email }).then(result => {
    console.log(result[0]);
    if (result) {
      bcrypt.compare(password, result[0].password, (err, data) => {
        console.log(data); //true
        if (err) {
          response.message = 'Auth Failed'
          res.status(401).json(response)
        } else if (data) {
          const newToken = jwt.sign({ email: email }, 'secret')
          response.status = true
          response.message = "Login Success"
          response.data.email = email
          response.token = newToken
          console.log(response.token);
          User.updateOne({ email }, { token: newToken }, ((err) => {
            if (err) {
              response.message = "Error Found!"
              res.status(401).json(response)
            } else {
              res.status(201).json(response)
            }
          }))
        } else {
          response.message = "Wrong Email or Password"
          res.status(401).json(response)
        }
      })
    } else {
      response.message = 'Auth Failed'
      res.status(401).json(response)
    }
  })
})

// Check Token
router.post('/check', (req, res, next) => {
  // console.log(req.headers.authorization);
  let header = req.headers.authorization
  let response = {
    valid: false
  }
  // console.log(typeof header !== undefined);
  if (typeof header !== undefined) {
    let checkToken = jwt.verify(header, 'secret')
    console.log(checkToken);
    User.find({ email: checkToken.email }).then(result => {
      console.log(result);
      if (result) {
        response.valid = true
        res.status(200).json(response)
      } else {
        res.status(500).json(response)
      }
    }).catch(err => {
      res.status(500).json(response)
    })
  } else {
    res.status(500).json(response)
  }
})

router.post('/destroy', (req, res, next) => {
  let header = req.headers.authorization
  let response = {
    logout: false
  }
  if (typeof header !== undefined) {
    let checkToken = jwt.verify(header, 'secret')
    User.findOneAndUpdate({ email: checkToken.email }, { token: '' }).exec().then(result => {
      if (result) {
        response.logout = true
        res.status(200).json(response)
      } else {
        res.status(500).json(response)
      }
    }).catch(err => {
      res.status(500).json(response)
    })
  } else {
    res.status(500).json(response)
  }
})

module.exports = router;
