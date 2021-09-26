require('dotenv').config()

const { json } = require('express')
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()

app.use(express.json())

// DATABASE
const users = [
    {
        id: 1,
        username: 'Van Tien'
    },
    {
        id: 2,
        username: 'Hung'
    },
]

// app



app.post('/login', (req, res) => {
    // Get  value when user enter  pass to req
    const username = req.body.username
    // Find user  && Check user pass username
    const user = users.find(user => user.username)
    // console.log(user)

    // Check user is valid and if user is not valid => return res 401
    if (!user) return res.sendStatus(401)
    // Create JWT   
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15s"
    })
    // Send request token
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1h'
    })
    // Return accessToken
    res.json({accessToken})
})




const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server stared is ${PORT}`)
})