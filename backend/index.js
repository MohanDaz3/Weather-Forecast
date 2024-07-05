const express = require("express");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const {PORT} = require('./secrets');
const app = express();
const {PrismaClient} = require("@prisma/client");
const authRoutes = require('./routes/auth')
const weatherBoards = require('./routes/weatherBoard')
dotenv.config();
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());

const prismaClient = new PrismaClient({
    log:['query']
})

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.use('/auth',authRoutes)
app.use('/weatherboard',weatherBoards)

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})

module.exports = prismaClient