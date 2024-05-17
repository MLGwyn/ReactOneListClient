import React from 'react'
import { TodoItemType } from '../App'
import axios from 'axios'

type TodoItemProps = {
  todoItem: TodoItemType
}
export function TodoItem(props: TodoItemProps) {
  async function toggleCompleteStatus() {
    if (props.todoItem.complete) {
      const response = await axios.put(
        `https://one-list-api.herokuapp.com/items/${props.todoItem.id}?access_token=cohort26`,
        { item: { complete: false } }
      )
      if (response.data === 200) {
        console.log(response.data)
      }
    } else {
      const response = await axios.put(
        `https://one-list-api.herokuapp.com/items/${props.todoItem.id}?access_token=cohort26`,
        { item: { complete: true } }
      )
      if (response.status === 200) {
        console.log(response.data)
      }
    }
  }

  return (
    <li
      className={props.todoItem.complete ? 'completed' : undefined}
      onClick={toggleCompleteStatus}
    >
      {props.todoItem.text}
    </li>
  )
}
