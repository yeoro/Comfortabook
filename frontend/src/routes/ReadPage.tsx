import * as React from "react";
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Paper,
} from "@material-ui/core";
import thumbnail from "../img/thumbnail.jpg";

export interface state {}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "600px",
      height: "1024px",
      backgroundColor: "#9e9e9e",
    },
    book: {
      height: "100%",
      width: "100%",
      padding: "5vh 5vw",
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
          <img src={thumbnail} alt="thumbnail"></img>
          <p>dddddd</p>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Read);
