const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.json({post: 'my post'})
})

const PORT = 