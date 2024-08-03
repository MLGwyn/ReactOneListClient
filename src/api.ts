import axios from 'axios'
import { TodoItemType } from './App'

const BASE_URL = 'https:/one-list-api.herokuapp.com/items'

export async function getOneTodo(id: string) {
  const response = await axios.get<TodoItemType>(
    `${BASE_URL}/${id}?access_token=cohort26`
  )
  return response.data
}

export async function deleteOneTodo(id: string) {
  const response = await axios.delete(`${BASE_URL}/${id}?access_token=cohort26`)
  return response
}

export async function getTodos() {
  return (await axios.get<TodoItemType[]>(`${BASE_URL}?access_token=cohort26`))
    .data
}

export async function createNewTodoItem(newTodoText: string) {
  return await axios.post(`${BASE_URL}?access_token=cohort26`, {
    item: { text: newTodoText },
  })
}

export async function toggleItemComplete(
  id: number | undefined,
  complete: boolean
) {
  const response = axios.put(`${BASE_URL}/${id}?access_token=cohort26`, {
    item: { complete: !complete },
  })
  return response
}
