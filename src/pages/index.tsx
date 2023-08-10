import Head from "next/head";
import { FC, useEffect, useReducer } from "react";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import TodoList from "@/components/todoList";
import { GetServerSideProps } from "next";
import InitModal from "@/components/modals/init";
import EditModal from "@/components/modals/edit";
import { useTodos } from "@/hooks/useTodos";
import { useRouter } from "next/router";
import Image from "next/image";
import { initState, reducer } from "@/utils";

interface IHomeProps {
  error: any;
  posts: any;
}

const Home: FC<IHomeProps> = ({ error, posts }) => {
  const router = useRouter();
  const [ { initModal, editModal, editingTodo }, dispatch ] = useReducer(
    reducer,
    initState
  );
  const { addTodo, updateTodo, initTodos } = useTodos();
  
  useEffect(() => {
      if (!posts || posts.length === 0) {
        dispatch({ type: "toggleInitModal" });
      } else {
        initTodos(posts);
      }
    },
    [ posts, initTodos ]);
  
  //TODO: SWR
  const handleRequest = (
    body: string,
    method: "GET" | "POST" | "PUT" = "GET"
  ) => {
    const url = router.query?.session
      ? `/api/todos?session=${router.query.session}`
      : "/api/todos";
    return fetch(url, { method, body });
  };
  
  const handleAddClick = async () => {
    const todo = addTodo();
    dispatch({ type: "startEditingTodo", payload: { ...todo, isNew: true } });
    dispatch({ type: "toggleEditModal" });
  };
  
  const handleEditClick = async (payload: ITodo) => {
    dispatch({ type: "startEditingTodo", payload });
    dispatch({ type: "toggleEditModal" });
  };
  
  const handleSaveClick = async () => {
    try {
      if (!editingTodo) throw new Error("No todo to edit");
      const updatedTodo = { ...editingTodo };
      delete updatedTodo.isNew;
      const list = updateTodo(updatedTodo);
      
      const res = await handleRequest(
        JSON.stringify(list),
        editingTodo.isNew ? "POST" : "PUT"
      );
      const data = await res.json();
      dispatch({ type: "endEditingTodo" });
      dispatch({ type: "toggleEditModal" });
      
      if (!data.session || data.session !== router.query.session)
        await router.replace({ query: { session: data.session } });
    } catch (err: any) {
      console.error(err.message);
      dispatch({ type: "toggleEditModal" });
    }
  };
  
  return (
    <div>
      <Head>
        <title>Todo App</title>
        <meta
          name="description"
          content="Todo app showcasing NextJS features"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <main>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            px: 4,
            py: 2,
          }}
        >
          <Image src="/logo.svg" height={50} width={200} alt="logo"/>
          
          <Button variant="contained" onClick={() => handleAddClick()}>
            Add New +
          </Button>
        </Box>
        <Divider></Divider>
        
        <Container sx={{ py: 8 }} maxWidth="lg">
          <TodoList addNew={handleAddClick} edit={handleEditClick}/>
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
          setTodo={(payload: IEditTodo) =>
            dispatch({ type: "startEditingTodo", payload })
          }
          handleClose={handleSaveClick}
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
      if (data.posts) return { props: { posts: JSON.parse(data.posts) } };
    }
  } catch (err: any) {
    console.error(err);
    // return error message
    return { props: { error: err.message } };
  }
  
  return { props: {} };
};

export default Home;
