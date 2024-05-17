import React, { useEffect, useState } from 'react'
import logo from './images/sdg-logo.svg'
import axios from 'axios'

type TodoItemType = {
  id: number
  text: string
  complete: boolean
  updated_at: Date
  created_at: Date
}

export function App() {
  const [todoItems, setTodoItems] = useState<TodoItemType[]>([])
  const [newTodoText, setNewTodoText] = useState('')

  useEffect(function () {
    async function loadItems() {
      const response = await axios.get(
        'https://one-list-api.herokuapp.com/items?access_token=cohort26'
      )
      if (response.status === 200) {
        setTodoItems(response.data)
      }
    }
    loadItems()
  }, [])

  async function handleCreateNewTodoItem() {
    const response = await axios.post(
      'https://one-list-api.herokuapp.com/items?access_token=cohort26',
      { item: { text: newTodoText } }
    )
    if (response.status === 201) {
      // const newTodo = response.data
      // const newTodoItems = [...todoItems, newTodo]
      // setTodoItems(newTodoItems)
      // setNewTodoText('')
      // ^this code is appending the list
      const refreshTodoResponse = await axios.get(
        'https://one-list-api.herokuapp.com/items?access_token=cohort26'
      )
      setTodoItems(refreshTodoResponse.data)
      setNewTodoText('')
      // ^this code is replacing the list
    }
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
