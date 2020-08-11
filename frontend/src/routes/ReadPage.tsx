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

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "600px",
      height: "1024px",
      backgroundColor: "#9e9e9e",
    },
    book: {
      height: "auto",
      width: "90%",
      padding: "5vh 5vw",
      overflow: "scroll",
      fontSize: "10px | 20px | 30px",
    },
    img: {
      width: "80%",
      height: "auto",
    },
  });

export interface sProps extends WithStyles<typeof styles> {
  sizevalue: StatusTypes;
}

interface State {
  size?: StatusTypes;
  className: string;
  title: string;
  bookbody: any;
  page: number;
  p: number;
}

type StatusTypes = "10" | "20" | "30" | "40";

class Read extends React.Component<sProps, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      size: "10",
      className: "x-large",
      title: book1.title,
      bookbody: book1.description,
      page: 0,
      p: 1,
    };
  }
  changeSize = (value: StatusTypes) => {
    this.setState({
      size: value,
    });
    if (value === "10") {
      this.setState({
        className: "large",
      });
    } else if (value === "20") {
      this.setState({
        className: "x-large",
      });
    } else if (value === "30") {
      this.setState({
        className: "xx-large",
      });
    } else if (value === "40") {
      this.setState({
        className: "xxx-large",
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
            book={book1}
            movePage={this.movePage}
            className={this.state.className}
          />
          {/* <h1 id="book">{book1.title}</h1>
          <img src={thumbnail} alt="thumbnail"></img>
          {this.state.bookbody.map((body: any, i: number) => {
            return (
              <div>
                <p id={`${i}`} style={fontstyle}>
                  {body.content}
                </p>
                <br></br>
                <hr></hr>
                <br></br>
              </div>
            );
          })} */}
        </Paper>
        <ReadPageFooter
          pagenum={this.state.page}
          movePage={this.movePage}
          page={book1.description.length}
        />
      </div>
    );
  }
}
export default withStyles(styles)(Read);
