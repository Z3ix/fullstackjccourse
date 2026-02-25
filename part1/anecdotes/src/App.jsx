import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const mostVoted = () => {
    let pick = 0;

    for (let i=0; i < votes.length; i++) {
      if (votes[i] > votes[pick]) pick = i;
    }

    return pick;
  }
  
  function getNewAnecdote () {
    let randomNum = selected;
    while (randomNum == selected) {
      randomNum = Math.floor(Math.random() * anecdotes.length);
    }

    //console.log(randomNum);
    setSelected(randomNum);
  }

  function voteHandler() {
    let newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }

  return (
    <div>
      <h2> Anecdot of the day</h2>
      {anecdotes[selected]}
      <br />{votes[selected]}
      <div>
        <button onClick={voteHandler}>Vote</button>
        <button onClick={getNewAnecdote}>Get another one</button>
      </div>
      <h2> Most popular anecdote</h2>
      <div>{anecdotes[mostVoted()]}</div>
    </div>
  )
}

export default App