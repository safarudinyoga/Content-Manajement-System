'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const Datadate = require('../models/datadate');

const should = chai.should();
const { expect } = require('chai');
chai.use(chaiHTTP);

describe('datadate', function () {

    // saya bersihkan dulu document di collection todo
    Datadate.collection.drop();

    // Setiap sebelum test, table ditambahkan satu data 'Belajar TDD'
    beforeEach(function (done) {
        let datadate = new Datadate({
            letter: '27-12-31',
            frequency: 1.1
        });

        datadate.save(function (err) {
            if (err) console.log(err);
            else done();
        });
    });

    // setiap melakukan test , table di drop
    afterEach(function (done) {
        Datadate.collection.drop();
        done();
    });

    // READ DATA DATE
    it('Should return all data with method GET', function (done) {
        chai.request(server).get('/api/datadate/').end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('letter');
            res.body[0].should.have.property('frequency');
            res.body[0].letter.should.equal('27-12-31');
            res.body[0].frequency.should.equal(1.1);
            done();
        })
    })

    // BROWSE DATA DATE
    it('Should return value of Browse with method POST', function (done) {
        chai.request(server).post('/api/datadate/search').send({
            letter: '27-12-31',
            frequency: 1.1
        }).end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('letter');
            res.body[0].should.have.property('frequency');
            res.body[0].letter.should.equal('27-12-31');
            res.body[0].frequency.should.equal(1.1);
            done();
        })
    })

    // ADD DATA DATE
    it('Should add data date with method POST', function (done) {
        chai.request(server).post('/api/datadate/').send({
            letter: '27-12-31',
            frequency: 1.1
        }).end(function (err, res) {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('success');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            res.body.data.should.have.property('_id');
            res.body.data.should.have.property('letter');
            res.body.data.should.have.property('frequency');
            res.body.success.should.equal(true)
            res.body.data.letter.should.equal('27-12-31');
            res.body.data.frequency.should.equal(1.1);
            done();
        })
    })

    // EDIT DATA DATE
    it('Should Edit data date with method POST', function (done) {
        chai.request(server).post('/api/datadate/search').send({
            letter: '27-12-31',
            frequency: 1.1
        }).end(function (err, res) {
            console.log(res.body[0]._id);
            chai.request(server).put(`/api/datadate/${res.body[0]._id}`).send({
                letter: '27-12-30',
                frequency: 1.2
            }).end(function (err, response) {
                // console.log(response);
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('success');
                response.body.should.have.property('message');
                response.body.should.have.property('data');
                response.body.data.should.have.property('_id');
                response.body.data.should.have.property('letter');
                response.body.data.should.have.property('frequency');
                response.body.success.should.equal(true)
                response.body.data.letter.should.equal('27-12-30');
                response.body.data.frequency.should.equal(1.2);
                done();
            })
        })
    })

    // DELETE DATA DATE
    it('Should delete data date with method DELETE', function (done) {
        chai.request(server).post('/api/datadate/search').send({
            letter: '27-12-31',
            frequency: 1.1
        }).end(function (err, res) {
            chai.request(server).delete(`/api/datadate/${res.body[0]._id}`).end(function (err, response) {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('success');
                response.body.should.have.property('message');
                response.body.should.have.property('data');
                response.body.data.should.have.property('_id');
                response.body.data.should.have.property('letter');
                response.body.data.should.have.property('frequency');
                response.body.success.should.equal(true)
                response.body.data.letter.should.equal('27-12-31');
                response.body.data.frequency.should.equal(1.1);
                done();
            })
        })
    })

    // FIND
    it('Should find data date with method GET', function (done) {
        chai.request(server).post('/api/datadate/search').send({
            letter: '27-12-31',
            frequency: 1.1
        }).end(function (err, res) {
            console.log(res.body[0]);

            chai.request(server).get(`/api/datadate/${res.body[0]._id}`).end(function (err, response) {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('success');
                response.body.should.have.property('message');
                response.body.should.have.property('data');
                response.body.data.should.have.property('_id');
                response.body.data.should.have.property('letter');
                response.body.data.should.have.property('frequency');
                response.body.success.should.equal(true)
                response.body.data.letter.should.equal('27-12-31');
                response.body.data.frequency.should.equal(1.1);
                done();
            })
        })
    })

})