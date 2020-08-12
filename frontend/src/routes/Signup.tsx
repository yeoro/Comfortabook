import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import KakaoLogin from "react-kakao-login";
import { Link } from "react-router-dom";

import { Grid, TextField, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Loginheader from "../components/Loginheader";
import "./Signup.css";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #ce93d8 30%, #f8bbd0 90%)",
    height: "1024px",
    width: "768px",
  },
  signup: {
    backgroundColor: "rgba(238, 238, 238, 0.2)",
    height: "60%",
    width: "60%",
  },
  form: {
    height: "100%",
  },
  formGrid: {
    height: "100%",
    padding: "0 10%",
  },
  Button: {
    background: "#ba68c8",
    color: "white",
    fontWeight: 200,
    width: "100%",
    "&:hover": { background: "#ab47bc" },
  },
  divemailcheck: {
    width: "100%",
  },
  emailcheck: {
    background: "#ba68c8",
    color: "white",
    fontWeight: 200,
    height: "34px",
    marginTop: "12px",
    marginLeft: "10px",
    "&:hover": { background: "#ab47bc" },
  },
  alink: {
    textDecoration: "None",
    color: "Black",
    lineHeight: "19px",
    textAlign: "center",
  },
});

function Signup(props: any) {
  const classes = useStyles();

  const [signup, setSignup] = useState({
    password: "",
    password_confirm: "",
    email: "",
    name: "",
    phone_num: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignup({
      ...signup,
      [name]: value,
    });
  };

  // 비밀번호 일치 여부 확인
  const [pwError, setPwError] = useState(true);

  const updateSignup = () => {
    if (signup.password === signup.password_confirm) {
      setPwError(true);
    } else {
      setPwError(false);
    }
  };

  useEffect(updateSignup, [signup]);

  // 회원가입
  const doSignup = async () => {
    let summonerUrl = "/user/signup";
    await axios
      .post(
        "http://i3d204.p.ssafy.io:9999" + summonerUrl,
        {
          email: signup.email,
          name: signup.name,
          password: signup.password,
          phoneNumber: signup.phone_num,
        },
        undefined
      )
      .then(() => {
        swal({
          text: "회원가입을 축하합니다.",
          icon: "success",
        });
        props.history.push("/");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log(error.request);
        } else if (error.message) {
          console.log(error.message);
        }
      });
  };

  // 이메일 중복 확인
  const [emailCheck, setEmailCheck] = useState(false);

  const checkId = async () => {
    if (signup.email.includes("@") && signup.email.includes(".")) {
      let summonerUrl = "/find/checkId";
      await axios
        .post(
          "http://i3d204.p.ssafy.io:9999" + summonerUrl,
          {
            email: signup.email,
          },
          undefined
        )
        .then((res) => {
          if (res.data === "사용 가능한 이메일입니다.") {
            swal({
              text: res.data,
              icon: "success",
            });
            setEmailCheck(true);
          } else {
            swal({
              text: res.data,
              icon: "error",
            });
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else if (error.message) {
            console.log(error.message);
          }
        });
    } else {
      swal({
        text: "잘못된 이메일 형태입니다. 다시 한 번 확인해주세요.",
        icon: "warning",
      });
    }
  };

  // 회원가입 버튼 활성화
  const [signupError, setSignupError] = useState(false);

  const checkSignup = () => {
    if (
      signup.email &&
      signup.password &&
      signup.name &&
      signup.phone_num &&
      pwError &&
      emailCheck
    ) {
      setSignupError(true);
    } else {
      setSignupError(false);
    }
  };

  useEffect(checkSignup, [signup, pwError, emailCheck]);

  // 카카오 로그인
  const KAKAO_API_KEY = "b4ce80d71e93a45b7b93c728c8193fa1";

  const goMainpage = () => {
    const { history } = props;
    history.push("/mainpage");
  };

  const success = async (res: any) => {
    console.log(res);
    const URL = "http://i3d204.p.ssafy.io:9999/user/signup/kakao";
    await axios
      .post(
        URL,
        {
          name: res.profile.properties.nickname,
          accessToken: res.response.access_token,
        },
        undefined
      )
      .then((event) => {
        console.log(event);
        goMainpage();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const failure = (err: any) => {
    console.log("fail");
    console.log(JSON.stringify(err));
  };

  return (
    <React.Fragment>
      <Loginheader />
      <Grid
        className={classes.root}
        container
        justify="center"
        alignItems="center"
      >
        <Box className={classes.signup} borderRadius={10}>
          <form className={classes.form}>
            <Grid
              container
              className={classes.formGrid}
              justify="space-evenly"
              direction="column"
            >
              <Grid container spacing={1}>
                {emailCheck ? (
                  <TextField
                    name="email"
                    onChange={onChange}
                    className="emailcheck"
                    label="E-MAIL"
                  ></TextField>
                ) : (
                  <TextField
                    name="email"
                    onChange={onChange}
                    className="emailcheck"
                    label="E-MAIL"
                    helperText="이메일 중복확인을 해주세요."
                  ></TextField>
                )}
                <Button
                  size="small"
                  className={classes.emailcheck}
                  onClick={checkId}
                >
                  중복확인
                </Button>
              </Grid>
              <TextField
                onChange={onChange}
                name="password"
                label="PASSWORD"
                type="password"
              ></TextField>
              {pwError ? (
                <TextField
                  onChange={onChange}
                  name="password_confirm"
                  label="PASSWORD_CONFIRM"
                  type="password"
                ></TextField>
              ) : (
                <TextField
                  onChange={onChange}
                  name="password_confirm"
                  label="PASSWORD_CONFIRM"
                  type="password"
                  helperText="비밀번호가 다릅니다."
                  className="pw-confirm-word"
                ></TextField>
              )}
              <TextField
                onChange={onChange}
                name="name"
                label="이름"
              ></TextField>
              <TextField
                onChange={onChange}
                name="phone_num"
                label="전화번호"
              ></TextField>
              <div className="hidden-div"></div>
              <div>
                {signupError ? (
                  <Button
                    onClick={doSignup}
                    className={classes.Button}
                    variant="contained"
                  >
                    회원가입
                  </Button>
                ) : (
                  <Button
                    onClick={doSignup}
                    className={classes.Button}
                    variant="contained"
                    disabled
                  >
                    회원가입
                  </Button>
                )}
                <KakaoLogin
                  jsKey={KAKAO_API_KEY}
                  onSuccess={success}
                  onFailure={failure}
                  getProfile={true}
                  className="kakao-signup"
                >
                  <span className="kakao-signup-font">
                    카카오 아이디로 회원가입
                  </span>
                </KakaoLogin>
              </div>
              <Grid item className="alinkDiv">
                <Link className={classes.alink} to="/">
                  이미 회원이신가요? 로그인
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </React.Fragment>
  );
}

export default Signup;
