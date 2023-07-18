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