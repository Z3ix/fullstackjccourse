import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Link, Route, Routes, useNavigate } from 'react-router'
import LoginForm from './components/Login'
import { useApolloClient } from '@apollo/client/react'
import FavoriteBooks from './components/FavoriteBooks'

const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem('userToken'))
  const [error, setError] = useState('')
  const client = useApolloClient()
  const navigate = useNavigate()

  const timedError = (message, delay) => {
    setError(message)
    setTimeout(()=>setError(''),delay*1000)
  }

  const logout = () => {
    setToken('')
    window.localStorage.clear()
    client.resetStore()
    //navigate('/')
  }
  const errorStyle = {
    border: "2px solid red",
    padding: "5px",
    color: "red",
    backgroundColor: '#d0d0d0',
    margin: "3px"
  }

  return (
    <div>
      <Link to='/' className='button-style'>
        <button>home</button>
      </Link>
      <Link to='/authors'>
        <button>authors</button>
      </Link>
      <Link to='/books' className='button-style'>
        <button>books</button>
      </Link>
      {token && <Link to='/addbook'>
        <button>add book</button>
      </Link>}
      {token && <Link to='/favorites'>
        <button>favorites</button>
      </Link>}
      {token && <button onClick={logout}>logout</button> }
      {!token && <Link to='/login'>
        <button>login</button>
      </Link>}
      {error && <div style={errorStyle}>{error}</div>}
      <Routes>
        <Route path='/' element={<div>Hello</div>}/>
        <Route path='/authors' element={<Authors />}/>
        <Route path='/books' element={<Books />}/>
        {token && <Route path='/favorites' element={<FavoriteBooks />}/>}
        {token && <Route path='/addbook' element={<NewBook timedError={timedError}/>}/>}
        {!token && <Route path='/login' element={<LoginForm setToken={setToken} timedError={timedError}/>}/>}
      </Routes>
    </div>
  )
}

export default App
