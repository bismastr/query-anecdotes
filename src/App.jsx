import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, addVote } from './service/anecdotes'

const App = () => {
  const queryClient = useQueryClient()

  // Get All Anecdotes
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
  //MutateVote
  const voteAnecdotes = useMutation({
    mutationFn: addVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  const anecdotes = result.data

  const handleVote = (anecdote) => {
    voteAnecdotes.mutate(
      {
        ...anecdote,
        votes: anecdote.votes + 1
      }
    )
  }


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
