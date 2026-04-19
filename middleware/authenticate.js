const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.viewTasks = async(req,res,next)=>{
    const auth = req.headers.authorization

    if(!auth){
        return res.status(400).json({
            message: 'auth required'
        })
    }

    const token = auth.split(' ')[1]

     await jwt.verify(token, process.env.JWT_SECRET, async(error, result)=>{
        if(error){
            return res.status(400).json({
                message: error.message
            })
        }
        const findUser = await User.findById(result.id)
        if(!findUser){
            return res.status(404).json({
                message: 'user not found'
            })
        }

        const isVerified = findUser.isVerified
        if(isVerified != true){
            return res.status(403).json({
                message: 'invalid request'
            })
        }

        req.user = result

        next()
        
    })

};

exports.createAndUpdateTask = async(req,res,next)=>{
    const auth = req.headers.authorization

    if(!auth){
        return res.status(400).json({
            message: 'auth required'
        })
    }

    const token = auth.split(' ')[1]

     await jwt.verify(token, process.env.JWT_SECRET, async(error, result)=>{
        if(error){
            return res.status(400).json({
                message: error.message
            })
        }
        const findUser = await User.findById(result.id)
        if(!findUser){
            return res.status(404).json({
                message: 'user not found'
            })
        }

        const role = findUser.role

        if (role === 'employee'){
            return res.status(403).json({
                message: 'unauthorized access'
            })
        }
        req.user = result

        next()
        
    })

};

exports.admin = async(req,res,next)=>{
    const auth = req.headers.authorization

    if(!auth){
        return res.status(400).json({
            message: 'auth required'
        })
    }

    const token = auth.split(' ')[1]

     await jwt.verify(token, process.env.JWT_SECRET, async(error, result)=>{
        if(error){
            return res.status(400).json({
                message: error.message
            })
        }
        const findUser = await User.findById(result.id)
        if(!findUser){
            return res.status(404).json({
                message: 'user not found'
            })
        }

        const role = findUser.role

        if (role != 'admin'){
            return res.status(403).json({
                message: 'unauthorized access'
            })
        }
        req.user = result

        next()
        
    })

};
