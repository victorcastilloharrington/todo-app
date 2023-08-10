import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { FC, useState } from "react";
import Tasks from "../tasks";
import { taskFactory } from "@/utils";

interface IEditModal extends IModal {
  todo: IEditTodo;
  setTodo: (payload: IEditTodo) => void;
}

const EditModal: FC<IEditModal> = ({ open, handleClose, setTodo, todo }) => {
  const { title, tasks } = { ...todo };
  const [ editingIndex, setEditingIndex ] = useState<number | undefined>();
  const [ editingTitle, setEditingTitle ] = useState<boolean>(false);
  
  const handleAddTask = () => {
    const updatedTasks = [ ...tasks ];
    const task = taskFactory();
    updatedTasks.push(task);
    setTodo({ ...todo, tasks: updatedTasks });
    setEditingIndex(updatedTasks.length - 1);
  };
  
  const handleSaveTask = (index: number, value: string) => {
    const updatedTasks = [ ...tasks ];
    updatedTasks[index].title = value;
    setTodo({ ...todo, tasks: updatedTasks });
    setEditingIndex(undefined);
  };
  
  const handleEditTask = (index: number) => setEditingIndex(index);
  
  const handleChecked = (index: number) => {
    const updatedTasks = [ ...tasks ];
    updatedTasks[index] = {
      title: updatedTasks[index].title,
      checked: !updatedTasks[index].checked,
    };
    
    setTodo({ ...todo, tasks: updatedTasks });
  };
  
  const handleEditTitle = (title: string, key: string) => {
    if (key === "Enter") {
      setTodo({ ...todo, title });
      setEditingTitle(false);
    }
  };
  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        onClick={() => setEditingTitle(true)}
      >
        {editingTitle ? (
          <TextField
            type="text"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              // @ts-ignore
              handleEditTitle(e.target.value, e.key)
            }}
            size="small"
            autoFocus
          />
        ) : (
          title
        )}
      </DialogTitle>
      
      <DialogContent>
        <Tasks
          tasks={tasks}
          handleChecked={handleChecked}
          handleEditTask={handleEditTask}
          handleSaveTask={handleSaveTask}
          editingIndex={editingIndex}
        />
        <Button
          variant="text"
          onClick={handleAddTask}
          disabled={editingTitle || !!editingIndex}
        >
          + add task
        </Button>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          disabled={editingTitle || !!editingIndex}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
