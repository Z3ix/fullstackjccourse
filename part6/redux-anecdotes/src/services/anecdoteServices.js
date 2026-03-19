const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
    const response = await fetch(baseUrl);
    if (!response.ok){
        throw new Error("Could not fetch data")
    }
    return await response.json()
}

const postAnecdote = async (anecdote) =>{
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            content: anecdote,
            votes: 0
        })
    }
    const response = await fetch(baseUrl, options)
    if (!response.ok) {
        throw new Error('Could not add Anecdote')
    }
    return response.json()
}

const updateAnecdote = async (anecdote) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(anecdote)
    } 
    const response = await fetch(`${baseUrl}/${anecdote.id}`, options)
    if (!response.ok) {
        throw new Error('Could not update anecdote')
    }
    return response.json()
}

export default {getAnecdotes, postAnecdote, updateAnecdote}