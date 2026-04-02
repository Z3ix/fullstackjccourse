const {v1: uuid} = require('uuid')
const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')

const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const mongoose = require('mongoose')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const pubsub = new PubSub()

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]
let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]



const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: async () => await Book.find({}).then(books => books.length),
    authorCount: async () => await Author.find({}).then(authors => authors.length),
    allBooks: async (root,args) => {
        console.log('quering books')
        let filter =[]
        if(args.author)filter.push({author:args.author})
        if(args.genre)filter.push({genres:args.genre})
        console.log(filter)
        const query = filter.length > 0?{$or:filter}:{}
        let tempBooks = await Book.find(query).populate('author')
        console.log(tempBooks)
        /*if (args.author) tempBooks = tempBooks.filter(item => item.author == args.author)
        if (args.genre) tempBooks = tempBooks.filter(item => item.genres.includes(args.genre))*/
        return tempBooks
    },
    allAuthors: async () => {
        return await Author.find({})
    },
  },
  Mutation: {
    updateAuthors: async () => {
      const books = await Book.find({})
      const authors = await Author.find({})
      for(const author of authors){
        const booksOfAuthor = books.filter(item => item.author == author.id).map(item => item._id)
        author.books = booksOfAuthor
        console.log(`Found ${author.books.length} books for ${author.name}. Saving`)
        try {
          await author.save()
        } catch (e){
          console.log(`Error appeared`)
          console.log(e)
        }
        console.log('saved')
      }
      console.log('done')
      return true
    },
    insertData: async () => {
        const a = authors.map(item => {return {name: item.name, born: item.born}})
        await Author.insertMany(a)
        const bs = [...books]
        delete bs.id
        for(const item of bs){
            const a = await Author.findOne({name: item.author})
            const b = new Book({...item, author: a._id})
            await b.save()
        }
        console.log('books inserted')
        return true
    },

    createUser: async (root, {username, password, favoriteGenre}) => {
      const passwordHash = await bcrypt.hash(password, 10)
      const newUser = new User({username, passwordHash, favoriteGenre})
      try {
        await newUser.save()
      } catch (e){
        throw new GraphQLError(`could not create new User: ${error.message}`,{
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
        },})
      }
      return newUser
    },
    login: async (root,{username, password}) => {
      const user = await User.findOne({username})
      const match = await bcrypt.compare(password, user.passwordHash)
      if (!user || !match) {
        console.log(user)
        console.log(match)
        throw new GraphQLError(`Wrong credentials`,{
          extensions: {
            code: 'BAD_USER_INPUT'
        }
        })
      }
      const toSign = {
        username: user.username,
        id: user._id
      } 

      return {value: jwt.sign(toSign, process.env.JWT_KEY)}
      
      
    },
    addBook: async (root, args, context) => {
        console.log('looking for author')
        if (!context.currentUser) {
          throw new GraphQLError(`Must be logged in to add books`,{
            extensions: {
              code: 'UNAUTHORIZED',
              invalidArgs: context.currentUser,
              },}) 
        }
        let author = await Author.findOne({name: args.author})
        if (!author){
            console.log('New author detected')
            const newAuthor = new Author({
                name: args.author,
            })
            try {
              author = await newAuthor.save()
            } catch (error) {
              throw new GraphQLError(`could not create Author: ${error.message}`,{
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.author,
              },})
            }
        }
        let book = {...args, author: author._id}
        let newBook = new Book(book)
        try {
          await newBook.save()
        } catch (error) {
          throw new GraphQLError(`could not create Book: ${error.message}`,{
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
          },})
        }
        console.log('saved')
        newBook = await newBook.populate('author')
        pubsub.publish('BOOK_ADDED',{bookAdded: newBook})

        return newBook
    },
    editAuthor: async (root, args,context) => {
        if (!context.currentUser) {
          throw new GraphQLError(`Must be logged in to edit author`,{
            extensions: {
              code: 'UNAUTHORIZED',
              invalidArgs: context.currentUser,
              },}) 
        }
        let curAuthor = await Author.findOne({name: args.name})
        if (!curAuthor) {
            throw new GraphQLError(`No such author: ${args.name}`, {     
                extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.name,
                },})
        }
        curAuthor.born = args.setBornTo
        await curAuthor.save()
        return curAuthor
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => 
        {
          console.log('have subscriber to book added')
          return pubsub.asyncIterableIterator('BOOK_ADDED')
        },
    },
  },
  Author: {
      bookCount: async (root, args) => {
          return root.books.length
      }
  }
}

module.exports = resolvers