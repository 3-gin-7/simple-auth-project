const express = require('express')
const app = express()
const PORT = 8000
const path = require('path')
const mongoose = require('mongoose')
require('dotenv/config')
const User = require('./models/user')

//CONNECT TO THE DATABASE
const url = process.env.DB_CONNECTION
const mongo_options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
console.log(url)
mongoose.connect(url, mongo_options).then(
    ()=>{
        console.log('connected to db')
    },
    (err)=>{
        console.log('error while connecting to db')
        console.log(err)
    }
)


//BODY PARSING MIDDLEWARE
app.use(express.json())

app.use(express.static('public', {extensions:['html']}))

//INDEX
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/pages/homepage.html'))
})

//LOGIN
app.get('/login', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/pages/login.html'))
})

//REGISTER
app.get('/register', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/pages/register.html'))
})

//USER ROUTES
const userRouter = require('./routes/user')
app.use('/user', userRouter)


app.listen(PORT, ()=>{
    console.log('app running on port ' + PORT)
})
