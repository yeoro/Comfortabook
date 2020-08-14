import React from "react";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import "./BookList.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: "100%",
      backgroundSize: "contain !important",
      backgroundPosition: "right !important",
    },
  })
);

function BookList({ title, author, image, publisher, description }: any) {
  // const addbook = async () => {
  //   const url = "http://i3d204.p.ssafy.io:9999/book/insertMyBook";
  //   await axios
  //     .post(url, {
  //       bookNo: "14",
  //       userNo: "12",
  //     })
  //     .then((res) => {
  //       console.log("성공");
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //     });
  // };

  const classes = useStyles();

  return (
    <div className="bestseller">
      <br />
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {author} | {publisher}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {description}
            </Typography>
          </CardContent>
        </div>
        <CardMedia
          className={classes.cover}
          image={image}
          title={title}
        ></CardMedia>
      </Card>
      <br />
    </div>
  );
}

export default BookList;
