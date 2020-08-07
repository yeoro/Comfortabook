import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Mainpage from "./routes/Mainpage";
import ReadPage from "./routes/ReadPage";
import NotFound from "./routes/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/mainpage" component={Mainpage} />
      <Route path="/read" component={ReadPage} />
      <Route path="/notfound" component={NotFound} />
    </BrowserRouter>
  );
}

export default App;
