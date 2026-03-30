require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const errorHandler = (error, request, response, next) => {


  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else {
    console.log(error)
    next();
    return response.status(400).json({error: "some other error"})
  }



}

const tokenExtractor = (request, response, next) => {

  const authorization = request.get('authorization')
  if ( request.body?.token) {
    console.log('extracting token from BODY')
    request.token = request.body.token;
  } else if (authorization && authorization.startsWith('Bearer ')){
    console.log('extracting token from HEADER')
    console.log(authorization)
    request.token = authorization.replace('Bearer ', '');
  }
  next();
}

const userExtractor = async (request, response, next) => {
  if (request.token) {
    console.log('extraction user')
    console.log('request.token')
    console.log(request.token)
    let tokendata = jwt.verify(request.token, process.env.JWT_KEY);
    console.log('token data')
    console.log(tokendata)
    request.user = await User.findById(tokendata.id);
    console.log('user')
    console.log(request.user)
  }
  next();
}

module.exports = {errorHandler, tokenExtractor, userExtractor}