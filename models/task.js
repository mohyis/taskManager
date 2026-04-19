const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
     task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const taskModel = mongoose.model('task', taskSchema)

module.exports = taskModel