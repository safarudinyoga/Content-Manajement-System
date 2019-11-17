'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const Data = require('../models/data');

const should = chai.should();
const { expect } = require('chai');
chai.use(chaiHTTP);

describe('data', function () {
    // saya bersihkan dulu document di collection todo
    Data.collection.drop();

    // Setiap sebelum test, table ditambahkan satu data 'Belajar TDD'
    beforeEach(function (done) {
        let data = new Data({
            letter: 'A',
            frequency: 1.1
        });

        data.save(function (err) {
            if (err) console.log(err);
            else done();
        });
    });

    // setiap melakukan test , table di drop
    afterEach(function (done) {
        Data.collection.drop();
        done();
    });

    // Read Data GET
    // it should return
    it('Should return all the data with method GET', function (done) {
        chai.request(server).get('/api/data/').end(function (err, res) {
            // console.log(res.body[0]);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('letter');
            res.body[0].should.have.property('frequency');
            res.body[0].letter.should.equal('A');
            res.body[0].frequency.should.equal(1.1);
            done();
        })
    })

    // BROWSE
    it('Should return value of Browse with method POST', function (done) {
        chai.request(server).post('/api/data/search').send({
            letter: 'A',
            frequency: 1.1
        }).end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('letter');
            res.body[0].should.have.property('frequency');
            res.body[0].letter.should.equal('A');
            res.body[0].frequency.should.equal(1.1);
            done();
        })
    })

    // ADD DATA
    it('should add data with method POST', function (done) {
        chai.request(server).post('/api/data/').send({
            letter: 'A',
            frequency: 1.1
        }).end(function (err, res) {
            // console.log(res.body);
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('success');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            res.body.data.should.have.property('_id');
            res.body.data.should.have.property('letter');
            res.body.data.should.have.property('frequency');
            res.body.success.should.equal(true)
            res.body.data.letter.should.equal('A');
            res.body.data.frequency.should.equal(1.1);
            done();
        })
    })

    // EDIT DATA
    it('Should return edited data with method PUT', function (done) {
        chai.request(server).post('/api/data/search').send({
            letter: 'A',
            frequency: 1.1
        }).end(function (err, res) {
            chai.request(server).put(`/api/data/${res.body[0]._id}`).send({
                letter: 'B',
                frequency: 1.2
            }).end(function (err, response) {
                // console.log(response.body.data);
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('success');
                response.body.should.have.property('message');
                response.body.should.have.property('data');
                response.body.data.should.have.property('_id');
                response.body.data.should.have.property('letter');
                response.body.data.should.have.property('frequency');
                response.body.data.letter.should.equal('B');
                response.body.data.frequency.should.equal(1.2);
                done();
            })
        })
    })

    // DELETE DATA
    it('Should delete data with method DELETE', function (done) {
        chai.request(server).post('/api/data/search').send({
            letter: 'A',
            frequency: 1.1
        }).end(function (err, res) {
            chai.request(server).delete(`/api/data/${res.body[0]._id}`).end(function (err, response) {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('success');
                response.body.should.have.property('message');
                response.body.should.have.property('data');
                response.body.data.should.have.property('_id');
                response.body.success.should.equal(true)
                response.body.data.should.have.property('letter');
                response.body.data.should.have.property('frequency');
                response.body.data.letter.should.equal('A');
                response.body.data.frequency.should.equal(1.1);
                done();
            })
        })
    })

    // FIND DATA
    it('Should find data with method GET', function (done) {
        chai.request(server).post('/api/data/search').send({
            letter: 'A',
            frequency: 1.1
        }).end(function (err, res) {
            chai.request(server).get(`/api/data/${res.body[0]._id}`).end(function (err, response) {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('success');
                response.body.should.have.property('message');
                response.body.should.have.property('data');
                response.body.data.should.have.property('_id');
                response.body.success.should.equal(true)
                response.body.data.should.have.property('letter');
                response.body.data.should.have.property('frequency');
                response.body.data.letter.should.equal('A');
                response.body.data.frequency.should.equal(1.1);
                done();
            })
        })
    })

})