const config = require('../config/keys');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token)
        return res.status(401).json({ msg: 'No token, authorizaton denied' });
    try {
        // Verify token
        const decoded = jwt.verify(token, config.secret);
        // Add user from payload
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
}

module.exports = auth;