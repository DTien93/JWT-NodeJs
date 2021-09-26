// use dotenv connect config
require('dotenv').config()

const { json } = require('express')
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const verifyToken = require('./middleware/auth')

app.use(express.json())



const users = [
    {
        id: 1,
        username: 'Van Tien'
    },
    {
        id: 2,
        username: 'Hung'
    }
]
// Post
app.get('/posts', verifyToken, (req, res) => {
    res.json({post: 'my post'})
})

app.post('/login', (req, res) => {
    // Get  value when user enter  pass to req
    const username = req.body.username
    // Find user  && Check user pass username
    const user = users.find(user => user.username)
    // console.log(user)

    // Check user is valid and if user is not valid => return res 401
    if (!user) return res.sendStatus(401)
    // Create JWT   
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    // Return accessToken
    res.json({accessToken})
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server stared is ${PORT}`)
})