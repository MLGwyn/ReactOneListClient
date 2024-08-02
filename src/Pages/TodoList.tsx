import React, { useState } from 'react'
import axios from 'axios'
import { TodoItem } from '../components/TodoItem'
import { TodoItemType } from '../App'
import { useQuery } from 'react-query'

async function getTodos() {
  return (
    await axios.get<TodoItemType[]>(
      'https://one-list-api.herokuapp.com/items?access_token=cohort26'
    )
  ).data
}

export function TodoList() {
  const {
    data: todoItems = [],
    refetch,
    isLoading,
  } = useQuery('todos', getTodos)
  const [newTodoText, setNewTodoText] = useState('')

  if (isLoading) {
    return <div>Loading...</div>
  }

  async function handleCreateNewTodoItem() {
    const response = await axios.post(
      'https://one-list-api.herokuapp.com/items?access_token=cohort26',
      { item: { text: newTodoText } }
    )
    if (response.status === 201) {
      refetch()
      setNewTodoText('')
    }
  }
  return (
    <>
      <ul>
        {todoItems.map(function (todoItem) {
          return (
            <TodoItem
              key={todoItem.id}
              todoItem={todoItem}
              reloadItems={() => refetch()}
            />
          )
        })}
      </ul>
      <form
        onSubmit={function (event) {
          event.preventDefault()
          handleCreateNewTodoItem()
        }}
      >
        <input
          type="text"
          placeholder="Whats up?"
          value={newTodoText}
          onChange={function (event) {
            setNewTodoText(event.target.value)
          }}
        />
      </form>
    </>
  )
}
