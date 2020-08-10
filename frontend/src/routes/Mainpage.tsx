import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import Home from "../components/Home";
import Mypage from "../components/Mypage";
import Library from "../components/Library";
import "./Mainpage.css";
import axios from "axios";
import Auth from "../components/Authservice";
import { History } from "history";

interface Props {
  modevalue: StatusTypes;
  history: History;
}
interface State {
  mode: StatusTypes;
  user_detail: any;
}

type StatusTypes = "Home" | "Search" | "Library" | "Mypage";

class Mainpage extends React.Component<Props, State> {
  state = {
    mode: this.props.modevalue,
    user_detail: null,
  };

  loadDetail = async () => {
    const token = localStorage.getItem("token");
    let config = {
      headers: {
        "X-AUTH-TOKEN": token,
      },
    };
    axios
      .get("http://i3d204.p.ssafy.io:9999/user/detail", config)
      .then(({ data }) => {
        this.setState({
          user_detail: {
            name: data.name,
            email: data.email,
            phone_num: data.phoneNumber,
          },
        });
      })
      .catch((e) => {
        // API 호출이 실패한 경우
        console.error(e); // 에러표시
      });
  };

  logout = () => {
    Auth.logout();
    this.props.history.push("/");
  };

  islogin = () => {
    if (!Auth.isUserLoggedIn()) {
      this.props.history.push("/");
    }
  };

  componentDidMount() {
    this.setState({
      mode: "Home",
    });
    this.loadDetail();
    this.islogin();
  }

  getPage = () => {
    if (this.state.mode === "Home") {
      return <Home />;
    } else if (this.state.mode === "Search") {
      return <Search />;
    } else if (this.state.mode === "Library") {
      return <Library />;
    } else if (this.state.mode === "Mypage") {
      return <Mypage logout={this.logout} detail={this.state.user_detail} />;
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
