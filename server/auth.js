/*
* middleware for auth
*/

const {User} = require('../model/userModel')

let Auth = (req,res,next) => {
    let token = req.cookies.auth
    User.findByToken(token,(err,user)=> {
        //codigo no autorizado
        if(!user) res.status(401).send('no access')
        req.token = token
        next()  
    })
}

module.exports = {Auth}