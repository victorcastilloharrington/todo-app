export { }

declare global {
  interface ITask {
    title: string
    checked: boolean
  }

  interface ITodo {
    position: number
    title: string
    tasks: ITask[]
  }

  interface ITodoContext {
    todos?: ITodo[]
    setTodos: (todos: ITodo[]) => void
  }
}