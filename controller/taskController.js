const taskModel = require('../models/task')

exports.createTask = async(req, res)=>{
    try {
        const {task, description} = req.body

        const checkTask = await taskModel.findOne({task: task})
        if(checkTask){
            return res.status(400).json({
                message: 'task already exists'
            })
        }

        const newTask = await taskModel.create({
            task,
            description
        })

        res.status(201).json({
            message: 'task created',
            newTask
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

exports.viewTask = async(req, res)=>{
    try {
        const tasks = await taskModel.find()
        
        if(!tasks){
            return res.status(404).json({
                message: 'no users available'
            })
        }

        res.status(200).json({
            message: 'all task retrieved successfully',
            tasks

        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

exports.updateTask = async(req, res)=>{
    try {
        const {id} = req.params
        const {task, description} = req.body

        const newUpdate = {
            task,
            description
        }

        const updateOldTask = await taskModel.findByIdAndUpdate(id, newUpdate, {new: true})
        if(!updateOldTask){
            return res.status(404).json({
                message: 'task not found'
            })
        }

        res.status(200).json({
            message: 'task updated'
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

exports.deleteTask = async(req, res)=>{
    try {
        const {id} = req.params

        const deleteOldTask = await taskModel.findByIdAndDelete(id)
        if(!deleteOldTask){
            return res.status(404).json({
                message: 'task not found'
            })
        }

        res.status(200).json({
            message: 'task deleted'
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};