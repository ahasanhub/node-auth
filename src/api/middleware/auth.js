const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, 'jwtkey12175!$32#');
    try {
        const user = await User.findOne({
            _id: data._id, 'tokens.token': token
        });
        if (!user) {
            throw new Error();
        }
        res.user = user;
        res.token = token;
        next();
    } catch (error) {
        res.status(401).send({
            error: 'Not authorized to access this resource.'
        });
    }
}