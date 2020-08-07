import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Index from "./Router/Index";
import Home from "./Router/Home";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact={true} component={Index} />
        <Route path="/home" exact={true} component={Home} />
      </BrowserRouter>
    );
  }
}

export default App;
