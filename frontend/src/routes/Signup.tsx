import * as React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import swal from "sweetalert";
import KakaoLogin from "react-kakao-login";
import { Link } from "react-router-dom";

import { Grid, TextField, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import Loginheader from "../components/login/Loginheader";
import "./Signup.css";
import * as Hangul from "hangul-js";

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

  const onChangeInput = (event: any) => {
    const inputVal = event.target.value;
    setSignup({
      ...signup,
      [inputName]: inputVal,
    });

    keyboard.current.setInput(inputVal);
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

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      doSignup();
    }
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
    history.push("/playground");
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

  //touch 키보드 관련
  const keyboard: any = useRef(null);
  const [inputName, setInputName] = useState("");

  const [layoutName, setLayoutName] = useState("default");
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const onChangeAll = (inputs: any) => {
    if (!!inputs.name === false) {
      inputs.name = "";
    } else {
      inputs.name = Hangul.assemble(inputs.name);
    }

    setSignup({ ...inputs });
  };
  const handleShift = () => {
    if (layoutName === "default" || layoutName === "shift") {
      let newLayoutName = layoutName === "default" ? "shift" : "default";
      setLayoutName(newLayoutName);
    } else {
      let newLayoutName = layoutName === "kdefault" ? "kshift" : "kdefault";
      setLayoutName(newLayoutName);
    }
  };

  const onKeyPress = (button: any) => {
    if (button === "{shift}") handleShift();
    if (button === "{close}") {
      setKeyboardOpen(false);
    }
    if (button === "{language}") {
      const newLayoutName =
        layoutName === "kdefault" || layoutName === "kshift"
          ? "default"
          : "kdefault";
      setLayoutName(newLayoutName);
    }
  };

  const getInputValue = (inputName: string) => {
    if (inputName === "email") {
      return signup.email || "";
    } else if (inputName === "password") {
      return signup.password || "";
    } else if (inputName === "password_confirm") {
      return signup.password_confirm || "";
    } else if (inputName === "name") {
      return signup.name || "";
    } else if (inputName === "phone_num") {
      return signup.phone_num || "";
    }
  };

  return (
    <div className="Signup">
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
                    value={getInputValue("email")}
                    onFocus={() => {
                      setInputName("email");
                      setKeyboardOpen(true);
                    }}
                    name="email"
                    onChange={onChangeInput}
                    className="emailcheck"
                    label="E-MAIL"
                    helperText="이메일은 비밀번호 찾는데 사용됩니다. 본인의 정확한 메일 주소를 작성해주세요"
                  ></TextField>
                ) : (
                  <TextField
                    value={getInputValue("email")}
                    onFocus={() => {
                      setInputName("email");
                      setKeyboardOpen(true);
                    }}
                    name="email"
                    onChange={onChangeInput}
                    className="emailcheck"
                    label="E-MAIL"
                    helperText="중복확인은 필수입니다."
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
                value={getInputValue("password")}
                onFocus={() => {
                  setInputName("password");
                  setKeyboardOpen(true);
                }}
                onChange={onChangeInput}
                name="password"
                label="PASSWORD"
                type="password"
              ></TextField>
              {pwError ? (
                <TextField
                  value={getInputValue("password")}
                  onFocus={() => {
                    setInputName("password");
                    setKeyboardOpen(true);
                  }}
                  onChange={onChangeInput}
                  name="password_confirm"
                  label="PASSWORD_CONFIRM"
                  type="password"
                ></TextField>
              ) : (
                <TextField
                  value={getInputValue("password_confirm")}
                  onFocus={() => {
                    setInputName("password_confirm");
                    setKeyboardOpen(true);
                  }}
                  onChange={onChangeInput}
                  name="password_confirm"
                  label="PASSWORD_CONFIRM"
                  type="password"
                  helperText="비밀번호가 다릅니다."
                  className="pw-confirm-word"
                ></TextField>
              )}
              <TextField
                value={getInputValue("name")}
                onFocus={() => {
                  setInputName("name");
                  setKeyboardOpen(true);
                }}
                onChange={onChangeInput}
                name="name"
                label="이름"
              ></TextField>
              <TextField
                value={getInputValue("phone_num")}
                onFocus={() => {
                  setInputName("phone_num");
                  setKeyboardOpen(true);
                }}
                onChange={onChangeInput}
                onKeyPress={handleKeyPress}
                name="phone_num"
                label="전화번호"
                helperText="숫자만 입력해주세요."
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
      <div className={`${!keyboardOpen ? "hidden" : ""}`}>
        <Keyboard
          keyboardRef={(r: any) => (keyboard.current = r)}
          inputName={inputName}
          layoutName={layoutName}
          onChangeAll={onChangeAll}
          onKeyPress={onKeyPress}
          layout={{
            default: [
              "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "{tab} q w e r t y u i o p [ ] \\",
              "{language} a s d f g h j k l ; ' {enter}",
              "{shift} z x c v b n m , . / {shift}",
              ".com @ {space} {close}",
            ],
            shift: [
              "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
              "{tab} Q W E R T Y U I O P { } |",
              '{language} A S D F G H J K L : " {enter}',
              "{shift} Z X C V B N M < > ? {shift}",
              ".com @ {space} {close}",
            ],
            kdefault: [
              "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "{tab} ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕㅑㅑ ㅐ ㅔ [ ] \\",
              '{language} ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ : " {enter}',
              "{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ , . / {shift}",
              ".com @ {space} {close}",
            ],
            kshift: [
              "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
              "{tab} ㅃ ㅉ ㄸ ㄲ ㅆ ㅛ ㅕㅑㅑ ㅒ ㅖ { } |",
              '{language} ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ : " {enter}',
              "{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ < > ? {shift}",
              ".com @ {space} {close}",
            ],
          }}
        />
      </div>
    </div>
  );
}

export default Signup;
