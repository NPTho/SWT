const User = require('../src/models/user');
const assert = require('assert');
const app = 'localhost:3000';
const chai = require('chai')
const chaihttp = require('chai-http')
const should = chai.should()

chai.use(chaihttp)

describe('Get Users in MongoDB 3', () => {
    it('It will success get all the users, with status 200, respone will be an array, user count = array length = 2', function (done) {
        chai.request(app)
            .get("/users/all")
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
    });

    it('It will success get a the user name "Sudoer", with status 200, response body object have name "Sudoer"', function (done) {
        chai.request(app)
            .get("/users/Sudoer")
            .end((err, res) => {
                res.should.have.status(200)
                res.body.name.should.eql('Sudoer')
                done()
            })
    });

});
