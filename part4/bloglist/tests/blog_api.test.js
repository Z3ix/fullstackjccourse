const app = require('../app')

const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const { getCompileCacheDir } = require('node:module')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.blogs);
})

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.blogs.length)
})

test (' id property instead of _id', async () => {
  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body[0]._id, undefined)
  assert(response.body[0].id); 
})

test (' posting blog ', async () => {

  let response = await api
        .post('/api/blogs')
        .send(helper.singleblog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

  const compare = {...helper.singleblog};
  compare.id = compare._id.toString();
  delete compare._id;
  delete compare.__v;

  assert.deepStrictEqual(response.body, compare)

  response = await api.get('/api/blogs')
  
  assert.strictEqual(response.body.length, helper.blogs.length + 1);
  
})

test (' undefined likes must be equal 0', async () => {
  const testblog = helper.singleblog;
  delete testblog.likes;

  let response = await api
        .post('/api/blogs')
        .send(testblog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
  
  assert.strictEqual(response.body.likes, 0)
})

test(' missing title or url results on 404 bad request' , async () => {
  let testblog = {...helper.singleblog};
  delete testblog.title;
  let response = await api
    .post('/api/blogs')
    .send(testblog)
    .expect(404)

  testblog = {...helper.singleblog};
  delete testblog.url;
  response = await api
    .post('/api/blogs')
    .send(testblog)
    .expect(404)

})

test(' deleting entry by id ', async () => {
  let response = await api.get('/api/blogs');
  const blogsbefore = response.body.length;

  response = await api
    .delete(`/api/blogs/${helper.blogs[0]._id}`)
    .expect(204);

  response = await api.get('/api/blogs');
  const blogsafter = response.body.length;

  assert.notStrictEqual(blogsbefore, blogsafter);
})

test(' updating likes ', async () => {
    let response = await api
        .post('/api/blogs')
        .send(helper.singleblog)
        
  const testblog = {...helper.singleblog};
  testblog.likes = 999;

  let result = await api
    .put(`/api/blogs/${testblog._id}`)
    .send(testblog)
    .expect(200)
    .expect('Content-Type', /application\/json/);
  assert.strictEqual(testblog.likes, result.body.likes);

})

after(async () => {
  await mongoose.connection.close()
})