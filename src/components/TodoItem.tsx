import React from 'react'
import { TodoItemType } from '../App'
import axios from 'axios'

type TodoItemProps = {
  todoItem: TodoItemType
  reloadItems: () => void
}
export function TodoItem({ todoItem, reloadItems }: TodoItemProps) {
  async function toggleCompleteStatus() {
    const response = await axios.put(
      `https://one-list-api.herokuapp.com/items/${todoItem.id}?access_token=cohort26`,
      { item: { complete: !todoItem.complete } }
    )

    if (response.status === 200) {
      reloadItems()
    }
  }

  return (
    <li
      className={todoItem.complete ? 'completed' : undefined}
      onClick={toggleCompleteStatus}
    >
      {todoItem.text}
    </li>
  )
}
