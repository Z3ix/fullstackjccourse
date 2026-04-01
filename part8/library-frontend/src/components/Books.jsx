import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS } from "../queries/books"
import { useState } from "react"

const Books = (props) => {

  
  const [filter, setFilter] = useState(null)
  const variables = filter?{genre:filter}:{}
  const response = useQuery(ALL_BOOKS,{variables})

  if (response.loading) return <div>Loading...</div>


  //const books = filter?response.data.allBooks.filter(item=> item.genres.includes(filter)):response.data.allBooks
  const books = response.data.allBooks
  const genresList = response.data.allBooks.reduce((acc,item)=> acc.concat(item.genres), [])
  const genres = [...new Set(genresList)]
  console.log(books)
  
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
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
      {genres.map(item =><button key={item} onClick={(e)=>setFilter(e.target.innerText)}>{item}</button>)}
      <button onClick={(e)=>setFilter(null)}>all genres</button>
    </div>
  )
}
/*         
            */

export default Books
