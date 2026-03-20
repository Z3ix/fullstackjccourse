import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import { useReducer } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { notificationReducer } from './reducers/NotificationReducer'


const App = () => {
  
  const [notification, dispatchNotification] = useReducer(notificationReducer, '')

  const queryClient = useQueryClient()

  const updateVotes = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(item => item.id == anecdote.id?{...item, votes: item.votes+1}:item))
      dispatchNotification({type: 'notify', payload: 'Vote added'})
      setTimeout(() => {dispatchNotification({type: 'clearNotification'})},5000)
    },


  })

  const handleVote = (anecdote) => {
    updateVotes.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const result = useQuery({
    queryKey: ['anecdotes'], 
    queryFn: getAnecdotes,
    retry: false
  })

  if (result.isError) {
    return <div>Anecdote service not available</div>
  }
 
  


  return (
    <NotificationContext.Provider value = {{notification, dispatchNotification}}>
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {result.isLoading?<div>loading data...</div>:result.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
    </NotificationContext.Provider>
  )
}

export default App
