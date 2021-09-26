const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    // If header get slit string header
    const token = authHeader && authHeader.split(' ')[1]
}