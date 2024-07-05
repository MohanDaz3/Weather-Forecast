const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const {getToken} = require('../utils/jwtGenerator');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const validInfo = require('../middlewares/validInfo');

const prisma = new PrismaClient();
// user registering signup
// POST request
router.post('/register', validInfo, async(req,res)=>{
    try {
        const {name, email, password} = req.body;
        let user = await prisma.user.findFirst({where:{email:email}});
        if(user){
            return res.status(401).json({error:"User already exists"})
        }
        user = await prisma.user.create({
            data:{
                name,
                email,
                password: await bcrypt.hash(password, 10),
            }
        })
 // creating token for the new user
    const token = await getToken(email, user)
    const userToReturn = {...user, token}
    // delete userToReturn.password;
    return res.status(200).json(userToReturn)
    } catch (err) {
        console.log(err)
        return res.status(500).json({err:"internal error"})
    }
})

// user login
// POST request
router.post('/login', validInfo, async(req,res)=>{
    try {
        const {email, password} = req.body;
        let user = await prisma.user.findFirst({where:{email:email}});
        if(!user){
            return res.status(401).json({error:"Password or Email id incorrect"})
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(401).json({error:"Password or Email id incorrect"});
        }
        const token = await getToken(email, user)
    const userToReturn = {...user, token}
    return res.status(200).json(userToReturn)
    } catch (err) {
        console.log(err)
        return res.status(500).json({err:"internal error"})
    }
});

router.get('/verify',authorize, async(req,res)=>{
    try {
        res.json(true)
    } catch (err) {
        console.log(err)
        return res.status(500).json({err:"internal error"})
    }
})

module.exports = router