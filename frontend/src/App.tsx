import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Search from "./routes/Search";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/search" component={Search} />
    </BrowserRouter>
  );
}

export default App;
