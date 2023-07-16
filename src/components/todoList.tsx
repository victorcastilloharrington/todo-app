import { useTodos } from "@/hooks/useTodos";
import { useContext } from "react";
import Todo from "./todo";

const TodoList = () => {
  const { todos } = useTodos();

  return (
    <div>
      {todos.map((todo, i) => (
        <Todo key={`${todo}-${i}`} />
      ))}
    </div>
  );
};

export default TodoList;
