const User = require('../src/models/user');
const assert = require('assert');
const app = 'localhost:3000';
const chai = require('chai')
const chaihttp = require('chai-http')
const should = chai.should()

chai.use(chaihttp)

const newUser = {
    name: "Sally",
    email: "Sallyy@com.vn",
    password: "AHSBJKJBDAKJ",
    age: 21
};

describe('3: Delete User in MongoDB', () => {
    it('It will success delete an user with name "Marry", with status 200, respone will be an object contain user whose name "Marry"', function (done) {
        chai.request(app)
            .delete("/users/Marry")
            .end((err, res) => {
                res.should.have.status(200)
                res.body.name.should.eql('Marry')
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