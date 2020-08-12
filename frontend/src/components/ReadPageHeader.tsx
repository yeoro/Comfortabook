import * as React from "react";
import { Button, ButtonGroup, makeStyles, Grid } from "@material-ui/core";

interface Props {
  changeSize: (sizevalue: StatusTypes) => void;
  value: StatusTypes;
}

type StatusTypes = "20" | "30" | "40";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "5%",
    position: "fixed",
    top: "0",
    padding: "2",
  },
});

export default function ReadPageHeader(props: Props) {
  const classes = useStyles();
  const [size, setSize] = React.useState(props.value);
  if (size === undefined) {
    setSize("20");
  }
  function sizeUp(event: any) {
    event.preventDefault();
    if (size === "20") {
      setSize("30");
      props.changeSize("30");
    } else if (size === "30") {
      setSize("40");
      props.changeSize("40");
    }
  }
  function sizeDown(event: any) {
    event.preventDefault();
    if (size === "30") {
      setSize("20");
      props.changeSize("20");
    } else if (size === "40") {
      setSize("30");
      props.changeSize("30");
    }
  }
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="space-between">
        <Grid item>
          <ButtonGroup disableElevation variant="contained">
            <Button onClick={sizeDown}>가 -</Button>
            <Button onClick={sizeUp}>가 +</Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <Button>뒤로가기</Button>
        </Grid>
      </Grid>
    </div>
  );
}
