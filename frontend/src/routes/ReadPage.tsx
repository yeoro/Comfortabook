import * as React from "react";
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Paper,
} from "@material-ui/core";
import thumbnail from "../img/thumbnail.jpg";
import book1 from "../books/book1.json";

export interface state {}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "600px",
      height: "1024px",
      backgroundColor: "#9e9e9e",
    },
    book: {
      height: "auto",
      width: "100%",
      padding: "5vh 5vw",
      overflow: "scroll",
      fontSize: "10px | 20px | 30px",
    },
    img: {
      width: "80%",
      height: "auto",
    },
  });

export interface sProps extends WithStyles<typeof styles> {}

class Read extends React.Component<sProps, state> {
  // state = {};
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.book}>
          <h1>{book1.title}</h1>
          <img src={thumbnail} alt="thumbnail"></img>
          <p>{book1.description}</p>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Read);
