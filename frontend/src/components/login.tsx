import * as React from "react";
import { Grid, TextField, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./login.css";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #ce93d8 30%, #f8bbd0 90%)",
    height: "100vh",
    width: "100vw",
  },
  login: {
    backgroundColor: "rgba(238, 238, 238, 0.2)",
    height: "50vh",
    width: "60vw",
  },
  form: {
    height: "100%",
  },
  formGrid: {
    height: "100%",
    marginTop: "10%",
    padding: "0 10%",
  },
  Button: {
    background: "#ba68c8",
    width: "100%",
    color: "white",
    borderRadius: "30 !important",
  },
  atag: {
    fontSize: "3",
    textDecoration: "none",
    color: "black",
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
                <TextField className={classes.tfield} label="id"></TextField>
              </Grid>
              <Grid item className={classes.tfield}>
                <TextField
                  className={classes.tfield}
                  label="password"
                  type="password"
                ></TextField>
              </Grid>
            </Grid>
            <Grid item>
              <Button className={classes.Button} variant="contained">
                LOGIN
              </Button>
            </Grid>
            <Grid item container justify="center">
              <Grid item>
                <a className={classes.atag} href="/">
                  회원가입
                </a>{" "}
                |
              </Grid>
              <Grid item>
                |{" "}
                <a className={classes.atag} href="/">
                  아이디 / 비밀번호 찾기
                </a>{" "}
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
}

export default Login;
