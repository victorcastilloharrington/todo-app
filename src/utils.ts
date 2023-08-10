export const todoFactory = (position: number): ITodo => {
  return {
    position,
    title: 'New Todo',
    tasks: []
  }
}

export const taskFactory = (): ITask => {
  return {
    title: '',
    checked: false
  }
}

export const deleteFromState = (state: IHomeState, key: any) => {
  const s = { ...state }
  delete s[key as keyof IHomeState]
  return s
}
export const initState = {
    initModal: true,
    editModal: false,
};
export const reducer = (state: IHomeState, action: IHomeAction): IHomeState => {

  switch (action.type) {
    case "toggleInitModal":
      return {...state, initModal: !state.initModal};
    case "toggleEditModal":
      return {...state, editModal: !state.editModal};
    case "startEditingTodo":
      return {...state, editingTodo: action.payload};
    case "endEditingTodo":
      return deleteFromState(state, "editingTodo");
    default:
      return state;
  }

};