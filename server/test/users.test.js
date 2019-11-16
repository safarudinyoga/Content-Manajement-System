// 'use strict'

// const chai = require('chai');
// const chaiHTTP = require('chai-http');

// const server = require('../app');
// const User = require('../models/user');

// const should = chai.should();
// const { expect } = require('chai');
// chai.use(chaiHTTP);

// describe('users', function () {

//     // saya bersihkan dulu document di collection todo
//     User.collection.drop();

//     // Setiap sebelum test, table ditambahkan satu data 'Belajar TDD'
//     beforeEach(function (done) {
//         let user = new User({
//             email: 'tole@rubicamp.com',
//             password: '123',
//             token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvbGVAcnViaWNhbXAuY29tIiwiaWF0IjoxNTczODM4Njk4fQ.KwGpTI-S9yjR67nr1qShIuWai6f96eidk0sTrpF0UGk"
//         });

//         user.save(function (err) {
//             done();
//         });
//     });

//     // setiap melakukan test , table di drop
//     afterEach(function (done) {
//         User.collection.drop();
//         done();
//     });

//     // it should return
//     it('should get all user list in the table users with method GET', function (done) {
//         chai.request(server).get('/api/users/list').end(function (err, res) {
//             // console.log(res);
//             res.should.have.status(200);
//             res.should.be.json;
//             res.body.should.be.a('array');
//             res.body[0].should.have.property('_id');
//             res.body[0].should.have.property('email');
//             res.body[0].should.have.property('password');
//             res.body[0].should.have.property('token');
//             res.body[0].email.should.equal('tole@rubicamp.com');
//             done();
//         });
//     });

//     it('Should add 1 users with method POST', function (done) {
//         chai.request(server).post('/api/users/register').send({
//             email: 'testmail@rubicamp.com',
//             password: '123',
//             retypepassword: '123'
//         }).end(function (err, res) {
//             res.should.have.status(201);
//             res.should.be.json;
//             res.body.should.be.a('object');
//             res.body.should.have.property('status');
//             res.body.should.have.property('message');
//             res.body.should.have.property('data');
//             res.body.should.have.property('token');
//             expect(res.body.token).to.exist;
//             res.body.status.should.equal(true);
//             res.body.message.should.equal('Register Success');
//             res.body.data.email.should.equal('testmail@rubicamp.com');
//             done();
//         });
//     });

//     it('Should login with metode POST', function (done) {
//         chai.request(server).post('/api/users/login').send({
//             email: 'testmail@rubicamp.com',
//             password: '123'
//         }).end(function (err, res) {
//             res.should.have.status(200);
//             res.should.be.json;
//             res.body.should.be.a('object');
//             res.body.should.have.property('status');
//             res.body.should.have.property('message');
//             res.body.should.have.property('data');
//             res.body.should.have.property('token');
//             expect(res.body.token).to.exist;
//             res.body.status.should.equal(false);
//             res.body.message.should.equal('Email or Password not valid');
//             // res.body.data.equal.should.equal('testmail@rubicamp.com');
//             done();
//         });
//     });

//     it('Shoult can check token with method POST', function (done) {
//         chai.request(server).post('/api/users/check').send({
//             email: 'testmail@rubicamp.com',
//             password: '123'
//         }).end(function (err, res) {
//             res.should.have.status(500);
//             // res.should.be.json;
//             // res.body.should.be.a('object');
//             // res.body.should.have.property('valid');
//             // res.body.valid.should.equal(true);
//             done()
//         })
//     })

//     it('Shoult can Logout with method POST', function (done) {
//         chai.request(server).post('/api/users/destroy').send({
//             email: 'testmail@rubicamp.com',
//             password: '123'
//         }).end(function (err, res) {
//             res.should.have.status(500);
//             // res.should.be.json;
//             // res.body.should.be.a('object');
//             // res.body.should.have.property('valid');
//             // res.body.valid.should.equal(true);
//             done()
//         })
//     })

// })

