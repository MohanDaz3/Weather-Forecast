
const jwt = require('jsonwebtoken');



const getToken = async(email, user) => {
    
    const token = await jwt.sign(
        { user: { id: user.id, email: email } },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    return token;
}

module.exports = {
    getToken
};