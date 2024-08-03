import { Link, useLocation, useParams } from 'wouter'
import React from 'react'
import { TodoItemType } from '../App'
import { useMutation, useQuery } from 'react-query'
import { deleteOneTodo, getOneTodo } from '../api'

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

  const deleteMutation = useMutation((id: string) => deleteOneTodo(id), {
    onSuccess: function () {
      location
      navigate('/')
    },
  })

  const [location, navigate] = useLocation()

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
      <button
        onClick={function () {
          deleteMutation.mutate(params.id)
        }}
      >
        Delete
      </button>
    </div>
  )
}
