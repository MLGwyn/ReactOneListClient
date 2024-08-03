import axios from 'axios'
import { TodoItemType } from './App'

export async function getOneTodo(id: string) {
  const response = await axios.get<TodoItemType>(
    `https://one-list-api.herokuapp.com/items/${id}?access_token=cohort26`
  )
  return response.data
}

export async function deleteOneTodo(id: string) {
  const response = await axios.delete(
    `https://one-list-api.herokuapp.com/items/${id}?access_token=cohort26`
  )
  return response
}

export async function getTodos() {
  return (
    await axios.get<TodoItemType[]>(
      'https://one-list-api.herokuapp.com/items?access_token=cohort26'
    )
  ).data
}

export async function createNewTodoItem(newTodoText: string) {
  return await axios.post(
    'https://one-list-api.herokuapp.com/items?access_token=cohort26',
    { item: { text: newTodoText } }
  )
}

export async function toggleItemComplete(
  id: number | undefined,
  complete: boolean
) {
  const response = axios.put(
    `https://one-list-api.herokuapp.com/items/${id}?access_token=cohort26`,
    { item: { complete: !complete } }
  )
  return response
}
