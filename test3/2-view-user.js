const User = require('../src/models/user');
const assert = require('assert');
const app = 'localhost:3000';
const chai = require('chai')
const chaihttp = require('chai-http')
const should = chai.should()

chai.use(chaihttp)

describe('2: Get Users in MongoDB', () => {
    it('It will fail to get a the user name "Sally", with status 404, response body is an object {} with error message "User not found"', function (done) {
        chai.request(app)
            .get("/users/Sally")
            .end((err, res) => {
                res.should.have.status(404)
                res.body.error.should.eql("User not found")
                done()
            })
    });

    it('It will fail to get a the user name "Marry", with status 404, response body is an object {} with error message "User not found"', function (done) {
        chai.request(app)
            .get("/users/Marry")
            .end((err, res) => {
                res.should.have.status(404)
                res.body.error.should.eql("User not found")
                done()
            })
    });
})

// describe('Test 1',() => {
//     it('1.1:',(done) => {
//         setTimeout(() => {
//             var a=1
//             a.should.eql(1)
//             done()
//         },2000)
//     })

//     it('1.2:',(done) => {
//         setTimeout(() => {
//             var a=1
//             a.should.eql(1)
//             done()
//         },1000)
//     })
// })