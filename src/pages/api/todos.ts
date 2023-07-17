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
      const now = await db.query("SELECT NOW()");
      res.status(200).json({
        success: true,
        session,
        now,
        message: "hi there!",
      });
      break;
    default:
      // Handles all other HTTP methods with a 404
      // HTTP POST `/api/example`: 404 ERROR
      res.status(404).end();
      break;

  };

}

export default todos;