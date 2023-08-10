import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import React, { FC } from "react";
import { TextField } from "@mui/material";

const Tasks: FC<{
  tasks: ITask[];
  handleEditTask?: (index: number) => void;
  handleChecked?: (index: number) => void;
  editingIndex?: number;
  handleSaveTask?: (index: number, value: string) => void;
}> = ({
        tasks,
        handleEditTask,
        handleChecked,
        editingIndex,
        handleSaveTask,
      }) => {
  const handleEditTaskFinish = (index: number, value: string, key?: string) => {
    if (key && key === "Enter" && handleSaveTask) {
      handleSaveTask(index, value);
    }
  };
  
  return (
    <List sx={{ width: "100%", minWidth: "500px" }}>
      {tasks.map((task, i) => {
        const labelId = `checkbox-list-label-${task.title} ${i}`;
        return (
          <ListItem key={labelId} disablePadding>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={task.checked}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
                onClick={() => {
                  if (handleChecked)
                    handleChecked(i);
                }}
              />
            </ListItemIcon>
            {editingIndex === i ? (
              <TextField
                type="text"
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  // @ts-ignore
                  handleEditTaskFinish?.(i, e.target.value, e.key)
                }
                }
                size="small"
                autoFocus
              />
            ) : (
              <ListItemButton onClick={() => {
                if (handleEditTask)
                  handleEditTask(i)
              }}>
                <ListItemText id={labelId} primary={task.title}/>
              </ListItemButton>
            )}
          </ListItem>
        );
      })}
    </List>
  );
};

export default Tasks;
