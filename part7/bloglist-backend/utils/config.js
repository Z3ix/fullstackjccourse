require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_BLOGLISTDB_URL
  : process.env.BLOGLISTDB_URL

module
.exports = {
  MONGODB_URI,
  PORT
}