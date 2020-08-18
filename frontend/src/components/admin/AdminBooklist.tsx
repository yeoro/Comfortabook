import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { History } from "history";

export interface Props {
  history: History;
}

// interface book {
//   title: string;
// }

interface State {
  books: any;
}

class AdminBooklist extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      books: [{ title: "0" }],
    };
  }
  getBook = async () => {
    const URL = "http://i3d204.p.ssafy.io:9999/book/list";
    await axios
      .get(URL)
      .then((res: any) => {
        console.log(res);
        this.setState({
          books: res.data.content,
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  onDelete = async (event: any) => {
    const URL = `http://i3d204.p.ssafy.io:9999/book/delete/${event.target.dataset.id}`;
    await axios
      .delete(URL)
      .then((res: any) => {
        alert("삭제 완료");
        this.props.history.push("/admin");
      })
      .catch((error: any) => {
        console.log(error.response);
      });
  };

  componentDidMount() {
    this.getBook();
  }
  render() {
    return (
      <div className="admin-booklist">
        <h1>책 목록</h1>
        {this.state.books.map((element: any) => {
          const url = `/read/${element.bookNo}`;
          return (
            <div>
              <p>{element.title}</p>
              <button onClick={this.onDelete} data-id={element.bookNo}>
                삭제
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default AdminBooklist;
