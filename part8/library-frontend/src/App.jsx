import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Link, Route, Routes } from 'react-router'

const App = () => {
  const [page, setPage] = useState('authors')

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
      <Link to='/addbook'>
        <button>add book</button>
      </Link>
      <Routes>
        <Route path='/' element={<div>Hello</div>}/>
        <Route path='/authors' element={<Authors />}/>
        <Route path='/books' element={<Books />}/>
        <Route path='/addbook' element={<NewBook />}/>
      </Routes>
    </div>
  )
}

export default App
