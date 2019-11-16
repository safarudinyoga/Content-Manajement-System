var express = require('express');
var router = express.Router();
const Data = require('../models/data');

// Read Data
router.get('/', (req, res, next) => {
    Data.find().then(data => {
        res.json(data)
    }).catch(err => {
        res.status(400).json(response);
    })
})

router.get('/bar', (req, res, next) => {
    Data.aggregate().group(
        {
            _id: "$letter",
            total: { $sum: "$frequency" }
        }
    ).exec().then((data) => {
        res.json(data);
    }).catch(err => {
        res.status(400).json(response);
    })
})

// ADD data
router.post('/', (req, res, next) => {
    let { letter, frequency } = req.body;
    let response = {
        success: false,
        message: '',
        data: {
            _id: '',
            letter: '',
            frequency: null
        }

    }
    if (letter != undefined || frequency != undefined) {
        const data = new Data({
            letter,
            frequency
        })
        data.save().then(result => {
            response.success = true;
            response.message = 'Success add Data';
            response.data._id = result.id;
            response.data.letter = result.letter;
            response.data.frequency = result.frequency;
            res.status(201).json(response)
        }).catch(err => {
            response.message = 'letter and frequency cannot empty'
        })
    } else {
        response.message = 'Add Data cant be empty'
        res.status(400).json(response)
    }
})

// Browse Data
router.post('/search', (req, res, next) => {
    let { letter, frequency } = req.body;
    if (letter != undefined || frequency.toString() != 'NaN') {
        let filterData = {};
        letter ? filterData.letter = { $regex: letter, $options: 'i' } : undefined;
        frequency ? filterData.frequency = Number(frequency) : undefined;

        Data.find(filterData).then(data => {
            res.json(data);
        }).catch(err => res.status(400).json(err));
    } else {
        response.message = 'Search Data cant be empty'
        res.status(400).json(response)
    }
})

// Edit Data
router.put('/:id', (req, res, next) => {
    let { letter, frequency } = req.body
    let id = req.params.id
    let response = {
        success: false,
        message: '',
        data: {}
    }
    if (letter != undefined || frequency != undefined) {
        let updatedData = {}
        letter ? updatedData.letter = letter : '';
        frequency ? updatedData.frequency = frequency : '';

        Data.findByIdAndUpdate(id, updatedData).exec().then(data => {
            console.log(data);
            response.success = true;
            response.message = 'Success update Data';
            response.data._id = id;
            response.data.letter = letter || data.letter;
            response.data.frequency = frequency || data.frequency;
            res.status(201).json(response);
        })
    } else {
        response.message = 'Data cant be empty'
        res.status(400).json(response)
    }
})

// Delete Data
router.delete('/:id', (req, res, next) => {
    let id = req.params.id
    let response = {
        success: false,
        message: '',
        data: {}
    }
    Data.findByIdAndDelete(id).exec().then(data => {
        response.success = true;
        response.message = 'Data Deleted';
        response.data._id = id;
        response.data.letter = data.letter;
        response.data.frequency = data.frequency;
        res.status(201).json(response);
    }).catch(err => {
        response.message = 'Wrong Data ID'
        res.status(400).json(response);
    })
})

// FIND Data
router.get('/:id', (req, res, next) => {
    let id = req.params.id
    let response = {
        success: false,
        message: '',
        data: {}
    }
    Data.findById(id).exec().then(data => {
        if (data) {
            response.success = true;
            response.message = 'Data Found';
            response.data._id = id;
            response.data.letter = data.letter;
            response.data.frequency = data.frequency;
            res.status(201).json(response);
        } else {
            response.message = 'Data not found'
            res.status(400).json(response);
        }
    }).catch(err => {
        response.message = 'Wrong Data'
        res.status(400).json(response);
    })
})

module.exports = router;
