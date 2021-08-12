const express = require('express')
const router = express.Router()
const User = require('../models/user')


//ROUTES

//ADD USER
router.post('/register', async (req, res) =>{
    const userInfo = req.body
    const user = new User(userInfo)
    user.save((err, doc) =>{
        if(err) res.status(500).json(err)
        if(doc) res.json(doc)
    })
})

//USER LOGIN
router.post('/login', (req, res) =>{
    const userInfo = req.body
    User.find({username:userInfo.username,password:userInfo.password}, (err, doc) =>{
        if(err) res.status(500).json({error:err})
        if(doc){
            res.json({success:doc})
            if(doc.length === 0) res.status(401).json({error:'user not found'})
            if(doc.length > 0) res.json({success:'successful authentication'})
        }
    })
})

//MODULE EXPORT
module.exports = router