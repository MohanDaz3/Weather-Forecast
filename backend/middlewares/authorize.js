const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(403).json({ msg: 'authorization denied' });
    }

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verify.user;
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(401).json({ err: 'Token is not valid' });
    }
};