const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    // If header get slit string header get token 
    // Header split string is two string {Bearer} {Token}
    const token = authHeader && authHeader.split(' ')[1]
    // Check token
    if (!token) return res.sendStatus(403)

    try {
        
    }
}