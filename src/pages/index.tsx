import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    // Fetch some data from the API, defined at /pages/api/example.ts
    fetch("/api/todos?id=test")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta
          name="description"
          content="Todo app showcasing NextJS features"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1 data-testid="title">Todo Appssss</h1>
      </main>
    </>
  );
}
