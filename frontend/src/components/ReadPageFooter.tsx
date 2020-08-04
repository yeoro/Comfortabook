import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "90%",
    padding: "0 5vw",
    position: "fixed",
    bottom: "0",
    backgroundColor: "white",
  },
});

export default function NonLinearSlider() {
  const [value, setValue] = React.useState<number | number[]>(1);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography id="non-linear-slider" gutterBottom>
        {value} / 300
      </Typography>
      <Slider
        value={value}
        min={1}
        step={1}
        max={300}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
    </div>
  );
}
