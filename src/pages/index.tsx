import Head from "next/head";
import { FC, useEffect, useReducer } from "react";
import { Divider, Typography } from "@mui/material";
import TodoList from "@/components/todoList";
import { GetServerSideProps } from "next";
import InitModal from "@/components/modals/init";
import EditModal from "@/components/modals/edit";

interface IHomeProps {
  error: any;
  posts: any;
}

interface IHomeState {
  initModal: boolean;
  editModal: boolean;
}

interface IHomeAction {
  type: "toggleInitModal" | "toggleEditModal";
  payload?: string;
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
  }

  return state;
};

const Home: FC<IHomeProps> = ({ error, posts }) => {
  const [{ initModal, editModal }, dispatch] = useReducer(reducer, initState);
  useEffect(() => {
    if (!posts || posts.length === 0) {
      dispatch({ type: "toggleInitModal" });
    }
  }, [posts, posts?.length]);

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
        <Typography variant="h3" data-testid="title">
          Todo App
        </Typography>
        <Divider></Divider>
        {!posts && (
          <div onClick={() => dispatch({ type: "toggleEditModal" })}>
            Add New +
          </div>
        )}
        {posts && <TodoList />}
        {error && (
          <Typography color="error">{JSON.stringify(error)}</Typography>
        )}
      </main>
      <InitModal
        open={initModal}
        handleClose={() => dispatch({ type: "toggleInitModal" })}
      />
      <EditModal
        open={editModal}
        position={0}
        title="Example Todo"
        tasks={[]}
        handleClose={() => dispatch({ type: "toggleEditModal" })}
      />
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
