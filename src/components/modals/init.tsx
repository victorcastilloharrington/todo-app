import { Button } from "@mui/material";
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
        <DialogContentText id="alert-dialog-description">
          Click the plus icon in the top bar to add a new note. bookmark the URL
          to save your session (and all your notes!)
        </DialogContentText>
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
