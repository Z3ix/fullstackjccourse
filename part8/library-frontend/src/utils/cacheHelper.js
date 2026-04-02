import { ALL_BOOKS } from "../queries/books"


export const addBookToCache = (cache, book) => {
        if (cache.readQuery({ query: ALL_BOOKS})){
          cache.updateQuery({query: ALL_BOOKS},(data) => {
            if (data.allBooks.some(item => item.title == book.title)) {
                return {allBooks: data.allBooks}
            }
            return {allBooks: data.allBooks.concat(book)}
          })
        }
        book.genres.forEach(item => {
          const data = cache.readQuery({ query: ALL_BOOKS, variables: { genre:item }})
          if (data){
            cache.updateQuery({ query: ALL_BOOKS, variables: { genre:item }},(data) =>{
                if (data.allBooks.some(item => item.title == book.title)){
                    return {allBooks: data.allBooks}
                }
                return {allBooks: data.allBooks.concat(book)}              
            })
          }
        })
      }