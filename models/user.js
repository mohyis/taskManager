const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },

    isVerified: {
        type: Boolean,
        default: false
    
    },
    role: {
        type: String,
        ENUM: ['employee','admin','manager'],
        default: 'employee'
    }
}, {timestamps: true})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel