import React from "react";
import Carousel from "nuka-carousel";
import library1 from "../img/library1.jpg";
import library2 from "../img/library2.jpg";
import library3 from "../img/library3.jpg";
import library4 from "../img/library4.jpg";
import { makeStyles } from "@material-ui/core";
import "./Homecarousel.css";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fce4ec",
    height: "300px",
  },
  img: {
    opacity: "0.7",
  },
});

function Homecarousel() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Carousel framePadding="0">
        <img className={classes.img} src={library1} alt="slide1"></img>
        <img className={classes.img} src={library2} alt="slide2"></img>
        <img className={classes.img} src={library3} alt="slide3"></img>
        <img className={classes.img} src={library4} alt="slide4"></img>
      </Carousel>
    </div>
  );
}

export default Homecarousel;
