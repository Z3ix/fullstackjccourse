import { useMutation, useQuery } from "@apollo/client/react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries/authors"
import { useState } from "react"

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const response = useQuery(ALL_AUTHORS)

  const [editAuthorMutation] = useMutation(EDIT_AUTHOR)

  const updateAuthor = (e) => {
    e.preventDefault()
    editAuthorMutation({
      variables:{
        name,
        born: Number(born)
      },
      refetchQueries: [{ query: ALL_AUTHORS}]
      
    })
    setName('')
    setBorn('')
  }

  if (response.loading) return <div>Loading ...</div>

  const authors = response.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={updateAuthor}>
        <div>
          <label>name <select name='author' onChange={({target}) => setName(target.value)}>
            <option value = ''>select author</option>
            {authors.map(({name}) => <option value={name}>{name}</option>)}
          </select> 
          </label>
        </div>
        <div>
          <label>born <input name='born' value = {born} onChange={({target}) => setBorn(target.value)}></input></label>
        </div>
        <div>
          <button type='submit'>update</button>
        </div>
      </form>
    </div>
  )
}

export default Authors
