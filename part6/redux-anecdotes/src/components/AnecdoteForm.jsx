 import { useDispatch } from "react-redux"
 import { addAnecdote } from "../reducers/anecdoteReducer"
 import { notify, clearNotification } from "../reducers/notificationReducer"
 
 const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = (e) => {
        e.preventDefault()
        dispatch(addAnecdote(e.target.anecdote.value))
        dispatch(notify(`You added new anecdote: '${e.target.anecdote.value}'`))
        setTimeout(() => {dispatch(clearNotification())},5000)
    }

    return (
        <>
        <h2>create new</h2>
        <form onSubmit={add}>
            <div>
            <input name = 'anecdote'/>
            </div>
            <button type='submit'>create</button>
        </form>
      </>
    )
 }


 export default AnecdoteForm