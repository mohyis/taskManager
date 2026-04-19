const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL,
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    
    const checkUser = await User.findOne({ email: profile._json.email });
    let token;

    if(checkUser){
        token = await jwt.sign({id: checkUser._id}, process.env.JWT_SECRET,{expiresIn: "1day"})
    } else {
        const createUser = await User.create({
            name: profile._json.name,
            email: profile._json.email,
            isVerified: profile._json.email_verified
        })
        token = await jwt.sign({id: createUser._id}, process.env.JWT_SECRET,{expiresIn: "1day"})

    }

    // console.log(token);

    return done(null, token)

  },
    passport.serializeUser((token, done)=>{
    return done(null, token)
}),

passport.deserializeUser((token, done)=>{
    return done(null, token)
})

));

exports.getUsers = async(req, res)=>{
    try {
        const users = await User.find()
        
        if(!users){
            return res.status(404).json({
                message: 'no users available'
            })
        }

        res.status(200).json({
            message: 'all users retrieved successfully',
            users

        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

exports.promoteUsers = async(req, res)=>{
    try {
        const {id} = req.params
        const {role} = req.body

        const newUpdate = {
            role
        }

        const update = await User.findByIdAndUpdate(id, newUpdate, {new: true})
        if(!update){
            return res.status(404).json({
                message: 'user not found'
            })
        }

        res.status(200).json({
            message: 'user promoted'
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

