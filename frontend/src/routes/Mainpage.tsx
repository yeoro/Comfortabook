import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Home from "../components/Home";
import Mypage from "../components/Mypage";
import Booklist from "../components/BookList";
import "./Mainpage.css";

interface Props {
  modevalue: StatusTypes;
}
interface State {
  mode: StatusTypes;
}

type StatusTypes = "Home" | "Search" | "Library" | "Mypage";

class Search extends React.Component<Props, State> {
  state = {
    mode: this.props.modevalue,
  };
  getPage = () => {
    if (this.state.mode === "Home") {
      return <Home />;
    } else if (this.state.mode === "Search") {
      return <SearchBar />;
    } else if (this.state.mode === "Library") {
      return <Booklist />;
    } else if (this.state.mode === "Mypage") {
      return <Mypage />;
    }
  };
  changePage = (value: StatusTypes) => {
    this.setState({
      mode: value,
    });
  };
  render() {
    return (
      <div className="search">
        <Header />
        {this.getPage()}
        <Footer changePage={this.changePage} />
      </div>
    );
  }
}

export default Search;
