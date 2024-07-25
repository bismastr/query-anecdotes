import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdotes } from "../service/anecdotes"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()

  const getId = () => (100000 * Math.random()).toFixed(0)
  const queryClient = useQueryClient()
  const newAnecdotes = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({ type: 'SET', payload: `Succesfully add ${data.content}` })
      setTimeout(() => {
        dispatch({ type: 'REMOVE' })
      }, 5000)
    }, onError: (err) => {
      dispatch({ type: 'SET', payload: err.response.data.error })
      setTimeout(() => {
        dispatch({ type: 'REMOVE' })
      }, 5000)

    }
  })
  //Create Anecdotes
  const submitAnecdotes = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdotes.mutate({ content, votes: 0, id: getId() })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={submitAnecdotes}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
