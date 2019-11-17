'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const Maps = require('../models/maps');

const should = chai.should();
const { expect } = require('chai');
chai.use(chaiHTTP);

describe('maps', function () {

    // saya bersihkan dulu document di collection todo
    Maps.collection.drop();

    // Setiap sebelum test, table ditambahkan satu data 'Belajar TDD'
    beforeEach(function (done) {
        let maps = new Maps({
            title: 'test',
            lat: -1.1,
            lng: 101.1
        });

        maps.save(function (err) {
            if (err) console.log(err);
            else done();
        });
    });

    // setiap melakukan test , table di drop
    afterEach(function (done) {
        Maps.collection.drop();
        done();
    });

    // READ DATA DATE
    it('Should return all data with method GET', function (done) {
        chai.request(server).get('/api/maps/').end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('title');
            res.body[0].should.have.property('lat');
            res.body[0].should.have.property('lng');
            res.body[0].title.should.equal('test');
            res.body[0].lat.should.equal(-1.1);
            res.body[0].lng.should.equal(101.1);
            done();
        })
    })

    // BROWSE DATA DATE
    it('Should return value of Browse with method POST', function (done) {
        chai.request(server).post('/api/maps/search').send({
            title: 'test',
            lat: -1.1,
            lng: 101.1
        }).end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('title');
            res.body[0].should.have.property('lat');
            res.body[0].should.have.property('lng');
            res.body[0].title.should.equal('test');
            res.body[0].lat.should.equal(-1.1);
            res.body[0].lng.should.equal(101.1);
            done();
        })
    })

    // ADD DATA DATE
    it('Should add data date with method POST', function (done) {
        chai.request(server).post('/api/maps/').send({
            title: 'test',
            lat: -1.1,
            lng: 101.1
        }).end(function (err, res) {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('success');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            res.body.data.should.have.property('_id');
            res.body.data.should.have.property('title');
            res.body.data.should.have.property('lat');
            res.body.data.should.have.property('lng');
            res.body.success.should.equal(true)
            res.body.data.title.should.equal('test');
            res.body.data.lat.should.equal(-1.1);
            res.body.data.lng.should.equal(101.1);
            done();
        })
    })

    // EDIT DATA DATE
    it('Should Edit data date with method POST', function (done) {
        chai.request(server).post('/api/maps/search').send({
            title: 'test',
            lat: -1.1,
            lng: 101.1
        }).end(function (err, res) {
            // console.log(res.body[0]._id);
            chai.request(server).put(`/api/maps/${res.body[0]._id}`).send({
                title: 'test',
                lat: -1.1,
                lng: 101.1
            }).end(function (err, response) {
                // console.log(response);
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('success');
                response.body.should.have.property('message');
                response.body.should.have.property('data');
                response.body.data.should.have.property('_id');
                response.body.data.should.have.property('title');
                response.body.data.should.have.property('lat');
                response.body.data.should.have.property('lng');
                response.body.success.should.equal(true)
                response.body.data.title.should.equal('test');
                response.body.data.lat.should.equal(-1.1);
                response.body.data.lng.should.equal(101.1);
                done();
            })
        })
    })

    // DELETE DATA DATE
    it('Should delete data date with method DELETE', function (done) {
        chai.request(server).post('/api/maps/search').send({
            title: 'test',
            lat: -1.1,
            lng: 101.1
        }).end(function (err, res) {
            chai.request(server).delete(`/api/maps/${res.body[0]._id}`).end(function (err, response) {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('success');
                response.body.should.have.property('message');
                response.body.should.have.property('data');
                response.body.data.should.have.property('_id');
                response.body.data.should.have.property('title');
                response.body.data.should.have.property('lat');
                response.body.data.should.have.property('lng');
                response.body.success.should.equal(true)
                response.body.data.title.should.equal('test');
                response.body.data.lat.should.equal(-1.1);
                response.body.data.lng.should.equal(101.1);
                done();
            })
        })
    })

    // FIND
    it('Should find data date with method GET', function (done) {
        chai.request(server).post('/api/maps/search').send({
            title: 'test',
            lat: -1.1,
            lng: 101.1
        }).end(function (err, res) {
            // console.log(res.body[0]);
            chai.request(server).get(`/api/maps/${res.body[0]._id}`).end(function (err, response) {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('success');
                response.body.should.have.property('message');
                response.body.should.have.property('data');
                response.body.data.should.have.property('_id');
                response.body.data.should.have.property('title');
                response.body.data.should.have.property('lat');
                response.body.data.should.have.property('lng');
                response.body.success.should.equal(true)
                response.body.data.title.should.equal('test');
                response.body.data.lat.should.equal(-1.1);
                response.body.data.lng.should.equal(101.1);
                done();
            })
        })
    })

})