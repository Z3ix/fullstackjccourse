require('dotenv').config()
const startApolloServer = require('./server')
const connectToDatabase = require('./db')


const URI = process.env.MONGODB_LIBRARY_URI
const PORT = process.env.APOLLO_PORT || 4000

const main = async () => {
  await connectToDatabase(URI)
  startApolloServer(PORT)
}

main()