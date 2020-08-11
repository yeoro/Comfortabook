import * as React from "react";
import axios from "axios";

export interface Props {}

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
        this.setState({
          books: res.data.content,
        });
        this.state.books.map((element: any) => {
          return console.log(element.title);
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
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getBook();
  }
  render() {
    return (
      <div>
        <h1>책 목록</h1>
        {this.state.books.map((element: any) => {
          return (
            <div>
              <p>{element.title}</p>
              <button>책보기</button>
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
