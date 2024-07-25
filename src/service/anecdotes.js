import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl).then(res => res.data)

export const createAnecdotes = (newAnecdotes) => axios.post(baseUrl, newAnecdotes).then(res => res.data)

export const addVote = (votedAnecdotes) => axios.put(`${baseUrl}/${votedAnecdotes.id}`, votedAnecdotes).then(res => res.data)
