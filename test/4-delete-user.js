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

describe('Delete Users in MongoDB', () => {

    it('It will fail delete because not found user name "Mopp" , with status 404, response body is an object with error message "User not found", user count = 2', function (done) {
        chai.request(app)
            .delete("/users/Mopp")
            .end((err, res) => {
                res.should.have.status(404)
                res.body.should.be.a('object')
                res.body.error.should.eql("User not found")
                countUser((count) => {
                    count.should.eql(2)           
                    done()
                })
            })
    });

    it('It will success delete an user with name "Mike", with status 200, respone will be an object contain user whose name "Mike", user count = 1', function (done) {
        chai.request(app)
            .delete("/users/Mike")
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.name.should.eql('Mike')
                countUser((count) => {
                    count.should.eql(1)           
                    done()
                })
            })
     
    });

});
