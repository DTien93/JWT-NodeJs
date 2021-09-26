// use dotenv connect config
require('dotenv').config()

const { json } = require('express')
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const verifyToken = require('./middleware/auth')

app.use(express.json())


// FAKE DATABASE
const users = [
    {
        id: 1,
        username: 'admin',
        refreshToken: null,
    },
    {
        id: 2,
        username: 'sontung',
        refreshToken: null,
    },
]


const  posts = [
    {
        useId: 1,
        post: 'post henry Tien'
    },
    {
        useId: 2,
        post: 'post Admin'
    },
    
]

// GET DATA TO TOKEN
app.get('/posts', verifyToken, (req, res) => {
    res.json(posts.filter(post => post.userId === req.userId))
})
// Post
// Verify Token check token 
// If  token is successful => pass else => false
app.get('/posts', verifyToken, (req, res) => {
    res.json({post: 'my post'})
})


const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server stared is ${PORT}`)
})