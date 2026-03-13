const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {userExtractor} = require('../utils/middleware');
const { blogs } = require('../tests/test_helper');
require('dotenv').config();

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', '-passwordHash -blogs');
  response.json(blogs);
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  if (!(request.body.title && request.body.url )) return response.status(400).end();
  let user = request.user
  if (!user) return response.status(401).json({error: "must be logged on to add blogs"})

  


  const blog = new Blog({
    "title": request.body.title,
    "author": request.body.author,
    "user": user._id,
    "url": request.body.url,
    "likes": request.body.likes || 0
  });
  if (request.body._id) blog["_id"]=request.body._id

  const result = await blog.save()
  user.blogs = user.blogs.concat(result.id);
  await user.save()
  response.status(201).json(result)

});



blogsRouter.put('/:id', userExtractor, async (request, response) => {

  const blog = await Blog.findById(request.params.id);

  if (!blog) return response.status(400).end();

  blog.author = request.body.author || blog.author;
  blog.likes = request.body.likes || blog.likes;
  blog.title = request.body.title || blog.title;
  blog.url = request.body.url || blog.url;

  let result = await blog.save();

  response.status(200).json(result);

})

blogsRouter.get('/:id', async (request, response) => {
  let blog = await Blog.findById(request.params.id);
  if (!blog) return response.status(404).json({error: 'no such blog'})
  response.json(blog);
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  
  const user = request.user;
  if (!user) return response.status(401).json({error: "must be logged on to add blogs"})
  let blog = await Blog.findById(request.params.id);


  if (blog.user.toString() !== user.id) return response.status(401).json({error: "you can not delet blogs you didn't post"})
  await blog.deleteOne()
  user.blogs = user.blogs.filter(item => item.toString() != request.params.id);
  await user.save();

  console.log('entry deleted')

  response.status(204).end();
})

blogsRouter.delete('/', async (request, response) => {
  if (request.body.bypass) {
    await Blog.deleteMany({});
    console.log('all Blogs deleted');
    response.send('all blogs deleted');
  }
})

module.exports = blogsRouter;