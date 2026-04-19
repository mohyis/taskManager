const router = require('express').Router();
const passport = require('passport');
const { getUsers, promoteUsers } = require('../controller/userController');
const { admin } = require('../middleware/authenticate');

router.get('/getUsers', admin, getUsers)
router.put('/updateUsers/:id', admin, promoteUsers)
router.get('/auth', passport.authenticate("google", {scope: ["profile", "email"]}))
router.get('/login', passport.authenticate('google',{successRedirect: "/api/user/loginSuccess", failureRedirect: "/api/user/loginFail"}))

router.get('/loginSuccess', (req, res)=>{
    res.json({
        message: "login successful",
        data: req.user
    })
})

router.get('/loginFail', (req, res)=>{
    res.json({
        message: "login Failed"
    })
})


module.exports = router