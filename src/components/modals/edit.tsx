import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FC, useState } from "react";
import Tasks from "../tasks";

interface IEditModal extends IModal {
  todo: ITodo;
}

const EditModal: FC<IEditModal> = ({ open, handleClose, todo }) => {
  const [header, setHeader] = useState<string>(todo.title);
  const [editTasks, setEditTasks] = useState<ITask[]>(todo.tasks);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{header}</DialogTitle>
      <DialogContent>
        <Tasks tasks={editTasks} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
