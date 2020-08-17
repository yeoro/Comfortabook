import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Find from "./routes/Find";
// import Mainpage from "./routes/Mainpage";
// import ReadPage from "./routes/ReadPage";
import NotFound from "./routes/NotFound";
import Admin from "./routes/Admin";
import Playground from "./routes/Playground";

const useStyles = makeStyles({
  root: {
    height: "1024px",
    width: "768px",
    margin: "0 auto 0 auto",
  },
});

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Grid
        className={classes.root}
        container
        justify="center"
        alignItems="center"
      >
        <Route path="/playground" component={Playground} />
        <Route path="/" exact={true} component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/find" component={Find} />
        {/* <Route path="/mainpage" component={Mainpage} /> */}
        {/* <Route path="/read/:bookNo" component={ReadPage} /> */}
        <Route path="/notfound" component={NotFound} />
        <Route path="/admin" component={Admin} />
      </Grid>
    </BrowserRouter>
  );
}

export default App;
