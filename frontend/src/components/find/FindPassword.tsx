import * as React from "react";
import { History } from "history";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

import { Grid, TextField, Button } from "@material-ui/core";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";

import "./FindId.css";

const styles = () =>
  createStyles({
    form: {
      height: "100%",
    },
    formGrid: {
      height: "100%",
      marginTop: "20%",
      padding: "0 10%",
    },
    alink: {
      textDecoration: "None",
      color: "Black",
      lineHeight: "19px",
      fontFamily: "RIDIBatang",
    },
    tfield: {
      width: "100%",
    },
    button: {
      background: "#ba68c8",
      color: "white",
      fontWeight: 200,
      width: "340px",
      "&:hover": { background: "#ab47bc" },
      marginTop: "32px",
    },
  });

export interface State {
  email: string;
  name: string;
}
export interface Props extends WithStyles<typeof styles> {
  history: History;
}

class FindId extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      name: "",
    };
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "email") {
      this.setState({
        email: value,
      });
    } else {
      this.setState({
        name: value,
      });
    }
  };

  findPassword = async () => {
    let summonerUrl = "/find/findPw";
    await axios
      .post(
        "https://i3d204.p.ssafy.io/api" + summonerUrl,
        {
          email: this.state.email,
          name: this.state.name,
        },
        undefined
      )
      .then(() => {
        swal({
          text: "이메일로 임시 비밀번호를 전송했습니다.",
          icon: "success",
        });
        this.props.history.push("/");
      })
      .catch((error) => {
        if (error.response) {
          swal({
            text: error.response.data.message,
            icon: "error",
          });
        } else if (error.request) {
          console.log(error.request);
        } else if (error.message) {
          console.log("message");
        }
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="find-password">
        <Grid
          container
          className={classes.formGrid}
          direction="column"
          spacing={7}
        >
          <Grid container item spacing={3}>
            <Grid item className={classes.tfield}>
              <TextField
                onChange={this.onChange}
                name="email"
                className={classes.tfield}
                label="E-MAIL"
              ></TextField>
            </Grid>
            <Grid item className={classes.tfield}>
              <TextField
                onChange={this.onChange}
                name="name"
                className={classes.tfield}
                label="이름"
              ></TextField>
            </Grid>
            <Grid item>
              <Button
                onClick={this.findPassword}
                className={classes.button}
                variant="contained"
              >
                비밀번호 찾기
              </Button>
            </Grid>
          </Grid>
          <Grid item container justify="center" spacing={1}>
            <Grid item>
              <Link className={classes.alink} to="/">
                로그인
              </Link>
            </Grid>
            <Grid item>|</Grid>
            <Grid item>
              <Link className={classes.alink} to="/signup">
                회원가입
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(FindId);
