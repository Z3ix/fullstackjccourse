import { createSlice } from "@reduxjs/toolkit";

import anecdoteServices from '../services/anecdoteServices'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],//anecdotesAtStart.map(item => asObject(item)),
  reducers:{
    setAnecdotes(state,action){
      return action.payload;
    },
    voteFor(state, action) {
      console.log('payload')
      console.log(action.payload.id)
      return state.map(item => item.id == action.payload.id?action.payload:item)
    },
    addAnecdote(state, action) {
      return state.concat(action.payload)
    }
  }
})


const { setAnecdotes, addAnecdote, voteFor } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) =>{
    const anecdotes = await anecdoteServices.getAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const pushAnecdote = (anecdote) => {
  return async (dispatch) => {
    const result = await anecdoteServices.postAnecdote(anecdote)
    dispatch(addAnecdote(result))
  }
}

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const result = await anecdoteServices.updateAnecdote(newAnecdote)
    dispatch(voteFor(result))
  }
}

//export const { voteFor } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
