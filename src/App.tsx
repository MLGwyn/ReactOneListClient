import React from 'react'
import logo from './images/sdg-logo.svg'
import { Route, Routes } from 'react-router'
import { TodoItemPage } from './Pages/TodoItemPage'
import { TodoList } from './Pages/ToDoList'

export type TodoItemType = {
  id: number
  text: string
  complete: boolean
  updated_at: Date
  created_at: Date
}

export function App() {
  return (
    <div className="app">
      <header>
        <h1>One List</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/items/:id" element={<TodoItemPage />} />
          <Route path="*" element="Ooops, that URL is unknown" />
        </Routes>
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
