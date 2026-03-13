require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const errorHandler = (error, request, response, next) => {


  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } /*else {
    return response.status(400).json({error: "some other error"})
  }*/
 next();


}

const tokenExtractor = (request, response, next) => {

  const authorization = request.get('authorization')
  if ( request.body?.token) {
    request.token = request.body.token;
  } else if (authorization && authorization.startsWith('Bearer ')){
    request.token = authorization.replace('Bearer ', '');
  }
  next();
}

const userExtractor = async (request, response, next) => {
  if (request.token) {
    let tokendata = jwt.verify(request.token, process.env.JWT_KEY);
    request.user = await User.findById(tokendata.id);
  }
  next();
}

module.exports = {errorHandler, tokenExtractor, userExtractor}