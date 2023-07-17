import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { FC } from "react";

const Tasks: FC<{
  tasks: ITask[];
  handleClick?: (index: number) => void;
}> = ({ tasks, handleClick }) => {
  return (
    <List sx={{ width: "100%", minWidth: "500px" }}>
      {tasks.map((task, i) => {
        const labelId = `checkbox-list-label-${task.title}`;

        return (
          <ListItem key={labelId} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={() => handleClick && handleClick(i)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.checked}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Line item ${i + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Tasks;
