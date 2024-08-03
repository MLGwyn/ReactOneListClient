import axios from 'axios'
import { TodoItemType } from './App'
import { useMutation, useQuery } from 'react-query'

const BASE_URL = 'https:/one-list-api.herokuapp.com/items'

export async function getOneTodo(id: string) {
  return (
    await axios.get<TodoItemType>(`${BASE_URL}/${id}?access_token=cohort26`)
  ).data
}

export async function deleteOneTodo(id: string) {
  return await axios.delete(`${BASE_URL}/${id}?access_token=cohort26`)
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
  return axios.put(`${BASE_URL}/${id}?access_token=cohort26`, {
    item: { complete: !complete },
  })
}

export const EmptyTodoItem: TodoItemType = {
  id: undefined,
  text: '',
  complete: false,
  updated_at: undefined,
  created_at: undefined,
}

export function useDeleteItemMutation(id: string, onSuccess: () => void) {
  return useMutation(() => deleteOneTodo(id), { onSuccess })
}

export function useLoadOneItem(id: string) {
  const { data: todoItem = EmptyTodoItem, isLoading: isTodoItemLoading } =
    useQuery(['todo', id], () => getOneTodo(id))
  return { todoItem, isTodoItemLoading }
}
