const User = require('../src/models/user');
const app = 'localhost:3000';
const chai = require('chai')
const chaihttp = require('chai-http');
const itParam = require('mocha-param');
var expect = require('chai').expect;

chai.use(chaihttp)


const createData = [{
        user: {
            name: "Ben",
            email: "Ben@com.vn",
            password: "AHSBJKJBDAKJ",
            age: 21
        },
        status: 201
    },

    {
        user: {
            name: "Sally",
            email: "sally@com.vn",
            password: "AHSBJKJBDAKJ",
            age: 21
        },
        status: 400
    },
    {
        user: {
            name: "Tony",
            email: "Tony@com.vn",
            password: "AHSBJKJBDAKJ",
            age: 21
        },
        status: 201
    }
]

const getData = [{
        name: 'Sally',
        status: 200
    },
    {
        name: 'Manny',
        status: 404
    },
    {
        name: 'Ben',
        status: 200
    },
    {
        name: 'Smokey',
        status: 404
    },
    {
        name: 'Tony',
        status: 200
    },
    {
        name: 'Mickey',
        status: 200
    },
    {
        name: 'Mason',
        status: 404
    }
]

describe('Create many users', () => {
    itParam('Create an user', createData, async function (done,data) {
        chai.request(app)
            .post("/users")
            .send(data.user)
            .end((err, res) => {
                expect(res.status).eql(data.status)
                if(res.status==201)
                    expect(res.body.user.name).eql(data.user.name)
                done()
            })
    });
})

describe('Get many users', () => {
    itParam('Get an user to check if they found or not', getData, async function (done,data) {
        chai.request(app)
            .get("/users/" + data.name)
            .end((err, res) => {
                expect(res.status).eql(data.status)
                done()
            })
    });
})