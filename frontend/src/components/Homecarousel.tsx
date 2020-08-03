import React from "react";
import Carousel from "nuka-carousel";
import library1 from "../img/library1.jpg";
import library2 from "../img/library2.jpg";
import library3 from "../img/library3.jpg";
import library4 from "../img/library4.jpg";
import { makeStyles } from "@material-ui/core";
import "./Homecarousel.css";

const useStyles = makeStyles({
  homecarousel: {
    backgroundColor: "#fce4ec",
  },
  img: {
    opacity: "0.7",
  },
});

function Homecarousel() {
  const classes = useStyles();
  return (
    <div className={classes.homecarousel}>
      <Carousel framePadding="0">
        <div className="carousel-item">
          <img className={classes.img} src={library1} alt="slide1"></img>
          <h1 className="sentence">도</h1>
        </div>
        <div className="carousel-item">
          <img className={classes.img} src={library2} alt="slide2"></img>
          <h1 className="sentence">레</h1>
        </div>
        <div className="carousel-item">
          <img className={classes.img} src={library3} alt="slide3"></img>
          <h1 className="sentence">미</h1>
        </div>
        <div className="carousel-item">
          <img className={classes.img} src={library4} alt="slide4"></img>
          <h1 className="sentence">파</h1>
        </div>
      </Carousel>
    </div>
  );
}

export default Homecarousel;
