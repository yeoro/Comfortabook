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
    width: "768px",
  },
  s1p1: {
    margin: "0 0",
  },
});

function Homecarousel() {
  const classes = useStyles();
  return (
    <div className={classes.homecarousel}>
      <Carousel
        defaultControlsConfig={{
          nextButtonText: ">",
          prevButtonText: "<",
        }}
        autoplay={true}
        wrapAround={true}
      >
        <div className="carousel-item">
          <img className={classes.img} src={library1} alt="slide1"></img>
          <div className="sentence1">
            <p className={classes.s1p1}>하루라도 책을 </p>
            <p className={classes.s1p1}>읽지 않으면 </p>
            <p className={classes.s1p1}>입에 가시가 </p>
            <p className={classes.s1p1}>돋힌다. </p>
          </div>
        </div>
        <div className="carousel-item">
          <img className={classes.img} src={library2} alt="slide2"></img>
          <div className="sentence2">
            <p>가장 좋은</p>
            <p>벗은</p>
            <p>책이다.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img className={classes.img} src={library3} alt="slide3"></img>
          <div className="sentence3">
            <p>책 없는 방은 영혼 없는 육체와 같다.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img className={classes.img} src={library4} alt="slide4"></img>
          <div className="sentence4">
            <p>내가 세계를 알게 된 것은 </p>
            <p> 책에 의해서였다.</p>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default Homecarousel;
