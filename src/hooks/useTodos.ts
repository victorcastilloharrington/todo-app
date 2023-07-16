import { TodoContext } from "@/context"
import { useContext } from "react"

export const useTodos = () => {
  const { todos, setTodos } = useContext(TodoContext)

  return { todos }
}