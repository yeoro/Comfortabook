import React from "react";
import { History } from "history";
// import axios from "axios";
import swal from "sweetalert";

import { Button } from "@material-ui/core";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/search/Search";
import Home from "../components/home/Home";
import Mypage from "../components/mypage/Mypage";
import Library from "../components/library/Library";
import Auth from "../components/login/Authservice";

import "./Mainpage.css";
import Guide from "./Guide";

interface Props {
  modevalue: StatusTypes;
  history: History;
  gotoread: (bookNo: string, page: number) => void;
  main_mode: StatusTypes;
  user_detail: any;
  books: Array<any>;
  recentBook: number;
  guideOpen: boolean;
  guideClose: () => void;
  guideOn: (e: any) => void;
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
    this.props.history.push("/playground");
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
        <Button
          variant="outlined"
          className="guide"
          onClick={this.props.guideOn}
        >
          도움말
        </Button>
        <Footer changePage={this.changePage} />
        <Guide
          mode={this.state.mode}
          guideOpen={this.props.guideOpen}
          guideClose={this.props.guideClose}
        />
      </div>
    );
  }
}

export default Mainpage;
