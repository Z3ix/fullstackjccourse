import { useMutation } from '@apollo/client/react'
import { useState } from 'react'
import { ADD_BOOK, ALL_BOOKS } from '../queries/books'
import { ALL_AUTHORS } from '../queries/authors'

const NewBook = ({timedError}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBookMutation] = useMutation(ADD_BOOK)
  const [error, setError] = useState('')


  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    addBookMutation({
      variables:{
        title,
        author,
        published: Number(published),
        genres
      },

      onError: (e) => {
        timedError(e.message,10)
      },
      update: (cache, response) => {
        cache.updateQuery({query: ALL_BOOKS},(data) => {
          const res = data.allBooks.concat(response.data.addBook)
          return {allBooks: res}
        })
        response.data.addBook.genres.forEach(item => {
          cache.updateQuery({query:ALL_BOOKS, variables:{genre:item}},(data) =>{
            console.log('updating cache for genre',item)
            const res = data.allBooks.concat(response.data.addBook)
            return {allBooks: res} 
          })
        })
      }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
