import * as React from "react";
import { Grid, TextField, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Signup.css";
import { useState } from "react";

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

  const [pwerror, setPwerror] = useState("valid");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignup({
      ...signup,
      [name]: value,
    });
    if (signup.password === signup.password_confirm) {
      setPwerror("in-valid");
    } else {
      setPwerror("valid");
    }
  };

  const classes = useStyles();

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
            <TextField
              onChange={onChange}
              name="password_confirm"
              label="PASSWORD_CONFIRM"
              type="password"
            ></TextField>
            <p className={pwerror}>비밀번호가 다릅니다.</p>
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
            </div>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
}

export default Loginpage;
