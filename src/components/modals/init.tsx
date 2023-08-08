import { Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FC } from "react";

const InitModal: FC<IModal> = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Usage Notes</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          1. Press the Add New button to add a new note.
        </Typography>
        <Typography gutterBottom>
          2. If a note is added, bookmark the URL to save your notes.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Got It!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InitModal;
