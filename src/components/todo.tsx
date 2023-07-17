import { FC } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import Tasks from "./tasks";
const Todo: FC<ITodo> = ({ position, title, tasks }) => {
  return (
    <Grid item key={title + position} xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Tasks tasks={tasks} />
        </CardContent>
        <CardActions>
          <Button size="small">Edit Todo</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Todo;
