import { useTodos } from "@/hooks/useTodos";
import { FC, useContext } from "react";
import Todo from "./todo";
import AddNewCard from "./addNew";
import { Grid } from "@mui/material";

const TodoList: FC<{ addNew: () => void; edit: (todo: ITodo) => void }> = ({
  addNew,
  edit,
}) => {
  const { todos } = useTodos();

  return (
    <Grid container spacing={4}>
      {todos.length <= 0 ? (
        <AddNewCard handleClick={addNew} />
      ) : (
        todos.map((todo, i) => (
          <Todo key={`${todo}-${i}`} {...todo} edit={edit} />
        ))
      )}
    </Grid>
  );
};

export default TodoList;
