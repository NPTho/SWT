const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({
            user,
            token
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users/all', async (req,res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/:name', async (req,res) => {
    try {
        const user = await User.findOne({name: req.params.name})
        if(!user)
            return res.status(404).send({error: "User not found"})
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({
            user,
            token
        })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})


router.patch('/users/:name', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates'
        })
    }

    try {
        const user = await User.findOneAndUpdate({name: req.params.name},req.body)
        if(!user) 
            return res.status(404).send({error: 'User not found'})
        const newUser = await User.findById(user._id)     
        res.send(newUser)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/:name', async (req, res) => {
    //auth return user in req => req.user
    try {
        const user = await User.findOneAndDelete({name: req.params.name}) 
        if(!user)
            return res.status(404).send({error: "User not found"})
        return res.send(user)   
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router