export const CREATE_SESSION_TABLE_QUERY = "CREATE TABLE IF NOT EXISTS session (session UUID PRIMARY KEY DEFAULT gen_random_uuid(), title VARCHAR(50), posts TEXT, date DATE);"
export const INSERT_TODOS_QUERY = 'INSERT INTO "session" (posts, date) VALUES($1, $2) RETURNING *'
export const UPDATE_TODOS_QUERY = 'UPDATE session SET posts=$1, date=$2 WHERE session =$3 RETURNING *'
export const FETCH_SESSION_QUERY = 'SELECT * FROM session WHERE session = $1'