import React from "react";
import { History } from "history";
import axios from "axios";
import swal from "sweetalert";

import { Button, Grid, TextField } from "@material-ui/core";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";

import "./Mypage.css";

const styles = () =>
  createStyles({
    root: {
      padding: "20%",
    },
    editbtn: {
      color: "white",
      backgroundColor: "#f48fb1",
      width: "100%",
      marginTop: "40px",
      "&:hover": { background: "#ec407a" },
    },
    logoutbtn: {
      color: "white",
      backgroundColor: "#f48fb1",
      width: "100%",
      "&:hover": { background: "#ec407a" },
    },
    tfield: {
      width: "100%",
    },
  });

export interface Props extends WithStyles<typeof styles> {
  detail: any;
  logout: () => void;
  goMainpage: () => void;
  history: History;
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
    if (name === "password") {
      this.setState({
        user_detail: {
          email: this.state.user_detail.email,
          password: value,
          name: this.state.user_detail.name,
          phone_num: this.state.user_detail.phone_num,
          role: this.state.user_detail.role,
          no: this.state.user_detail.no,
        },
      });
    } else if (name === "name") {
      this.setState({
        user_detail: {
          email: this.state.user_detail.email,
          password: this.state.user_detail.password,
          name: value,
          phone_num: this.state.user_detail.phone_num,
          role: this.state.user_detail.role,
          no: this.state.user_detail.no,
        },
      });
    } else {
      this.setState({
        user_detail: {
          email: this.state.user_detail.email,
          password: this.state.user_detail.password,
          name: this.state.user_detail.name,
          phone_num: value,
          role: this.state.user_detail.role,
          no: this.state.user_detail.no,
        },
      });
    }
  };

  doedit = async () => {
    const token = localStorage.getItem("token");
    let config = {
      headers: {
        "X-AUTH-TOKEN": token,
      },
    };
    await axios
      .put(
        "http://i3d204.p.ssafy.io:9999/user/update",
        {
          name: this.state.user_detail.name,
          password: this.state.user_detail.password,
          phoneNumber: this.state.user_detail.phone_num,
        },
        config
      )
      .then(() => {
        swal({
          text: "수정이 완료되었습니다.",
          icon: "success",
        });
        this.props.goMainpage();
      })
      .catch((e) => {
        // API 호출이 실패한 경우
        console.log(e.response); // 에러표시
        console.log(this.state.user_detail.password);
      });
  };
  render() {
    const { classes } = this.props;
    let admingrid;
    if (this.state.user_detail.role === "ROLE_ADMIN") {
      admingrid = (
        <Grid container item>
          <Button
            className={classes.logoutbtn}
            onClick={() => {
              this.props.history.push("/admin");
            }}
          >
            관리자 페이지
          </Button>
        </Grid>
      );
    } else {
      admingrid = null;
    }
    return (
      <div className="mypage">
        <Grid container className={classes.root} spacing={2}>
          <Grid container item spacing={2} direction="column">
            <Grid item>
              <TextField
                onChange={this.onChange}
                name="email"
                label="E-mail"
                disabled
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={this.state.user_detail.email}
                className={classes.tfield}
              />
            </Grid>
            <Grid item>
              <TextField
                onChange={this.onChange}
                name="name"
                label="이름"
                defaultValue={this.state.user_detail.name}
                className={classes.tfield}
              />
            </Grid>
            <Grid item>
              <TextField
                onChange={this.onChange}
                name="phone_num"
                label="전화번호"
                defaultValue={this.state.user_detail.phone_num}
                className={classes.tfield}
              />
            </Grid>
            <Grid item>
              <TextField
                onChange={this.onChange}
                name="password"
                label="비밀번호"
                type="password"
                className={classes.tfield}
              />
            </Grid>
          </Grid>
          <Grid container item>
            <Button className={classes.editbtn} onClick={this.doedit}>
              수정
            </Button>
          </Grid>
          <Grid container item>
            <Button className={classes.logoutbtn} onClick={this.props.logout}>
              로그아웃
            </Button>
          </Grid>
          {admingrid}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Mypage);
