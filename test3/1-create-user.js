const User = require('../src/models/user');
const assert = require('assert');
const app = 'localhost:3000';
const chai = require('chai')
const chaihttp = require('chai-http')
const should = chai.should()

chai.use(chaihttp)

const newUser = {
    name: "Sally",
    email: "Sally@com.vn",
    password: "AHSBJKJBDAKJ",
    age: 21
};

describe('1: Create User in MongoDB', () => {
    it('It will success creates the user Sally, with status 201, return name = \'Sally\'', function (done) {
        chai.request(app)
            .post("/users")
            .send(newUser) //name = Sally
            .end((err, res) => {
                res.should.have.status(201)
                res.body.user.name.should.eql('Sally')
                done()
            })
    });

});

// describe('Test 2',() => {
//     it('2.1:',(done) => {
//         setTimeout(() => {
//             var a=1
//             a.should.eql(1)
//             done()
//         },2000)
//     })

//     it('2.2:',(done) => {
//         setTimeout(() => {
//             var a=1
//             a.should.eql(1)
//             done()
//         },1000)
//     })
// })