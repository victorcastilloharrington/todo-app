require("dotenv").config();
import { Pool, QueryResult } from "pg";
import { CREATE_SESSION_TABLE_QUERY, FETCH_SESSION_QUERY, INSERT_TODOS_QUERY, UPDATE_TODOS_QUERY } from './constants'
// Sets up a connection pool to a Postgres database
// To query the database:
// ```
// import db from 'db'
// const result = await db.query('SELECT * FROM "user" WHERE email=$1', ['jane@example.com'])
// ```
// const { Pool } = require("pg");

const connectionString = process.env.DB_ENDPOINT;

const pool = new Pool({
  connectionString,
});

/**
 * Performs a database query with the SQL text and arguments. Can use SQL
 * parameters with $1 $2 $3 etc. and passing in the arguments as an array.
 *
 * @param text SQL query to execute
 * @param params SQL parameters
 * @example Select statement:
 * ```
 * const result = await query('SELECT * FROM "user" WHERE email=$1', ['jane@example.com'])
 * ```
 * @example INSERT statement:
 * ```
 * const result = await query('INSERT INTO "user"(name, email) VALUES($1, $2)', ['brianc', 'brian.m.carlson@gmail.com'])
 * ```
 */
const query = async (text: string, params?: string[]): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const executionParams = params ? params : [];
    console.log("[db/db.ts] Executing query:", text, executionParams);
    pool.query(text, executionParams, (err, res) => {
      if (err) {
        return reject(err);
      }
      if (res) {
        resolve(res.rows);
      }
    });
  });
};

const createTableSession = async () => await query(CREATE_SESSION_TABLE_QUERY)

const fetchSession = async (session: string) => {
  const result = await query(FETCH_SESSION_QUERY, [session])
  return result[0]
}

const insertTodo = async (todo: ITodo) => {
  await createTableSession()
  const result = await query(INSERT_TODOS_QUERY, [JSON.stringify(todo), (new Date()).toISOString()])
  return result[0]
}

const updateTodo = async (todo: ITodo, session: string) => {
  const result = await query(UPDATE_TODOS_QUERY, [JSON.stringify(todo), (new Date()).toISOString(), session])
  return result[0]
}

const db = { fetchSession, insertTodo, updateTodo }
export default db;
