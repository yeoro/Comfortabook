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
import ReadPageFooter from "../components/ReadPageFooter";
import ReadPageHeader from "../components/ReadPageHeader";

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
}

type StatusTypes = "10" | "20" | "30" | "40";

class Read extends React.Component<sProps, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      size: "10",
      className: "medium",
    };
  }
  changeSize = (value: StatusTypes) => {
    this.setState({
      size: value,
    });
    if (value === "10") {
      this.setState({
        className: "medium",
      });
    } else if (value === "20") {
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

  render() {
    const { classes } = this.props;
    const fontstyle = {
      fontSize: this.state.className,
    };
    return (
      <div className={classes.root}>
        <ReadPageHeader
          changeSize={this.changeSize}
          value={this.props.sizevalue}
        />
        <Paper className={classes.book}>
          <h1>{book1.title}</h1>
          <img src={thumbnail} alt="thumbnail"></img>
          <p style={fontstyle}>{book1.description}</p>
        </Paper>
        <ReadPageFooter />
      </div>
    );
  }
}
export default withStyles(styles)(Read);
