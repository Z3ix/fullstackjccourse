const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
})

blogsRouter.post('/', async (request, response) => {
  if (!(request.body.title && request.body.url)) response.status(404).end();
  const blog = new Blog({
    "title": request.body.title,
    "author": request.body.author,
    "url": request.body.url,
    "likes": request.body.likes || 0
  });
  if (request.body._id) blog["_id"]=request.body._id

  const result = await blog.save()
  response.status(201).json(result)

});

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.find({_id: request.params.id});
  if (!blog) return response.status(400).end;
  await Blog.deleteOne({_id: request.params.id})
  response.status(204).end();
})

blogsRouter.put('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id);

  if (!blog) return response.status(400).end();

  blog.author = request.body.author || blog.author;
  blog.likes = request.body.likes || blog.likes;
  blog.title = request.body.title || blog.title;
  blog.url = request.body.url || blog.url;

  let result = await blog.save();

  response.status(200).json(blog);

})

module.exports = blogsRouter;