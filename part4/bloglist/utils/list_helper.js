const blog = require("../models/blog");

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogList) => {
    if (blogList == null || blogList == undefined) return 0;
    let totalLikes = 0;
    for(let blog of blogList){
        totalLikes += +blog.likes;
    }
    return totalLikes;
}

const favoriteBlog = (blogList) => {
    if (blogList == null || blogList == undefined) return null;
    let favorite = null;
    let mostLikes = 0;
    for(let blog of blogList) {
        if (mostLikes < blog.likes){
            mostLikes = blog.likes;
            favorite = blog;
        }
    }
    return favorite;
}

const mostBlogs = (blogList) => {
    if (blogList == null || blogList == undefined) return null;
    let summary = {};
    for (let blog of blogList) {
        summary[blog.author] = (summary[blog.author] ?? 0) + 1;
    }
    let mostBlogs = {author:'', blogs: 0}
    for (const [key, value] of Object.entries(summary)){
        if (value > mostBlogs.blogs){
            mostBlogs.author = key;
            mostBlogs.blogs = value;
        }
    }
    return mostBlogs;
}

const mostLikes = (blogList) => {
    if (blogList == null || blogList == undefined) return null;
    let summary = {};
    for (let blog of blogList) {
        summary[blog.author] = (summary[blog.author] ?? 0) + blog.likes;
    }
    let likes = {author:'', likes: 0}
    for (const [key, value] of Object.entries(summary)){
        if (value > likes.likes){
            likes.author = key;
            likes.likes = value;
        }
    }    
    return likes;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}