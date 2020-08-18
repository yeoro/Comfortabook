import React, { createRef } from "react";
import { History } from "history";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import KakaoLogin from "react-kakao-login";

import { Grid, TextField, Box, Button } from "@material-ui/core";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";

import Auth from "../components/login/Authservice";
import Loginheader from "../components/login/Loginheader";
import "./Login.css";

//touch keyboard
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

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
      marginTop: "20%",
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
  inputs: {
    default: string;
    email: string;
    password: string;
  };
  KAKAO_API_KEY: string;
  inputName: string;
  keyboard: any;
  layoutName: string;
  keyboardOpen: boolean;
}

export interface Props extends WithStyles<typeof styles> {
  history: History;
}

class Login extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      inputs: {
        default: "",
        email: "",
        password: "",
      },
      keyboardOpen: false,
      KAKAO_API_KEY: "b4ce80d71e93a45b7b93c728c8193fa1",
      inputName: "",
      keyboard: createRef(),
      layoutName: "default",
    };
  }

  onChangeInput = (event: any) => {
    const inputVal = event.target.value;

    this.setState({
      inputs: {
        ...this.state.inputs,
        [this.state.inputName]: inputVal,
      },
    });

    this.state.keyboard.current.setInput(inputVal);
  };

  onChangeAll = (e: any) => {
    this.setState({ inputs: { ...e } });
    console.log("Inputs changed", this.state.inputs);
  };

  dologin = () => {
    Auth.executeJwtAuthenticationService(
      this.state.inputs.email,
      this.state.inputs.password
    )
      .then((response: any) => {
        Auth.registerSuccessfulLoginForJwt(
          this.state.inputs.email,
          response.data
        );
        console.log("success");
        this.props.history.push("/playground");
      })
      .catch((e) => {
        // this.setState({showSuccessMessage:false})
        // this.setState({hasLoginFailed:true})
        swal({
          text: e.response.data.message,
          icon: "warning",
        });
      });
  };

  handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      this.dologin();
    }
  };

  kakaosignin = async (token: string) => {
    const URL = "https://i3d204.p.ssafy.io/api/user/signin/kakao";
    await axios
      .post(URL, token, undefined)
      .then((res) => {
        localStorage.setItem("token", res.data);
        this.props.history.push("/playground/");
      })
      .catch((error) => {
        console.log("로그인 실패");
        console.log(error.response);
      });
  };

  success = async (res: any) => {
    const URL = "https://i3d204.p.ssafy.io/api/user/signup/kakao";
    await axios
      .post(
        URL,
        {
          name: res.profile.properties.nickname,
          accessToken: res.response.access_token,
        },
        undefined
      )
      .then((res) => {
        console.log(res);
        this.kakaosignin(res.config.data.accessToken);
      })
      .catch((error) => {
        if (error.response.data.message === "이미 연동 된 소셜 계정") {
          this.kakaosignin(JSON.parse(error.response.config.data).accessToken);
        } else {
          console.log(error.response);
        }
      });
  };

  failure = (err: any) => {
    console.log("fail");
    console.log(JSON.stringify(err));
  };

  handleShift = () => {
    const newLayoutName =
      this.state.layoutName === "default" ? "shift" : "default";
    this.setState({
      layoutName: newLayoutName,
    });
  };

  onKeyPress = (button: any) => {
    if (button === "{shift}" || button === "{lock}") this.handleShift();
    if (button === "{close}") this.setState({ keyboardOpen: false });
  };

  getInputValue = (inputName: string) => {
    if (inputName === "email") {
      return this.state.inputs.email || "";
    } else {
      return this.state.inputs.password || "";
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="Login">
        <Loginheader />
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
                    onChange={this.onChangeInput}
                    value={this.getInputValue("email")}
                    name="email"
                    className={classes.tfield}
                    label="E-MAIL"
                    onFocus={() =>
                      this.setState({ inputName: "email", keyboardOpen: true })
                    }
                  ></TextField>
                </Grid>
                <Grid item className={classes.tfield}>
                  <TextField
                    value={this.getInputValue("password")}
                    onChange={this.onChangeInput}
                    onKeyPress={this.handleKeyPress}
                    name="password"
                    className={classes.tfield}
                    label="PASSWORD"
                    type="password"
                    onFocus={() =>
                      this.setState({
                        inputName: "password",
                        keyboardOpen: true,
                      })
                    }
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
                  <span className="kakao-login_font">
                    카카오 아이디로 로그인
                  </span>
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
                  <Link className={classes.alink} to="/find">
                    아이디 / 비밀번호 찾기
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <div className={`${!this.state.keyboardOpen ? "hidden" : ""}`}>
          <Keyboard
            keyboardRef={(r) => (this.state.keyboard.current = r)}
            inputName={this.state.inputName}
            layoutName={this.state.layoutName}
            onChangeAll={this.onChangeAll}
            onKeyPress={this.onKeyPress}
            layout={{
              default: [
                "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
                "{tab} q w e r t y u i o p [ ] \\",
                "{lock} a s d f g h j k l ; ' {enter}",
                "{shift} z x c v b n m , . / {shift}",
                ".com @ {space} {close}",
              ],
              shift: [
                "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
                "{tab} Q W E R T Y U I O P { } |",
                '{lock} A S D F G H J K L : " {enter}',
                "{shift} Z X C V B N M < > ? {shift}",
                ".com @ {space} {close}",
              ],
            }}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
