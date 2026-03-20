const baseUrl = 'http://localhost:3001/anecdotes'

export const  getAnecdotes = async () => {
      const response = await fetch(baseUrl) 
      if (!response.ok) {
        throw new Error('Failed to fetch anecdotes')
      }
      return await response.json()
    }

export const addAnecdote = async (content) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({content, votes: 0})
    }

    const response = await fetch(baseUrl, options)
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
    }
    return await response.json()
}

export const updateAnecdote = async (entry) => {
    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(entry)
    }
    console.log(options)
    const response = await fetch(`${baseUrl}/${entry.id}`, options)
    if (!response.ok) {
        throw new Error('Failed to update anecdote')
    }
    console.log(response)
    return await response.json()
}

