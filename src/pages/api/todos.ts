import { NextApiHandler } from "next";
import db from "../../../db/db";

// HTTP Endpoint: `/api/example`
const todos: NextApiHandler = async (req, res) => {
  // Gets the `id` from the query field.
  const { session } = req.query;

  switch (req.method) {
    // Handles an API GET
    case 'GET':
      // HTTP GET `/api/example?id=100`: 200 OK
      const get = await db.fetchSession(session as string)
      res.status(200).json({
        success: true,
        session,
        posts: get.posts,
      });
      break;
    case 'POST':
      const post = await db.insertTodo(JSON.parse(req.body))
      res.status(201).json({
        success: true,
        session: post.session,
        data: post.posts,
      })
      break;
    case 'PUT':
      const put = await db.updateTodo(JSON.parse(req.body), session as string)
      res.status(201).json({
        success: true,
        session: put.session,
        data: put.posts,
      })
      break;
    default:
      // Handles all other HTTP methods with a 404
      // HTTP POST `/api/example`: 404 ERROR
      res.status(404).end();
      break;

  };

}

export default todos;