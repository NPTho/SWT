const User = require('../src/models/user');
const assert = require('assert');
const app = require('./db');
const chai = require('chai')
const chaihttp = require('chai-http')
const should = chai.should()

chai.use(chaihttp)

const countUser = (callback) => {
    User.count({}, (err, result) => {
        callback(result)
    })
}

describe('Get Users in MongoDB', () => {
    it('It will success get all the users, with status 200, respone will be an array, user count = array length = 2', function (done) {
        chai.request(app)
            .get("/users/all")
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                countUser((count) => {
                    count.should.eql(res.body.length)           //  user count == array length ?
                    done()
                })
            })
    });

    it('It will success get a the user name "Harry", with status 200, response body object have name "Harry"', function (done) {
        chai.request(app)
            .get("/users/Harry")
            .end((err, res) => {
                res.should.have.status(2000)
                res.body.name.should.eql('Harry')
                done()
            })
    });

    it('It will fail to get a the user name "Peter", with status 404, response body is an object {} with error message "User not found"', function (done) {
        chai.request(app)
            .get("/users/Peter")
            .end((err, res) => {
                res.should.have.status(404)
                res.body.error.should.eql("User not found")
                done()
            })
    });
});
