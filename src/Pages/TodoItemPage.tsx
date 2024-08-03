import { Link, useLocation, useParams } from 'wouter'
import React from 'react'
import { useDeleteItemMutation, useLoadOneItem } from '../api'

export function TodoItemPage() {
  const params = useParams<{ id: string }>()
  const [location, navigate] = useLocation()
  const { todoItem, isTodoItemLoading } = useLoadOneItem(params.id)
  const deleteMutation = useDeleteItemMutation(params.id, function () {
    location
    navigate('/')
  })

  if (isTodoItemLoading) {
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
          deleteMutation.mutate()
        }}
      >
        Delete
      </button>
    </div>
  )
}
