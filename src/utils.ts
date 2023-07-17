export const todoFactory = (position: number): ITodo => {
  return {
    position,
    title: 'New Todo',
    tasks: []
  }
}