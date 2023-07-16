import Head from "next/head";
import { useEffect } from "react";
import { Typography } from "@mui/material";

export default function Home() {
  useEffect(() => {
    // Fetch some data from the API, defined at /pages/api/example.ts
    fetch("/api/todos?id=test")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);

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
        <Typography variant="h1" data-testid="title">
          Todo Appssss
        </Typography>
      </main>
    </div>
  );
}
