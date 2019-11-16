var express = require('express');
var router = express.Router();
const Datadate = require('../models/datadate');

// READ DATADATE
router.get('/', (req, res, next) => {
    Datadate.find().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(400).json(err);
    });
});

// ADD DATADATE
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
        const datadate = new Datadate({
            letter,
            frequency
        });
        datadate.save().then(data => {
            response.success = true;
            response.message = 'datadate has been added';
            response.data._id = data.id;
            response.data.letter = data.letter;
            response.data.frequency = data.frequency;
            res.status(201).json(response);
        }).catch(err => {
            response.message = 'letter and frequency cannot empty';
            res.status(400).json(response);
        });
    } else {
        response.message = 'Add Data cant be empty';
        res.status(400).json(response);
    };
});

// BROWSE DATA DATE
router.post('/search', (req, res, next) => {
    let { letter, frequency } = req.body;
    let response = {
        message: ''
    }
    if (letter != undefined || frequency.toString() != 'NaN') {
        let filterDataDate = {};
        letter ? filterDataDate.letter = { $regex: letter, $options: 'i' } : undefined;
        frequency ? filterDataDate.frequency = Number(frequency) : undefined;

        Datadate.find(filterDataDate).then(data => {
            res.status(200).json(data)
        }).catch(err => res.status(400).json(err))
    } else {
        response.message = 'Search Data cant be empty'
        res.status(400).json(response)
    }
});

// EDIT DATA DATE
router.post('/:id', (req, res, next) => {
    let { letter, frequency } = req.body;
    let id = req.params.id;
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
        let updateDataDate = {}
        letter ? updateDataDate.letter = letter : '';
        frequency ? updateDataDate.frequency = frequency : '';
        Datadate.findByIdAndUpdate(id, updateDataDate).exec().then(data => {
            // console.log(data);
            response.success = true;
            response.message = 'data have been updated';
            response.data._id = id;
            response.data.letter = letter || data.letter;
            response.data.frequency = frequency || data.frequency;
            res.status(201).json(response);
        }).catch(err => {
            response.message = 'data cannot empty';
            res.status(400).json(response);
        })
    } else {
        response.message = 'Data cant be empty';
        res.status(400).json(response);
    }
});

// DELETE DATA DATE
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    let response = {
        success: false,
        message: '',
        data: {}
    }
    Datadate.findByIdAndRemove(id).exec().then(data => {
        // console.log(data);
        response.success = true;
        response.message = 'data have been deleted';
        response.data._id = id;
        response.data.letter = data.letter;
        response.data.frequency = data.frequency;
        res.status(201).json(response);
    }).catch(err => {
        response.message = 'Wrong Data id';
        res.status(400).json(response);
    })
})

// FIND DATA DATE
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    let response = {
        success: false,
        message: '',
        data: {}
    }
    Datadate.findById(id).exec().then(data => {
        if (data) {
            response.success = true;
            response.message = 'data found';
            response.data._id = id;
            response.data.letter = data.letter;
            response.data.frequency = data.frequency;
            res.status(201).json(response);
        } else {
            esponse.message = 'Data not found'
            res.status(400).json(response);
        }
    }).catch(err => {
        response.message = 'Wrong Data'
        res.status(400).json(response);
    })
})

module.exports = router;
