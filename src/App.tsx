import React from 'react'
import logo from './images/sdg-logo.svg'
import { Route, Switch } from 'wouter'
import { TodoItemPage } from './Pages/TodoItemPage'
import { TodoList } from './Pages/TodoList'

export type TodoItemType = {
  id: undefined
  text: string
  complete: boolean
  updated_at: undefined
  created_at: undefined
}

export function App() {
  return (
    <div className="app">
      <header>
        <h1>One List</h1>
      </header>
      <main>
        <Switch>
          <Route path="/" component={TodoList} />
          <Route path="/items/:id" component={TodoItemPage} />
          <Route>Ooops, that URL is unknown</Route>
        </Switch>
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
