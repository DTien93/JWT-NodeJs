const express = require('express')
const app = express()

const users = [
    {
        id: 1,
        name: 'Van Tien'
    },
    {
        id: 2,
        name: 'Hung'
    }
]
// Post
app.get('/posts', (req, res) => {
    res.json({post: 'my post'})
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server stared is ${PORT}`)
})