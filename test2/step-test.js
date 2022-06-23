const User = require('../src/models/user');
const assert = require('assert');
const app = require('./db');
const chai = require('chai')
const chaihttp = require('chai-http');
const { step } = require('mocha-steps');
const should = chai.should()

chai.use(chaihttp)

const countUser = (callback) => {
    User.count({}, (err, result) => {
        callback(result)
    })
}


const newUser = {
    name: "Perry",
    email: "Perry@com.vn",
    password: "AHSBJKJBDAKJ",
    age: 21
};

const newUpdate = {
    name: "Mickey",
    age: 30
};



describe('Creating Users in MongoDB', () => {
    step('It will success creates the user Perry, with status 201, user count = 1, return name = \'Perry\'', function (done) {
        chai.request(app)
            .post("/users")
            .send(newUser)                      //name = Perry
            .end((err, res) => {
                res.should.have.status(201)
                res.body.user.name.should.eql('Perry')
                countUser((count) => {
                    count.should.eql(2)         //user count = 2
                    done()
                })
            })
    });

    step('It will success get a the user name "Perry", with status 200, response body object have name "Perry"', function (done) {
        chai.request(app)
            .get("/users/Perry")
            .end((err, res) => {
                res.should.have.status(200)
                res.body.name.should.eql('Perry')
                done()
            })
    });

    it('It will success update the user "Perry" to "Mickey" with age=30 , with status 200, user count = 2', function (done) {
        chai.request(app)
            .patch("/users/Perry")
            .send(newUpdate)                      
            .end((err, res) => {
                res.should.have.status(200)
                res.body.name.should.eql('Mickey')    //Perry -> Mickey
                res.body.age.should.eql(30)         // 21 -> 30
                countUser((count) => {
                    count.should.eql(2)         //user count = 2
                    done()
                })
            })
    });


});