import { useNavigate, useParams } from 'react-router'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export function TodoItemPage() {
  const params = useParams<{ id: string }>()
  const [todoItem, setTodoItem] = useState({
    id: undefined,
    text: '',
    complete: false,
    created_at: undefined,
    updated_at: undefined,
  })
  useEffect(
    function () {
      async function loadItems() {
        const response = await axios.get(
          `https://one-list-api.herokuapp.com/items/${params.id}?access_token=cohort26`
        )
        if (response.status === 200) {
          setTodoItem(response.data)
        }
      }
      loadItems()
    },
    [params.id]
  )
  const navigate = useNavigate()
  async function deleteTodoItem() {
    const response = await axios.delete(
      `https://one-list-api.herokuapp.com/items/${params.id}?access_token=cohort26`
    )
    if (response.status === 204) {
      navigate('/')
    }
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
