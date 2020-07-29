import * as React from "react";
// import { useState } from "react";
import { Grid, TextField, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Login.css";
import { Link } from "react-router-dom";
import Button from "../components/CustomBtn";

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
    marginTop: "10%",
    padding: "0 10%",
  },
  alink: {
    textDecoration: "None",
    color: "Black",
  },
  tfield: {
    width: "100%",
  },
});

function Login() {
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
            direction="column"
            spacing={7}
          >
            <Grid container item spacing={3}>
              <Grid item className={classes.tfield}>
                <TextField className={classes.tfield} label="ID"></TextField>
              </Grid>
              <Grid item className={classes.tfield}>
                <TextField
                  className={classes.tfield}
                  label="PASSWORD"
                  type="password"
                ></TextField>
              </Grid>
            </Grid>
            <Grid justify="center" item>
              <div className="loginBtn">
                <Button to="/" width={true}>
                  LOGIN
                </Button>
              </div>
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
                  {" "}
                  아이디 / 비밀번호 찾기
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
}

export default Login;
