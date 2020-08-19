import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "680px",
    padding: "0 5%",
    position: "fixed",
    bottom: "0",
    backgroundColor: "white",
  },
});

interface Props {
  page: number;
  movePage: (value: any) => void;
  pagenum: number;
}

export default function NonLinearSlider(props: Props) {
  const handleChange = (event: any, newValue: number | number[]) => {
    props.movePage(newValue);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography id="non-linear-slider" gutterBottom>
        {props.pagenum} / {props.page}
      </Typography>
      <Slider
        value={props.pagenum}
        min={0}
        step={1}
        max={props.page}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
    </div>
  );
}
export const MemoizedMovie = React.memo(NonLinearSlider);
