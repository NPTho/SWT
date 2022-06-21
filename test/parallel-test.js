// const express = require('express')
// const userRouter = require('../src/routers/user')
// const taskRouter = require('../src/routers/task')
// const app = express()
// const port = 3000
// const chai = require('chai')
// const chaihttp = require('chai-http')
// const should = chai.should()

// app.use(express.json())

// app.listen(port, () => {
//     console.log('Server is up on port ', port)
// })

// chai.use(chaihttp)

// describe('Test Parallel', () => {
//     it('The request "get:/users/all" should be an object', function (done) {
//         chai.request(app)
//             .get("/users/all")
//             .end((err, res) => {
//                 res.body.should.be.a('object')
//                 done()
//             })
//     });

//     it('The request "get:/users/name" should be an object', function (done) {
//         chai.request(app)
//             .get("/users/Harry")
//             .end((err, res) => {
//                 res.body.should.be.a('object')
//                 done()
//             })
//     });

//     it('The request "delete:/users/Harry" should be an object', function (done) {
//         chai.request(app)
//             .delete("/users/Harry")
//             .end((err, res) => {
//                 res.body.should.be.a('object')
//                 done()
//             })
//     });

// });
