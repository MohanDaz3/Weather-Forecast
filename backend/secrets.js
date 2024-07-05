const dotenv = require('dotenv');

dotenv.config({path:'.env'});

PORT = process.env.PORT;
JWT_SECRET = process.env.JWT_SECRET;      

module.exports = {PORT,
 JWT_SECRET}