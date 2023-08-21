require("dotenv").config();
import { Pool, QueryResult } from "pg";
import { CREATE_SESSION_TABLE_QUERY, FETCH_SESSION_QUERY, INSERT_TODOS_QUERY, UPDATE_TODOS_QUERY } from './constants'


const connectionString = process.env.DB_ENDPOINT;

const pool = new Pool({
  connectionString,
});


const query = async (text: string, params?: string[]): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const executionParams = params ? params : [];
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
  const result = await query(FETCH_SESSION_QUERY, [ session ])
  return result[0]
}

const insertTodo = async (todo: ITodo) => {
  await createTableSession()
  const result = await query(INSERT_TODOS_QUERY, [ JSON.stringify(todo), (new Date()).toISOString() ])
  return result[0]
}

const updateTodo = async (todo: ITodo, session: string) => {
  const result = await query(UPDATE_TODOS_QUERY, [ JSON.stringify(todo), (new Date()).toISOString(), session ])
  return result[0]
}

const db = { fetchSession, insertTodo, updateTodo }
export default db;
