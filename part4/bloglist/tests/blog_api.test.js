const app = require('../app')

const assert = require('node:assert')
const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const { getCompileCacheDir } = require('node:module')
const { request } = require('node:http')

const api = supertest(app)

let usertoken;
beforeEach(async () => {
      await User.deleteMany({});
    await User.insertMany(helper.users);
    await Blog.deleteMany({});
    await Blog.insertMany(helper.blogs);

    let response = await api
      .post('/api/login')
      .send({username: "root", password: "testpass125"})
    usertoken = response.body.token;
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
    .post('/api/login')
    .send({username: "root", password: "testpass125"})
  let token = response.body.token;

  const compare = {...helper.singleblog, user: response.body.id};
  compare.id = compare._id.toString();
  delete compare._id;
  delete compare.__v;

  response = await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer '+token)
        .send(helper.singleblog)
        .expect(201)
        .expect('Content-Type', /application\/json/);



  assert.deepStrictEqual(response.body, compare)

  response = await api.get('/api/blogs')
  
  assert.strictEqual(response.body.length, helper.blogs.length + 1);
  
})

test (' undefined likes must be equal 0', async () => {
  let response = await api
    .post('/api/login')
    .send({username: "root", password: "testpass125"})
  let token = response.body.token;

  const testblog = helper.singleblog;
  delete testblog.likes;

  response = await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer '+token)
        .send(testblog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
  
  assert.strictEqual(response.body.likes, 0)
})

test(' missing title or url results on 400 bad request' , async () => {
  let response = await api
    .post('/api/login')
    .send({username: "root", password: "testpass125"})
  let token = response.body.token;

  let testblog = {...helper.singleblog};
  delete testblog.title;
  response = await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer '+token)
    .send(testblog)
    .expect(400)

  testblog = {...helper.singleblog};
  delete testblog.url;
  response = await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer '+token)
    .send(testblog)
    .expect(400)

})

test(' deleting entry by id ', async () => {
  let response = await api.get('/api/blogs');
  const blogsbefore = response.body.length;

  let blog = await Blog.findById(helper.blogs[0]._id)
  let user = await User.findOne({username: "root"})
  blog.user = user.id
  await blog.save();
  response = await api
    .delete(`/api/blogs/${helper.blogs[0]._id}`)
    .set('Authorization', 'Bearer '+usertoken)
    .expect(204);

  response = await api.get('/api/blogs');
  const blogsafter = response.body.length;

  assert.notStrictEqual(blogsbefore, blogsafter);
})

test(' updating likes ', async () => {
    let response = await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer '+usertoken)
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

describe(' users api test', async () => {
  beforeEach( async () => {
    await User.deleteMany({});
    await User.insertMany(helper.users);
  })

  test(' creating user without password returns error code 95', async () => {
    let response = await api
      .post('/api/users')
      .send({username: "Alibaba", name: "Mohammed Ali Baba"})
      .expect(400)
    assert.strictEqual(response.body.code, 95)
  })

  test(' creating user with incorrect username returns code 96 ', async () => {
    let response = await api
      .post('/api/users')
      .send({username: "3Alibaba", name: "Mohammed Ali Baba", password: "99fe3942"})
      .expect(400)
    assert.strictEqual(response.body.code, 96)
  })

  test(' creating user that already exists returns code 97 ', async () => {
    let response = await api
      .post('/api/users')
      .send({username: "admin", name: "not alibaba", password: "99fe3942"})
      .expect(400)
    assert.strictEqual(response.body.code, 97)
  })

  test(' creating valid user', async () => {
    let response = await api
      .post('/api/users')
      .send({username: "notadmin", name: "not alibaba", password: "99fe3942"})
      .expect(201)
  })


})
after(async () => {
  await mongoose.connection.close()
})