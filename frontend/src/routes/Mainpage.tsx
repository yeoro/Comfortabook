import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import Home from "../components/Home";
import Mypage from "../components/Mypage";
import Library from "../components/Library";
import "./Mainpage.css";

interface Props {
  modevalue: StatusTypes;
}
interface State {
  mode: StatusTypes;
}

type StatusTypes = "Home" | "Search" | "Library" | "Mypage";

class Mainpage extends React.Component<Props, State> {
  state = {
    mode: this.props.modevalue,
  };

  componentDidMount() {
    this.setState({
      mode: "Home",
    });
  }

  getPage = () => {
    if (this.state.mode === "Home") {
      return <Home />;
    } else if (this.state.mode === "Search") {
      return <Search />;
    } else if (this.state.mode === "Library") {
      return <Library />;
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
      <div className="mainpage">
        <Header />
        {this.getPage()}
        <Footer changePage={this.changePage} />
      </div>
    );
  }
}

export default Mainpage;
