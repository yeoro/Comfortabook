import * as React from "react";
import { Button, ButtonGroup, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "5%",
    position: "fixed",
    top: "0",
    padding: "2",
  },
});

export default function ReadPageHeader() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ButtonGroup disableElevation variant="contained">
        <Button>가 -</Button>
        <Button>가 +</Button>
      </ButtonGroup>
    </div>
  );
}
