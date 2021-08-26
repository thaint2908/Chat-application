const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req,res,next) =>{
    const authHeader = req.get('Authorization');
    if(!authHeader) {
        const error = new Error("Not authenticated");
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        console.log(err)
        err.statusCode = 500;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.email = decodedToken.email;
    req.userId = decodedToken.userId;
    next();
}