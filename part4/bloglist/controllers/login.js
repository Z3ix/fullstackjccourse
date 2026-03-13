const User = require('../models/user')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config();

loginRouter.post('/', async (request, response) => {
    const {username, password} = request.body;
    console.log('trying to log in with '+username+' '+password)
    if(!(username && password)) return response.status(401).end();

    let user = await User.findOne({username})
    if (!user) return response.status(401).end();
    if(!await bcrypt.compare(password, user.passwordHash)) return response.status(401).end();

    const userdata = {username: user.username, id: user.id}

    const token = jsonwebtoken.sign(userdata, process.env.JWT_KEY)

    response.json({token,...userdata});
})










module.exports = loginRouter;