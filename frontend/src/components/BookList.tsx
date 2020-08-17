import React from "react";
import axios from "axios";
// import swal from "sweetalert";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";

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

function BookList({
  bookNo,
  userNo,
  title,
  author,
  image,
  publisher,
  description,
}: any) {
  const addbook = async () => {
    const url = "http://i3d204.p.ssafy.io:9999/book/insertMyBook";
    await axios
      .post(url, {
        bookNo: bookNo,
        userNo: userNo,
      })
      .then(() => {
        // swal({
        //   text: `${title}을 MY BOOKS에 저장했습니다.`,
        //   icon: "success",
        // });
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

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
      {bookNo ? (
        <AddCircleIcon
          style={{ fontSize: 50 }}
          className="add-button"
          onClick={addbook}
        />
      ) : (
        <div></div>
      )}
      <br />
    </div>
  );
}

export default BookList;
