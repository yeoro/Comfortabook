import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Home from "../components/Home";
import "./Mainpage.css";

export interface Props {}

export interface State {
  mode: String;
}

class Search extends React.Component<Props, State> {
  state = {
    mode: "home",
  };
  getPage() {
    if (this.state.mode === "home") {
      return <Home />;
    } else if (this.state.mode === "search") {
      return <SearchBar />;
    }
  }
  render() {
    return (
      <div className="search">
        <Header />
        {this.getPage()}
        <Footer />
      </div>
    );
  }
}

export default Search;
