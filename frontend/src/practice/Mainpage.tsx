import React from "react";
import { History } from "history";
// import axios from "axios";
import swal from "sweetalert";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import Home from "../components/Home";
import Mypage from "../components/Mypage";
import Library from "../components/Library";
import Auth from "../components/Authservice";

import "./Mainpage.css";

interface Props {
  modevalue: StatusTypes;
  history: History;
  gotoread: (bookNo: string, page: number) => void;
  main_mode: StatusTypes;
  user_detail: any;
  books: Array<any>;
  recentBook: number;
}
interface State {
  mode: StatusTypes;
  user_detail: any;
  books: any;
  bestSeller: any;
}

type StatusTypes = "Home" | "Search" | "Library" | "Mypage";

class Mainpage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      mode: this.props.modevalue,
      user_detail: null,
      books: [],
      bestSeller: [],
    };
  }

  goMainpage = () => {
    this.props.history.push("/mainpage/");
  };

  logout = () => {
    Auth.logout();
    this.props.history.push("/");
  };

  islogin = () => {
    if (!Auth.isUserLoggedIn()) {
      swal({
        text: "해당 페이지는 로그인이 필요합니다.",
        icon: "warning",
      });
      this.props.history.push("/");
    }
  };

  componentDidMount() {
    this.islogin();
    this.setState({
      mode: this.props.main_mode,
    });
  }
  getPage = () => {
    if (this.state.mode === "Home") {
      return <Home />;
    } else if (this.state.mode === "Search") {
      return <Search userNo={this.props.user_detail.no} />;
    } else if (this.state.mode === "Library") {
      return (
        <Library
          recentBook={this.props.recentBook}
          mybooks={this.props.books}
          no={this.props.user_detail.no}
          gotoread={this.props.gotoread}
        />
      );
    } else if (this.state.mode === "Mypage") {
      return (
        <Mypage
          history={this.props.history}
          goMainpage={this.goMainpage}
          logout={this.logout}
          detail={this.props.user_detail}
        />
      );
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
