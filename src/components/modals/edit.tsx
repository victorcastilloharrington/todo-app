import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FC, useState } from "react";
import Tasks from "../tasks";

const EditModal: FC<IModal & ITodo> = ({ open, handleClose, title, tasks }) => {
  const [header, setHeader] = useState<string>(title);
  const [editTasks, setEditTasks] = useState<ITask[]>(tasks);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{header}</DialogTitle>
      <DialogContent>
        <Tasks />
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
