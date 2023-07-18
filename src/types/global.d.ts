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
    todos: ITodo[]
    setTodos: (todos: ITodo[]) => void
  }

  interface IModal {
    open: boolean
    handleClose: () => void
  }

  interface IEditTodo extends ITodo {
    isNew?: boolean
  }

  interface IHomeState {
    initModal: boolean;
    editModal: boolean;
    editingTodo?: IEditTodo;
  }

  interface IHomeAction {
    type:
    | "toggleInitModal"
    | "toggleEditModal"
    | "startEditingTodo"
    | "endEditingTodo";
    payload?: any;
  }
}