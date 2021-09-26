const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    // If header get slit string header get token 
    // Header split string is two string {Bearer} {Token}
    const token = authHeader && authHeader.split(' ')[1]
    // Check token
    if (!token) return res.sendStatus(401)

    try {
        const decode = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
        console.log(decode)
        // Api 200 is pass
        req.userId = decode
        next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(403)
    }
}

module.exports = verifyToken