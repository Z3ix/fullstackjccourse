import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { SetContextLink } from '@apollo/client/link/context'

const authLink = new SetContextLink(({headers}) => {
  const token = window.localStorage.getItem('userToken')
  return {
    headers: {
      ...headers, authorization: token?`Bearer ${token}`: null
    }
  }
}) 

const httpLink = new HttpLink({uri: 'http://localhost:4000'})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client = {client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
)
