import * as React from "react";
import Mainpage from "../playground/Mainpage";
import Read from "../playground/ReadPage";
import { History } from "history";
import axios from "axios";

interface Props {
  history: History;
}

interface State {
  mode: string;
  user_detail: any;
  books: Array<any>;
  temp: Array<any>;
  bookNo: string;
  main_mode: StatusTypes;
  page: number;
  recentBook: number;
}

type StatusTypes = "Home" | "Search" | "Library" | "Mypage";

class Playground extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      mode: "Main",
      user_detail: null,
      books: [],
      temp: [1, 2],
      bookNo: "12",
      main_mode: "Home",
      page: 0,
      recentBook: 0,
    };
  }

  getBook = async (bookNo: any, pageNo: any) => {
    if (pageNo === null) {
      pageNo = 0;
    }
    const URL = `http://i3d204.p.ssafy.io:9999/book/detail/${bookNo}`;
    await axios
      .get(URL)
      .then((res: any) => {
        console.log(res);
        this.setState({
          books: this.state.books.concat({
            bookNo: res.data.bookNo,
            title: res.data.title,
            cover: res.data.cover,
            description: res.data.description,
            author: res.data.author,
            page: pageNo,
            contents: res.data.bookContents,
          }),
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  gotoread = (bookNo: string, page: number) => {
    this.setState({
      mode: "Read",
      bookNo: bookNo,
      page: page,
    });
  };

  loadDetail = async () => {
    let token = null;
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token");
    } else {
      token = localStorage.getItem("kakao_53b33c1a41d97e9e4bff7c33e167295f");
    }
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
        data.userBooks.map((element: any) => {
          if (element.recentBook !== 0) {
            this.setState({
              recentBook: element.bookNo,
            });
          }
          this.getBook(element.bookNo, element.pageNo);
        });
      })
      .catch((e) => {
        // API 호출이 실패한 경우
        console.error(e.response); // 에러표시
      });
  };

  gobacklist = () => {
    this.setState({
      mode: "Main",
      main_mode: "Library",
    });
  };

  staySearch = () => {
    // this.setState({
    //   books: [],
    // });
    // this.loadDetail();
    this.setState({
      mode: "Main",
      main_mode: "Search",
    });
  };

  readBook = async (obj: any) => {
    await axios
      .put("http://i3d204.p.ssafy.io:9999/book/bookmark", obj, undefined)
      .then((res) => {
        console.log(res);
        this.setState({
          books: [],
        });
        this.loadDetail();
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  componentDidMount() {
    this.loadDetail();
    this.setState({
      mode: "Main",
    });
  }

  render() {
    if (this.state.mode === "Main") {
      return (
        <Mainpage
          recentBook={this.state.recentBook}
          books={this.state.books}
          user_detail={this.state.user_detail}
          main_mode={this.state.main_mode}
          history={this.props.history}
          modevalue={"Home"}
          gotoread={this.gotoread}
        />
      );
    } else {
      return (
        <Read
          userno={this.state.user_detail.no}
          page={this.state.page}
          gobacklist={this.gobacklist}
          sizevalue={"20"}
          history={this.props.history}
          bookNo={this.state.bookNo}
          readbook={this.readBook}
        />
      );
    }
  }
}

export default Playground;
