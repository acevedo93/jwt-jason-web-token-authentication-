
/*
*Main file 
*/

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const {User} = require('../model/userModel')
const bcrypt = require('bcrypt-nodejs')
const cookieParser = require('cookie-parser')
const {Auth} = require('./auth')

const app = express()
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/auth')

app.use(bodyParser.json())
app.use(cookieParser())

//user register
app.post('/api/user',(req,res)=> {
    const user = new User({
        email:req.body.email,
        password:req.body.password
    })
    user.save((err,doc)=> {
        if(err) return res.status(400).send(err)
        else return res.status(200).send('Informacion guardada')
    })
    
})


// user login

app.post('/api/login',(req,res)=>{
     User.findOne({'email':req.body.email},(err,user)=> {
         if(!user)res.json({message:"Auth fail"})

         user.comparePassword(req.body.password,(err,isMatch)=>{
            if(err) throw err
            if(!isMatch) return json.status(400).json({
                message:'WRONG PASSWORD'
            })
            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err)
                //send token like cookie
                res.cookie('auth',user.token).send('ok')
            })
            
        })
        
     })
})


//ruta de prueba para verificacion del token 

app.get('/user/profile',Auth,(req,res) => {
    
    res.status(200).send(req.token)
})


app.listen(3000,()=>{
    console.log(' app iniciada en el puerto 3000')
})