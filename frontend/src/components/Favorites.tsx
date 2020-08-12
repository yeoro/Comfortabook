import React from "react";
import { Grid } from "@material-ui/core";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import Bookcard from "./Card";

interface Props extends WithStyles<typeof styles> {
  mybooks: any;
  no: any;
}

const styles = () =>
  createStyles({
    root: {},
    list: {
      background: "#fce4ec",
      height: "100%",
      padding: "5% 6%",
    },
  });

interface State {
  booklen: number;
}

class Favorites extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.state = {
      booklen: props.mybooks.length,
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid container item className={classes.list}>
          <Grid container item spacing={2} justify="space-between">
            {this.props.mybooks.map((element: any) => {
              return (
                <Grid item xs={5}>
                  <Bookcard book={element} no={this.props.no} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Favorites);
