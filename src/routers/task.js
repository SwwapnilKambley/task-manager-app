const express = require('express')
const Task = require('../models/task')
const router = new express.Router()


//Create Task
router.post('/tasks', async (req,res) => {
    const task = new Task(req.body)
     try {
        task.save()
        res.status(201).send(task)

     }catch(e) {
        res.status(400).send(e)
     }
})




//Get all tasks
router.get('/tasks', async (req,res) => {
    
    try{
        const task = await Task.find({})
        res.send(task)

    }catch(e) { 
        res.status(500).send()
    }

})

//Get task by id
router.get('/tasks/:id', async (req,res) => {
    const _id = req.params.id

    try{
        const task = await Task.findById(_id)

        if(!task) {
            res.status(404).send()
        }
        res.send(task)
    
    }catch(e) {
        res.status(500).send()
    }

})

//update Task
router.patch('/tasks/:id', async(req,res) => {
    const updates = Object.keys(req.body)
    const alloweupdate = ['completed','description']
    const isValidOperation = updates.every((update) => alloweupdate.includes(update))

    if(!isValidOperation) {
        return res.status(400).send('e : "Invalid operators')
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)

    }catch {
        res.status(400).send()
    }

})



//Delete Task
router.delete('/tasks/:id', async (req,res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task) {
            res.status(404).send()
        }
        res.send(task)

    }catch{

        res.status(500).send()
    }

})


module.exports = router