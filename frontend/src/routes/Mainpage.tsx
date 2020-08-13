import React from "react";
import { History } from "history";
import axios from "axios";
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
    this.props.history.push("/mainpage");
  };

  getBook = async (num: any) => {
    const URL = `http://i3d204.p.ssafy.io:9999/book/detail/${num}`;
    await axios
      .get(URL)
      .then((res: any) => {
        console.log(res.data);
        this.setState({
          books: this.state.books.concat({
            bookNo: res.data.bookNo,
            title: res.data.title,
            cover: res.data.cover,
            description: res.data.description,
            author: res.data.author,
          }),
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  loadDetail = async () => {
    let token = null;
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token");
    } else {
      token = localStorage.getItem("kakao_53b33c1a41d97e9e4bff7c33e167295f");
    }
    console.log(token);
    let config = {
      headers: {
        "X-AUTH-TOKEN": token,
      },
    };
    axios
      .get("http://i3d204.p.ssafy.io:9999/user/detail", config)
      .then(({ data }) => {
        // console.log(data);
        this.setState({
          user_detail: {
            name: data.name,
            email: data.email,
            phone_num: data.phoneNumber,
            role: data.roles[0],
            no: data.userNo,
            mybooks: data.userBooks,
          },
        });
        data.userBooks.map((element: any) => this.getBook(element.bookNo));
      })
      .catch((e) => {
        // API 호출이 실패한 경우
        console.error(e.response); // 에러표시
      });
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
      return (
        <Library mybooks={this.state.books} no={this.state.user_detail.no} />
      );
    } else if (this.state.mode === "Mypage") {
      return (
        <Mypage
          history={this.props.history}
          goMainpage={this.goMainpage}
          logout={this.logout}
          detail={this.state.user_detail}
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
