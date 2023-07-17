import Head from "next/head";
import { FC, useEffect, useReducer } from "react";
import { Button, Divider, Typography, Container, Box } from "@mui/material";
import TodoList from "@/components/todoList";
import { GetServerSideProps } from "next";
import InitModal from "@/components/modals/init";
import EditModal from "@/components/modals/edit";
import { useTodos } from "@/hooks/useTodos";
import { blue } from "@mui/material/colors";

interface IHomeProps {
  error: any;
  posts: any;
}

interface IHomeState {
  initModal: boolean;
  editModal: boolean;
  editingTodo?: ITodo;
}

interface IHomeAction {
  type:
    | "toggleInitModal"
    | "toggleEditModal"
    | "startEditingTodo"
    | "endEditingTodo";
  payload?: any;
}
const initState = {
  initModal: false,
  editModal: false,
};

const reducer = (state: IHomeState, action: IHomeAction): IHomeState => {
  switch (action.type) {
    case "toggleInitModal":
      return { ...state, initModal: !state.initModal };
      break;
    case "toggleEditModal":
      return { ...state, editModal: !state.editModal };
      break;
    case "startEditingTodo":
      return { ...state, editingTodo: action.payload };
      break;
    case "endEditingTodo":
      //send to db
      //remove editing todo
      //update state
      break;
  }

  return state;
};

const Home: FC<IHomeProps> = ({ error, posts }) => {
  const [{ initModal, editModal, editingTodo }, dispatch] = useReducer(
    reducer,
    initState
  );
  const { todos, addTodo, removeTodo, updateTodo, initTodos } = useTodos();

  useEffect(() => {
    if (!posts || posts.length === 0) {
      dispatch({ type: "toggleInitModal" });
    } else {
      initTodos(posts);
    }
  }, [posts, posts?.length]);

  const handleClickAddNew = () => {
    const todo = addTodo();
    dispatch({ type: "startEditingTodo", payload: todo });
    dispatch({ type: "toggleEditModal" });
  };

  return (
    <div>
      <Head>
        <title>Todo App</title>
        <meta
          name="description"
          content="Todo app showcasing NextJS features"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            px: 4,
            py: 2,
            backgroundColor: blue[600],
          }}
        >
          <Typography
            variant="h4"
            data-testid="title"
            sx={{ fontWeight: "bold" }}
          >
            Todo App
          </Typography>
          <Button variant="contained" onClick={() => handleClickAddNew()}>
            Add New +
          </Button>
        </Box>
        <Divider></Divider>

        <Container sx={{ py: 8 }} maxWidth="lg">
          <TodoList addNew={handleClickAddNew} />
        </Container>

        {error && (
          <Typography color="error">{JSON.stringify(error)}</Typography>
        )}
      </main>
      <InitModal
        open={initModal}
        handleClose={() => dispatch({ type: "toggleInitModal" })}
      />
      {editingTodo && (
        <EditModal
          open={editModal}
          todo={editingTodo}
          handleClose={() => dispatch({ type: "toggleEditModal" })}
        />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    //init session uuid
    if (query.session) {
      // Fetch todo collection
      const raw = await fetch(
        `${process.env.API_ENDPOINT}?session=${query.session}`
      );
      const data = await raw.json();
      if (data.posts) return { props: { posts: data.posts } };
    }
  } catch (err: any) {
    console.error(err);
    // return error message
    return { props: { error: err.message } };
  }

  return { props: {} };
};

export default Home;
