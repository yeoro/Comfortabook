import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Grid, TextField, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import KakaoLogin from "react-kakao-login";

import "./Signup.css";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #ce93d8 30%, #f8bbd0 90%)",
    height: "1024px",
    width: "600px",
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
    padding: "0 10%",
  },
  Button: {
    background: "#ba68c8",
    color: "white",
    fontWeight: 200,
    width: "100%",
  },
  emailcheck: {
    background: "#ba68c8",
    color: "white",
    fontWeight: 200,
  },
  tfield: {
    width: "100%",
  },
});

function Loginpage() {
  const [signup, setSignup] = useState({
    password: "",
    password_confirm: "",
    email: "",
    name: "",
    phone_num: "",
  });
  const [pwError, setPwError] = useState(true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignup({
      ...signup,
      [name]: value,
    });
  };

  const updateSignup = () => {
    if (signup.password === signup.password_confirm) {
      setPwError(true);
    } else {
      setPwError(false);
    }
  };

  useEffect(updateSignup, [signup]);

  const classes = useStyles();

  // Kakao Login
  const KAKAO_API_KEY = "b4ce80d71e93a45b7b93c728c8193fa1";

  const success = async (res: any) => {
    console.log(JSON.stringify({ accessToken: res.response.access_token }));
    const URL = "http://i3d204.p.ssafy.io:9999/user/signup/kakao";
    const kakaoLoginResponse = await axios.post(
      URL,
      JSON.stringify({ accessToken: res.response.access_token })
    );
    console.log(kakaoLoginResponse);
  };

  const failure = (err: any) => {
    alert(err);
    console.log(JSON.stringify(err));
  };

  return (
    <Grid
      className={classes.root}
      container
      justify="center"
      alignItems="center"
    >
      <Box className={classes.login} borderRadius={10}>
        <form className={classes.form}>
          <Grid
            container
            className={classes.formGrid}
            justify="space-evenly"
            direction="column"
          >
            <Grid container justify="flex-start" spacing={1}>
              <Grid item className={classes.tfield}>
                <TextField
                  name="email"
                  onChange={onChange}
                  className={classes.tfield}
                  label="E-MAIL"
                ></TextField>
              </Grid>
              <Grid item>
                <Button size="small" className={classes.emailcheck}>
                  중복확인
                </Button>
              </Grid>
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
              ></TextField>
            )}
            <TextField onChange={onChange} name="name" label="이름"></TextField>
            <TextField
              onChange={onChange}
              name="phone_num"
              label="전화번호"
            ></TextField>
            <div>
              <Button className={classes.Button} variant="contained">
                회원가입
              </Button>
              <KakaoLogin
                jsKey={KAKAO_API_KEY}
                onSuccess={success}
                onFailure={failure}
                getProfile={true}
                useDefaultStyle
              />
            </div>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
}

export default Loginpage;
