import { useDispatch, useSelector } from "react-redux"
import { voteFor } from "../reducers/anecdoteReducer";
import { notify, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => {
        return state.anecdotes.filter(item => item.content.includes(state.filter)) 
    })
    console.log(anecdotes)
    const anecdotesToDisplay = [...anecdotes]
    anecdotesToDisplay.sort((a,b) => b.votes - a.votes)

    const vote = anecdote => {
        console.log('vote', anecdote.id)
        dispatch(voteFor(anecdote))
        dispatch(notify(`You voted for '${anecdote.content}'`))
        setTimeout(() => {dispatch(clearNotification())},5000)
    }

    return (
        <>
        {anecdotesToDisplay.map(anecdote => (
            <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            </div>
        ))}
      </>
    )
}

export default AnecdoteList