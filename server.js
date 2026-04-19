const express = require('express')
require('dotenv').config()
require('./controller/userController')
const passport = require('passport')
const expressSession = require('express-session')
const app = express()
const PORT = 7790
const userRouter = require('./router/userRouter')
const taskRouter = require('./router/taskRouter')


app.use(express.json())
app.use(expressSession({secret: "mohyis"}))
app.use(passport.initialize())
app.use(passport.session())
app.use("/api/user", userRouter)
app.use('/api/task', taskRouter)


const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URI).then(()=>{
    console.log('database connected successfully'), app.listen(PORT, ()=>{
    
    console.log('app is listening to port', PORT)
})}).catch((error)=>{console.log(`error connecting to database, ${error.message}`);
})