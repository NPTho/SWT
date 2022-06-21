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


const newUpdate = {
    name: "Mike",
    age: 30
};

const failUpate = {
    name: "Sing",
    email: "Sing@com.vn",
    age: 20,
    phone: "909012923"
};




describe('Updating Users in MongoDB', () => {
    it('It will success update the user "Harry" to "Mike" with age=30 , with status 200, user count = 2', function (done) {
        chai.request(app)
            .patch("/users/Harry")
            .send(newUpdate)                      //name = Mike
            .end((err, res) => {
                res.should.have.status(200)
                res.body.name.should.eql('Mike')    //Harry -> Mike
                res.body.age.should.eql(30)         // 18 -> 30
                countUser((count) => {
                    count.should.eql(2)         //user count = 2
                    done()
                })
            })
    });

    it('It will fail to update the user because invalid input (phone) , with status 400, user count = 2, respone an object with error "Invalid updates', function (done) {
        chai.request(app)
            .patch("/users/Sudoer")
            .send(failUpate)                      
            .end((err, res) => {
                res.should.have.status(400)
                res.body.error.should.eql('Invalid updates')    
                countUser((count) => {
                    count.should.eql(2)         //user count = 2
                    done()
                })
            })
    });

    it('It will fail to update because the updated email already existed , with status 400, user count = 2, respone an object with codename "DuplicateKey"', function (done) {
        chai.request(app)
            .patch("/users/Sudoer")
            .send({email:"harry@com.vn"})                      
            .end((err, res) => {
                res.should.have.status(400)
                res.body.codeName.should.eql('DuplicateKey')  
                countUser((count) => {
                    count.should.eql(2)         //user count = 2
                    done()
                })
            })
    });

    it('It will fail to update because user name (Mopp) not found , with status 404, user count = 2, respone an object with error "User not found"', function (done) {
        chai.request(app)
            .patch("/users/Mopp")
            .send(newUpdate)                      
            .end((err, res) => {
                res.should.have.status(404)
                res.body.error.should.eql('User not found')  
                countUser((count) => {
                    count.should.eql(2)         //user count = 2
                    done()
                })
            })
    });

    

});