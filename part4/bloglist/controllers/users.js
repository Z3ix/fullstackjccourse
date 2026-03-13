const usersRouter = require('express').Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')



usersRouter.post('/', async (request, response) => {
    const user = request.body;

    if (!( user.username 
        && user.password
        && user.username.length >= 3 
        && user.password.length >= 3 
    )) return response.status(400).json({error: "name and password must be at least 3 characters long", code: 95})

    if (!/^[a-z][a-z0-9]*$/i.test(user.username)) return response.status(400).json({error: "username can not start with number, and must consists only from numbers and letters", code: 96})
    

    let result = await User.find({username: user.username})
    if (result.length > 0) {
        console.log('this user already exists');
        return response.status(400).json({error: "user with this username already exists", code: 97});
    }

    const salt = 10
    const passHash = await bcrypt.hash(user.password, salt)

    const newUser = new User({
        blogs: [],
        username: user.username,
        name: user.name,
        passwordHash: passHash
    })
    await newUser.save()

    response.status(201).end()

})

usersRouter.get('/', async (request, response) => {
    let result = await User.find({}).select('-passwordHash').populate('blogs', '-user');

    response.json(result);
})

usersRouter.delete('/', async (request, response) => {
  if (request.body.bypass) {
    await User.deleteMany({});
    console.log('all Users deleted');
    response.send('all Users deleted');
  }
})



module.exports = usersRouter;