const User = require('../src/models/user');
const assert = require('assert');
const app = require('./db');
const chai = require('chai')
const chaihttp = require('chai-http')
const should = chai.should()

chai.use(chaihttp)

const removeAllUser=async()=> {
    await User.deleteMany({})
}

const countUser = (callback) => {
    User.count({}, (err, result) => {
        callback(result)
    })
}


const newUser = {
    name: "Sudoer",
    email: "Sudoer@com.vn",
    password: "AHSBJKJBDAKJ",
    age: 21
};

const newUser1 = {
    name: "Harry",
    email: "Harry@com.vn",
    password: "harrypotter",
    age: 18
};

const newUser2 = {
    name: "May",
    email: "May@com.vn",
    age: 20
};



describe('Creating Users in MongoDB', () => {
    removeAllUser()         //clear the database
    it('It will success creates the 1st user, with status 201, user count = 1, return name = \'Sudoer\'', function (done) {
        chai.request(app)
            .post("/users")
            .send(newUser)                      //name = Sudoer
            .end((err, res) => {
                res.should.have.status(201)
                res.body.user.name.should.eql('Sudoer')
                countUser((count) => {
                    count.should.eql(1)         //user count = 1
                    done()
                })
            })
    });

    it('It will fail creates a new user because the user\' email exists, and user count = 1, status 400', function (done) {
        chai.request(app)
            .post("/users")
            .send(newUser)      
            .end((err, res) => {
                res.should.have.status(400)
                countUser((count) => {
                    count.should.eql(1)         //user count = 1
                    done()
                })
            })
    });

    it('It will success creates the 2nd user, and user count = 2, status 201, return name=\'Harry\'', function (done) {
        chai.request(app)
            .post("/users")
            .send(newUser1)                     //name = Harry
            .end((err, res) => {
                res.should.have.status(201)
                res.body.user.name.should.eql('Harry')
                countUser((count) => {
                    count.should.eql(2)         //user count = 2
                    done()
                })
            })
    });

    it('It will fail because lack of password field, and user count = 2, status 400, message: Path \'password\' is required', function (done) {
        chai.request(app)
            .post("/users")
            .send(newUser2)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.errors.password.message.should.eql("Path `password` is required.")
                countUser((count) => {
                    count.should.eql(2)         //user count = 2
                    done()
                })
            })
    });

});