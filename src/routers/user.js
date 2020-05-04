const express = require('express')
const User = require('../models/user')
const router = new express.Router()


// Create User
router.post('/users',async (req,res) =>{
    const user = new User(req.body)
    
    try {
        await user.save()
        res.status(201).send(user)
    } catch(e) {
        res.send(400).send(e)
    }
    

    
})

//Get all users
router.get('/users',  async (req,res) => {
    try {
        const users = await User.find({})
        
        res.send(users)
    } catch(e) {
        res.status(500).send(e)
    }
    
})

//Get user by id
router.get('/users/:id', async (req,res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        
        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch(e) {
        res.status(500).send()
    }

})


//Update User
router.patch('/users/:id', async (req,res) => {
    const updates = Object.keys(req.body)
    const alloweupdate = ['name','email','password','age']
    const isValidOperation = updates.every((update) => alloweupdate.includes(update))

    if(!isValidOperation) {
        return res.status(400).send('e : "Invalid operators' )
    }

    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }catch(e) {
        res.status(400).send(e)
    }
})

//Delete User
router.delete('/users/:id', async (req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user) {
            res.status(404).send()
        }

        res.send(user)

    }catch{
        res.status(500).send()
    }
})


module.exports = router