const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment')
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {userExtractor} = require('../utils/middleware');
const { blogs } = require('../tests/test_helper');
const mongoose = require('mongoose')
require('dotenv').config();

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', '-passwordHash -blogs');
  response.json(blogs);
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  console.log('requesting blog creating')
  console.log(request.body)
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

  let result = await blog.save()
  user.blogs = user.blogs.concat(result.id);
  await user.save()
  await result.populate('user', '-passwordHash -blogs');
  response.status(201).json(result)

});

blogsRouter.post('/:id/comments', userExtractor, async (request,response) => {
  if (!request.user) return response.status(401).json({error: "must be logged to add comment"})
  if (!request.body.content) {
    console.log('no content')
    return response.status(400).end();
  }
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    console.log('blog doesnt exist')
    return response.status(400).end();
  }

  const comment = new Comment({
    content: request.body.content,
    user: request.user._id,
    blog: blog._id,
    added: Date.now()
  })
  

  const result = await comment.save()
  console.log('comment added')

  if(!blog.comments){
    console.log('comments doesnt exist, creating array')
    blog.comments = [result.id]
  } else{
    console.log('concating comments')
    blog.comments = blog.comments.concat(result.id)
  }
  await blog.save()

  response.status(201).json(result)
})


blogsRouter.put('/:id', userExtractor, async (request, response) => {

  const blog = await Blog.findById(request.params.id).populate('user', '-passwordHash -blogs').populate('comments','content added');;


  if (!blog) return response.status(400).end();

  
  blog.author = request.body.author || blog.author;
  blog.likes = request.body.likes || blog.likes;
  blog.title = request.body.title || blog.title;
  blog.url = request.body.url || blog.url;

try {
  let result = await blog.save();
  console.log(result)
  response.status(200).json(result);
} catch (e) {
  console.log(e)
}
})

blogsRouter.get('/:id', async (request, response) => {
  let blog = await Blog.findById(request.params.id).populate('user', '-passwordHash -blogs').populate('comments','content added');
  if (!blog) return response.status(404).json({error: 'no such blog'})
  response.json(blog);
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  
  const user = request.user;
  if (!user) return response.status(401).json({error: "must be logged on to add blogs"})
  let blog = await Blog.findById(request.params.id);

  if (!blog) return response.status(400).json({error: "Blog does not exist"})
  if (blog.user.toString() !== user.id) return response.status(401).json({error: "you can not delet blogs you didn't post"})
  await blog.deleteOne()
  user.blogs = user.blogs.filter(item => item.toString() != request.params.id);
  await user.save();

  console.log('entry deleted')

  response.status(204).end();
})

blogsRouter.delete('/', async (request, response) => {
  if (request.body.bypass && process.env.NODE_ENV == 'test') {
    await Blog.deleteMany({});
    console.log('all Blogs deleted');
    response.send('all blogs deleted');
  }
})

module.exports = blogsRouter;