import { Link, useLocation, useParams } from 'wouter'
import React from 'react'
import axios from 'axios'
import { TodoItemType } from '../App'
import { useQuery } from 'react-query'

async function getOneTodo(id: string) {
  const response = await axios.get<TodoItemType>(
    `https://one-list-api.herokuapp.com/items/${id}?access_token=cohort26`
  )
  return response.data
}
const EmptyTodoItem: TodoItemType = {
  id: undefined,
  text: '',
  complete: false,
  updated_at: undefined,
  created_at: undefined,
}

export function TodoItemPage() {
  const params = useParams<{ id: string }>()

  const { data: todoItem = EmptyTodoItem, isLoading } = useQuery(
    ['todo', params.id],
    () => getOneTodo(params.id)
  )

  const [location, navigate] = useLocation()
  async function deleteTodoItem() {
    const response = await axios.delete(
      `https://one-list-api.herokuapp.com/items/${params.id}?access_token=cohort26`
    )
    if (response.status === 204) {
      location
      navigate('/')
    }
  }
  if (isLoading) {
    return null
  }
  return (
    <div>
      <p>
        <Link to="/">Home</Link>
      </p>
      <p className={todoItem.complete ? 'completed' : ''}>{todoItem.text}</p>
      <p>Created: {todoItem.created_at}</p>
      <p>Updated: {todoItem.updated_at}</p>
      <button onClick={deleteTodoItem}>Delete</button>
    </div>
  )
}
