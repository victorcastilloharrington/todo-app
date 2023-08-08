import { Card, CardContent, Grid, Typography } from "@mui/material";
import { FC } from "react";

const AddNewCard: FC<{ handleClick: () => void }> = ({ handleClick }) => {
  return (
    <Grid item key={"addNewCard"} xs={12} sm={6} md={4}>
      <Card
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          boxShadow: 0,
          border: 1,
          borderColor: "#bbb",
          minHeight: 150,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="p" textAlign="center">
          + Add New Todo
        </Typography>
      </Card>
    </Grid>
  );
};

export default AddNewCard;
