import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS } from "../queries/books"
import { useState } from "react"
import { ME } from "../queries/login"

const FavoriteBooks = (props) => {
  const user = useQuery(ME)

  const genre = user?.data?.me?.favoriteGenre
  const response = useQuery(ALL_BOOKS,{
    variables:{
        genre
    },
    skip: !genre
  })
  
  


  if (response.loading || user.loading)  return <div>Loading...</div>
    console.log(user.data)

  const books = response?.data?.allBooks || []


  console.log(books)
  
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>book in {genre} genre</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
/*         
            */

export default FavoriteBooks
