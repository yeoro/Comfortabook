import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import "./Mypage.css";
import axios from "axios";

const styles = () =>
  createStyles({
    root: {
      padding: "5%",
    },
    editbtn: {
      color: "white",
      backgroundColor: "#f48fb1",
    },
    logoutbtn: {
      color: "white",
      backgroundColor: "#f48fb1",
      width: "100%",
    },
  });

export interface Props extends WithStyles<typeof styles> {
  detail: any;
  logout: () => void;
}

export interface State {
  user_detail: any;
}

class Mypage extends React.Component<Props, State> {
  state = {
    user_detail: this.props.detail,
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "email") {
      this.setState({
        user_detail: {
          email: value,
          name: this.state.user_detail.name,
          phone_num: this.state.user_detail.phone_num,
        },
      });
    } else if (name === "name") {
      this.setState({
        user_detail: {
          email: this.state.user_detail.email,
          name: value,
          phone_num: this.state.user_detail.phone_num,
        },
      });
    } else {
      this.setState({
        user_detail: {
          email: this.state.user_detail.email,
          name: this.state.user_detail.name,
          phone_num: value,
        },
      });
    }
  };

  doedit = async (email: string, name: string) => {
    const token = localStorage.getItem("token");
    let config = {
      headers: {
        "X-AUTH-TOKEN": token,
      },
    };
    await axios.put(
      "http://i3d204.p.ssafy.io:9999/user/update",
      {
        email: this.state.user_detail.email,
        name: this.state.user_detail.name,
        phoneNumber: this.state.user_detail.phone_num,
      },
      config
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={2}>
        <Grid container item spacing={2} direction="column">
          <Grid item>
            <TextField
              onChange={this.onChange}
              name="email"
              label="E-mail"
              defaultValue={this.state.user_detail.email}
            />
          </Grid>
          <Grid item>
            <TextField
              onChange={this.onChange}
              name="name"
              label="이름"
              defaultValue={this.state.user_detail.name}
            />
          </Grid>
          <Grid item>
            <TextField
              onChange={this.onChange}
              name="phone_num"
              label="전화번호"
              defaultValue={this.state.user_detail.phone_num}
            />
          </Grid>
        </Grid>
        <Grid container item>
          <Button className={classes.editbtn}>수정</Button>
        </Grid>
        <Grid container item>
          <Button className={classes.logoutbtn} onClick={this.props.logout}>
            로그아웃
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Mypage);
