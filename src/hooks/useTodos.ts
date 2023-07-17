import { TodoContext } from "@/context"
import { todoFactory } from "@/utils"
import { useContext } from "react"


export const useTodos = () => {
  const { todos, setTodos } = useContext(TodoContext)

  const addTodo = () => {
    const position = todos?.length > 0 ? todos.length + 1 : 0
    const blankTodo = todoFactory(position)
    const updatedTodos = [...todos]
    updatedTodos.push(blankTodo)
    setTodos(updatedTodos)
    return blankTodo
  }

  const removeTodo = (position: number) => {
    const updatedTodos = [...todos].splice(position, 1)
    setTodos(updatedTodos)
  }

  const updateTodo = (position: number, todo: ITodo) => {
    const updatedTodos = [...todos]
    updatedTodos[position] = todo
    setTodos(updatedTodos)
  }

  const initTodos = (posts: ITodo[]) => {
    setTodos(posts)
  }

  return { todos, addTodo, removeTodo, updateTodo, initTodos }
}