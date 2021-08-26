const User = require('../../models/User');
require("dotenv").config();
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const {name, email, password} = req.body;
    bcrypt.genSalt(12,(err,salt) =>{
        bcrypt.hash(password,12,async (err,hash)=>{
            const userInfo = await User.findOne({email: email})
            if (userInfo) {
                return res.status(409).json({message: "Account has already"})
            } else {
                const user = await User.create({
                    name: name,
                    email: email,
                    password: hash,
                })
                return res.status(201).json(user);
            }
        })
    });


}
exports.login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if (!user) {
        return res.status(401).json({message: "A user with this email could not be found."})
    }
    bcrypt.compare(password,user.password,async (err,isEqual) =>{
        if (!isEqual) {
            return res.status(401).json({message: "Wrong password"});
        }
        const token = jwt.sign(
            {
                userId: user._id,
                email:email
            },
            process.env.SECRET_KEY
            ,
            {expiresIn: '18000000'}
        )
        res.status(200).json({token:token});
    })
};
exports.verifyToken =async (req,res) =>{
    const {token} = req.body ||req.params||req.query;
    const decodedToken = await jwt.verify(token,process.env.SECRET_KEY);
    return res.status(200).json({decodedToken:decodedToken});
}