import { createSlice } from "@reduxjs/toolkit";

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
  initialState: anecdotesAtStart.map(item => asObject(item)),
  reducers:{
    voteFor(state, action) {
      console.log('payload')
      console.log(action.payload.id)
      return state.map(item => item.id == action.payload.id?{...item, votes: item.votes + 1}:item)
    },
    addAnecdote(state, action) {
      return state.concat(asObject(action.payload))
    }
  }
})
/*
const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'LIKE':
      const anecdote = {...state.find(item => item.id == action.payload.id)}
      anecdote.votes +=1 
      const newState = state.map(item => item.id == anecdote.id ? anecdote : item)
      return newState;
    case 'ADD':
      return [...state, action.payload]
    default:
      return state;
  }


}

export const voteFor = id => {
  return {
    type: 'LIKE',
    payload: {
      id: id
    }
  }
}

export const addAnecdote = content => {
  return {
    type: 'ADD',
    payload: asObject(content)
  }
}
*/
export const { addAnecdote, voteFor } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
