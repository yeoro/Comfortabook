import React from "react";
import { Button, Grid } from "@material-ui/core";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";

const styles = () =>
  createStyles({
    root: {
      padding: "5%",
    },
    btn: {
      backgroundColor: "#f06292",
      width: "100%",
    },
  });

export interface Props extends WithStyles<typeof styles> {
  detail: any;
}

export interface State {
  user_detail: any;
}

class Mypage extends React.Component<Props, State> {
  state = {
    user_detail: this.props.detail,
  };
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        {/* <Grid item>
          <p>email: {this.state.user_detail.email}</p>
          <p>이름: {this.state.user_detail.name}</p>
        </Grid> */}
        <Grid container item>
          <Button className={classes.btn}>로그아웃</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Mypage);
