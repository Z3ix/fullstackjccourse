 import { useDispatch } from "react-redux"
 import { pushAnecdote } from "../reducers/anecdoteReducer"
 import { setNotification } from "../reducers/notificationReducer"

 
 const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = async (e) => {
        e.preventDefault()
        dispatch(pushAnecdote(e.target.anecdote.value))
        
        
        dispatch(setNotification(`You added new anecdote: '${e.target.anecdote.value}'`,5000))
        e.target.anecdote.value = ''
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