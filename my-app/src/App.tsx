import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Index from "./Router/Index";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact={true} component={Index} />
      </BrowserRouter>
    );
  }
}

export default App;
