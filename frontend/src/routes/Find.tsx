import * as React from "react";
import axios from "axios";
import { Grid, TextField, Box, Button } from "@material-ui/core";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Auth from "../components/Authservice";
import { History } from "history";
import KakaoLogin from "react-kakao-login";
import "./Login.css";

const styles = () =>
  createStyles({
    root: {
      background: "linear-gradient(45deg, #ce93d8 30%, #f8bbd0 90%)",
      height: "1024px",
      width: "768px",
    },
    login: {
      backgroundColor: "rgba(238, 238, 238, 0.2)",
      height: "60%",
      width: "60%",
    },
    form: {
      height: "100%",
    },
    formGrid: {
      height: "100%",
      marginTop: "10%",
      padding: "0 10%",
    },
    alink: {
      textDecoration: "None",
      color: "Black",
      lineHeight: "19px",
    },
    tfield: {
      width: "100%",
    },
    button: {
      background: "#ba68c8",
      color: "white",
      fontWeight: 200,
      width: "100%",
      "&:hover": { background: "#ab47bc" },
    },
  });

export interface State {
  email: string;
  password: string;
  KAKAO_API_KEY: string;
}
export interface Props extends WithStyles<typeof styles> {
  history: History;
}

class Login extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      KAKAO_API_KEY: "b4ce80d71e93a45b7b93c728c8193fa1",
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
        password: value,
      });
    }
  };

  dologin = () => {
    Auth.executeJwtAuthenticationService(this.state.email, this.state.password)
      .then((response: any) => {
        Auth.registerSuccessfulLoginForJwt(this.state.email, response.data);
        console.log("success");
        this.props.history.push("/mainpage");
      })
      .catch(() => {
        // this.setState({showSuccessMessage:false})
        // this.setState({hasLoginFailed:true})
        console.log("fail");
      });
  };

  success = async (res: any) => {
    console.log(res);
    const URL = "http://i3d204.p.ssafy.io:9999/user/signin/kakao";
    await axios
      .post(
        URL,
        {
          accessToken: res.response.access_token,
          // name: res.profile.kakao_account.profile.nickname,
        },
        undefined
      )
      .then((event) => {
        console.log(event);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  failure = (err: any) => {
    alert(err);
    console.log(JSON.stringify(err));
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        className={classes.root}
        container
        justify="center"
        alignItems="center"
      >
        <Box className={classes.login} borderRadius={10}>
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
                  label="ID"
                ></TextField>
              </Grid>
              <Grid item className={classes.tfield}>
                <TextField
                  onChange={this.onChange}
                  name="password"
                  className={classes.tfield}
                  label="PASSWORD"
                  type="password"
                ></TextField>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                onClick={this.dologin}
                className={classes.button}
                variant="contained"
              >
                로그인
              </Button>
              <KakaoLogin
                jsKey={this.state.KAKAO_API_KEY}
                onSuccess={this.success}
                onFailure={this.failure}
                getProfile={true}
                className="kakao-login"
              >
                <span className="kakao-login_font">카카오 아이디로 로그인</span>
              </KakaoLogin>
            </Grid>
            <Grid item container justify="center" spacing={1}>
              <Grid item>
                <Link className={classes.alink} to="/signup">
                  회원가입
                </Link>
              </Grid>
              <Grid item>|</Grid>
              <Grid item>
                <Link className={classes.alink} to="/">
                  아이디 / 비밀번호 찾기
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);
