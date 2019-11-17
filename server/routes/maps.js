var express = require('express');
var router = express.Router();
const Maps = require('../models/maps');

// READ DATA
router.get('/', (req, res, next) => {
    Maps.find().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(400).json(err);
    });
});

// ADD DATA MAPS
router.post('/', (req, res, next) => {
    let { title, lat, lng } = req.body;
    let response = {
        success: false,
        message: '',
        data: {
            _id: '',
            title: '',
            lat: null,
            lng: null
        }
    }
    if (title != undefined || lat != undefined || lng != undefined) {
        const maps = new Maps({
            title,
            lat,
            lng
        })
        maps.save().then(data => {
            response.success = true;
            response.message = 'maps has been added';
            response.data._id = data.id;
            response.data.title = data.title;
            response.data.lat = data.lat;
            response.data.lng = data.lng;
            res.status(201).json(response);
        }).catch(err => {
            response.message = 'title, lat, lng cannot empty';
            res.status(400).json(response);
        });
    } else {
        response.message = 'Add Data cant be empty';
        res.status(400).json(response);
    }
})

// BROWSE MAPS
router.post('/search', (req, res, next) => {
    let { title, lat, lng } = req.body;
    let response = {
        message: ''
    }
    if (title != undefined) {
        let filterMaps = {}
        title ? filterMaps.title = { $regex: title, $options: 'i' } : undefined;
        Maps.find(filterMaps).then(data => {
            res.status(200).json(data)
        }).catch(err => {
            response.message = 'data not exist'
            res.status(400).json(response)
        })
    } else {
        response.message = 'Search Data cant be empty'
        res.status(400).json(response)
    }
})

// EDIT DATA MAPS
router.put('/:id', (req, res, next) => {
    let { title, lat, lng } = req.body;
    let id = req.params.id;
    let response = {
        success: false,
        message: '',
        data: {
            _id: '',
            title: '',
            lat: null,
            lng: null
        }
    }
    if (title != undefined || lat != undefined || lng != undefined) {
        let updateMaps = {}
        title ? updateMaps.title = title : '';
        lat ? updateMaps.lat = lat : '';
        lng ? updateMaps.lng = lng : '';
        Maps.findByIdAndUpdate(id, updateMaps).then(data => {
            console.log(data);
            response.success = true;
            response.message = 'data maps have been updated';
            response.data._id = id;
            response.data.title = title || data.title;
            response.data.lat = Number(lat) || data.lat;
            response.data.lng = Number(lng) || data.lng;
            res.status(201).json(response);
        }).catch(err => {
            response.message = 'data not exist'
            res.status(400).json(response)
        })
    } else {
        response.message = 'update Data cant be empty'
        res.status(400).json(response)
    }
})

// DELETE DATA MAPS
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    let response = {
        success: false,
        message: '',
        data: {}
    }
    Maps.findOneAndRemove(id).then(data => {
        if (data) {
            response.success = true;
            response.message = 'data found';
            response.data._id = id;
            response.data.title = data.title;
            response.data.lat = data.lat;
            response.data.lng = data.lng;
            res.status(201).json(response);
        } else {
            response.message = 'data not found';
            res.status(400).json(response);
        }
    }).catch(err => {
        response.message = 'data not exist'
        res.status(400).json(response)
    })
})

// FIND DATA MAPS
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    let response = {
        success: false,
        message: '',
        data: {}
    }
    Maps.findById(id).then(data => {
        if (data) {
            response.success = true;
            response.message = 'data found';
            response.data._id = id;
            response.data.title = data.title;
            response.data.lat = data.lat;
            response.data.lng = data.lng;
            res.status(201).json(response);
        } else {
            response.message = 'data not found';
            res.status(400).json(response);
        }
    }).catch(err => {
        response.message = 'data not exist'
        res.status(400).json(response)
    })
})

module.exports = router;