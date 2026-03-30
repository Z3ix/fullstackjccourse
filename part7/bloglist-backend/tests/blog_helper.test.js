const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
describe('dummy test ', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
});
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]
const someblogs = [{author: 'no', likes:50},{author: 'author',likes:25},{author: 'here',likes: 5}]
describe('Like counter', () => {
  test('of empty array', () => {
    assert.strictEqual(listHelper.totalLikes([]),0)
  })
  test('of null', () => {
    assert.strictEqual(listHelper.totalLikes(null),0)
  })
  test('of some list', () => {
    assert.strictEqual(listHelper.totalLikes(someblogs),80)
  })
  test('of biglist list', () => {
    assert.strictEqual(listHelper.totalLikes(blogs),36)
  })
});
describe('Favorite blog', () => {
  test('of empty array', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([]),null)
  })
  test('of null', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(null),null)
  })
  test('of some list', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(someblogs),someblogs[0])
  })
  test('of biglist list', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs),blogs[2])
  })
  test('of partial biglist list', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs.slice(3)),blogs[3])
  })
})

describe('Most blogs', () => {
  test('of empty array', () => {
    assert.deepStrictEqual(listHelper.mostBlogs([]),{author: '', blogs: 0})
  })
  test('of null', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(null),null)
  })
  test('of some list', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(someblogs),{author: 'no', blogs: 1})
  })
  test('of biglist list', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs),{author: "Robert C. Martin", blogs: 3})
  })
  test('of partial biglist list', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs.slice(0,4)),{author: "Edsger W. Dijkstra", blogs: 2})
  })
})

describe('Most likes', () => {
  test('of empty array', () => {
    assert.deepStrictEqual(listHelper.mostLikes([]),{author: '', likes: 0})
  })
  test('of null', () => {
    assert.deepStrictEqual(listHelper.mostLikes(null),null)
  })
  test('of some list', () => {
    assert.deepStrictEqual(listHelper.mostLikes(someblogs),{author: 'no', likes: 50})
  })
  test('of biglist list', () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs),{author: "Edsger W. Dijkstra", likes: 17})
  })
  test('of partial biglist list', () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs.slice(3)),{author: "Robert C. Martin", likes: 12})
  })
})


