import * as React from "react";
import { Grid, TextField, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    background: "#f3e5f5",
    height: "100vh",
    width: "100vw",
  },
  login: {
    background: "#e1bee7",
    height: "50vh",
    width: "60vw",
  },
  form: {
    height: "100%",
  },
  formGrid: {
    height: "70%",
    marginTop: "20%",
    padding: "0 20%",
  },
  Button: {
    background: "#ba68c8",
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
            justify="space-evenly"
            direction="column"
          >
            <TextField label="id"></TextField>
            <TextField label="password" type="password"></TextField>
            <div>
              <Button className={classes.Button} variant="contained">
                LOGIN
              </Button>
            </div>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
}

export default Login;
