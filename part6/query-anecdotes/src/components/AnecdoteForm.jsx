import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addAnecdote } from "../requests"
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const { dispatchNotification } = useContext(NotificationContext)
  const queryClient = useQueryClient();
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    add.mutate(content)
  }

  const add = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'],[...anecdotes, newAnecdote])
      dispatchNotification({type: 'notify', payload: 'New anecdote added'})
      setTimeout(() => {dispatchNotification({type: 'clearNotification'})},5000)

    },
    onError: (error) => {
      dispatchNotification({type: 'notify', payload: error.message})
      setTimeout(() => {dispatchNotification({type: 'clearNotification'})},5000)

    }
  })

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
