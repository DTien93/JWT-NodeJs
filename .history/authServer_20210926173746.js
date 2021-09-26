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
        username: 'admin'
    },
    {
        id: 2,
        username: 'Hung'
    },
]

// app
const generateTokens = payload => {
    // Create JWT   
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15s"
    })
       // Send request token
       const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1h'
    })
    
    return {accessToken, refreshToken}
}
// Update refreshToken

const updateRefreshToken = (username, refreshToken) => {
    users = users.map(user => {
        if (user.username === username) return {
            ...user,
            refreshToken
        }
        // Return user
        return user
    })
}

app.post('/login', (req, res) => {
    // Get  value when user enter  pass to req
    const username = req.body.username
    // Find user  && Check user pass username
    const user = users.find(user => user.username === username)
    // console.log(user)

    // Check user is valid and if user is not valid => return res 401
    if (!user) return res.sendStatus(401)

    const tokens = generateTokens(user)
    updateRefreshToken(username, tokens.refreshToken)
    console.log(user)
    // Return accessToken
    res.json(tokens)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server stared is ${PORT}`)
})