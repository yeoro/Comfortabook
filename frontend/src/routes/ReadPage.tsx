import * as React from "react";
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Paper,
} from "@material-ui/core";
// import thumbnail from "../img/thumbnail.jpg";
import book1 from "../books/book1.json";
import ReadPageFooter from "../components/ReadPageFooter";
import ReadPageHeader from "../components/ReadPageHeader";
import scrollIntoView from "scroll-into-view-if-needed";
import ReadCarousel from "../components/ReadCarousel";
import { Route, BrowserRouter as Router, Link, match } from "react-router-dom";
import axios from "axios";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "768px",
      height: "1024px",
      backgroundColor: "#9e9e9e",
    },
    book: {
      height: "90%",
      width: "90%",
      padding: "5% 5%",
      overflow: "scroll",
      fontSize: "10px | 20px | 30px",
    },
    img: {
      width: "80%",
      height: "auto",
    },
  });

interface sProps extends WithStyles<typeof styles> {
  sizevalue: StatusTypes;
  match?: match<DetailParams>;
}

interface DetailParams {
  bookNo: string;
}

interface State {
  size?: StatusTypes;
  className: string;
  book: any;
  page: number;
  p: number;
}

type StatusTypes = "20" | "30" | "40";

class Read extends React.Component<sProps, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      size: "20",
      className: "large",
      book: {
        title: book1.title,
        bookbody: book1.description,
      },
      page: 0,
      p: 1,
    };
  }
  changeSize = (value: StatusTypes) => {
    this.setState({
      size: value,
    });
    if (value === "20") {
      this.setState({
        className: "large",
      });
    } else if (value === "30") {
      this.setState({
        className: "x-large",
      });
    } else if (value === "40") {
      this.setState({
        className: "xx-large",
      });
    }
  };
  movePage = (value: number) => {
    if (value === 0) {
      let node = document.getElementsByTagName("h1")[0];
      scrollIntoView(node, { behavior: "auto", scrollMode: "if-needed" });
    } else {
      let node = document.getElementsByTagName("p")[value - 1];
      scrollIntoView(node, { behavior: "auto", scrollMode: "if-needed" });
    }
    this.setState({
      page: value,
    });
  };
  getRead = async () => {
    const match = this.props.match;
    const URL = `http://i3d204.p.ssafy.io:9999/book/detail/${match?.params.bookNo}`;
    await axios
      .get(URL)
      .then((res: any) => {
        console.log(res);
        this.setState({
          book: {
            title: res.data.title,
            bookbody: res.data.bookContents,
          },
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getRead();
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ReadPageHeader
          changeSize={this.changeSize}
          value={this.props.sizevalue}
        />
        <Paper className={classes.book}>
          <ReadCarousel
            page={this.state.page}
            book={this.state.book}
            movePage={this.movePage}
            className={this.state.className}
          />
        </Paper>
        <ReadPageFooter
          pagenum={this.state.page}
          movePage={this.movePage}
          page={this.state.book.bookbody.length}
        />
      </div>
    );
  }
}
export default withStyles(styles)(Read);
