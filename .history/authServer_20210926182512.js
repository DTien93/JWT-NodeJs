require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const verifyToken = require('./middleware/auth')

app.use(express.json())

// DATABASE
const users = [
    {
        id: 1,
        username: 'admin'
    },
    {
        id: 2,
        username: 'client'
    },
]

// app
const generateTokens = payload => {
    const {id, username} = payload
    // Create JWT   
    const accessToken = jwt.sign({id, username}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15s"
    })
       // Send request token
       const refreshToken = jwt.sign({id, username}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1h"
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
    console.log(users)
    // Return accessToken
    res.json(tokens)
})

// POST  A NEW TOKEN
app.post('/token', (req, res) => {
    const refreshToken = req.body.refreshToken
    // Check token 
    if (!refreshToken)  return res.sendStatus(401)
    
    // Check token is valid
    const user = users.find(user => user.refreshToken === refreshToken)
    if (!user) return res.sendStatus(403)

    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const tokens = generateTokens(user)
        // Update token for user
        updateRefreshToken(user.username.tokens.refreshToken)
        
        res.json(tokens)
    } catch (error) {
        console.log(error)
        res.sendStatus(403)
    }
})

// Logout
// Delete the token  

app.delete('/logout', verifyToken, (req, res) => {
    // Search username by useID
    const user = user.find(user => user.id === req.userId)
    //  Update token  and then delete token from database
    updateRefreshToken(user.username, null)
})
    
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server stared is ${PORT}`)
})