import { FC, PropsWithChildren, createContext, useState } from "react";

export const TodoContext = createContext<ITodoContext>({
  todos: [],
  setTodos: () => {},
});

export const TodoProvider: FC<PropsWithChildren> = ({ children }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
