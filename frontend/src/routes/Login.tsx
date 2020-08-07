import * as React from "react";
import { Grid, TextField, Box } from "@material-ui/core";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import "./Login.css";
import { Link } from "react-router-dom";
import Auth from "../components/Authservice";
import { History } from "history";

const styles = () =>
  createStyles({
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

export interface State {
  email: string;
  password: string;
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
            <Grid container justify="center" item>
              <Grid item>
                <button onClick={this.dologin}>LOGIN</button>
              </Grid>
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
        </Box>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);
