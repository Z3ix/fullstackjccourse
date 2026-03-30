const resetRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


resetRouter.post('/', async (request,response) => {
    await Blog.deleteMany({});
    await User.deleteMany({});

})







module.exports = resetRouter