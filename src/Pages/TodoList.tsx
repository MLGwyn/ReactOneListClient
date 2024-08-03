import React, { useState } from 'react'
import { TodoItem } from '../components/TodoItem'
import { useMutation, useQuery } from 'react-query'
import { createNewTodoItem, getTodos } from '../api'

export function TodoList() {
  const {
    data: todoItems = [],
    refetch: refetchTodos,
    isLoading,
  } = useQuery('todos', getTodos)
  const todoItemMutation = useMutation(
    (newTodoText: string) => createNewTodoItem(newTodoText),
    {
      onSuccess: function () {
        refetchTodos()
        setNewTodoText('')
      },
    }
  )
  const [newTodoText, setNewTodoText] = useState('')

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <ul>
        {todoItems.map(function (todoItem) {
          return (
            <TodoItem
              key={todoItem.id}
              todoItem={todoItem}
              reloadItems={() => refetchTodos()}
            />
          )
        })}
      </ul>
      <form
        onSubmit={function (event) {
          event.preventDefault()
          todoItemMutation.mutate(newTodoText)
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
