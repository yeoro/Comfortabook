import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
interface Props {
  book: any;
  no: any;
  gotoread: (bookNo: string, page: number) => void;
}

export default function SimpleCard(props: Props) {
  const classes = useStyles();
  const delMybook = async () => {
    await axios
      .delete(
        `http://i3d204.p.ssafy.io:9999/book/deleteMyBook/u=${props.no}&b=${props.book.bookNo}`
      )
      .then(() => {
        console.log("삭제 완료");
        window.location.reload(false);
      })
      .catch((e) => {
        // API 호출이 실패한 경우
        console.error(e.response); // 에러표시
      });
  };
  const read = () => {
    props.gotoread(props.book.bookNo, props.book.page);
  };

  return (
    <Card className={classes.root}>
      <Button onClick={read}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            제목
          </Typography>
          <Typography variant="h5" component="h2">
            {props.book.title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            작가
          </Typography>
          <Typography variant="body2" component="p">
            {props.book.author}
            <br />
          </Typography>
        </CardContent>
      </Button>
      <Button onClick={delMybook}>삭제</Button>
    </Card>
  );
}
