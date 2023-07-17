import { Card, CardContent, Grid, Typography } from "@mui/material";
import { FC } from "react";

const AddNewCard: FC<{ handleClick: () => void }> = ({ handleClick }) => {
  return (
    <Grid item key={"addNewCard"} xs={12} sm={6} md={4}>
      <Card onClick={handleClick}>
        <CardContent>
          <Typography variant="h5" component="div" textAlign="center">
            + Add New Todo
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AddNewCard;
