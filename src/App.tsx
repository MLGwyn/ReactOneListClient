import React, { useEffect, useState } from 'react'
import logo from './images/sdg-logo.svg'
import axios from 'axios'
export function App() {
  const [todoItems, setTodoItems] = useState<TodoItemType[]>([])
  const [newTodoText, setNewTodoText] = useState('')
  async function handleCreateNewTodoItem() {
    const response = await axios.post(
      'https://one-list-api.herokuapp.com/items?access_token=cohort42',
      { item: { text: newTodoText } }
    )
    if (response.status === 201) {
      console.log(response.data)
    }
    const newTodo = response.data
    const newTodoItems = [...todoItems, newTodo]
    setTodoItems(newTodoItems)
  }
  useEffect(function () {
    async function loadItems() {
      const response = await axios.get(
        'https://one-list-api.herokuapp.com/items?access_token=cohort42'
      )
      if (response.status === 200) {
        console.log(response.data)
        setTodoItems(response.data)
      }
    }
    loadItems()
  }, [])
  type TodoItemType = {
    id: number
    text: string
    complete: boolean
    updated_at: Date
    created_at: Date
  }

  return (
    <div className="app">
      <header>
        <h1>One List</h1>
      </header>
      <main>
        <ul>
          {todoItems.map(function (todoItem) {
            return (
              <li
                key={todoItem.id}
                className={todoItem.complete ? 'completed' : undefined}
              >
                {todoItem.text}
              </li>
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
      </main>
      <footer>
        <p>
          <img src={logo} height="42" alt="logo" />
        </p>
        <p>&copy; 2024 Suncoast Developers Guild</p>
      </footer>
    </div>
  )
}
