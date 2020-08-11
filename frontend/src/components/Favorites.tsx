import React from "react";
import axios from "axios";

interface Props {
  mybooks: any;
}
interface State {
  books: Array<any>;
}

class Favorites extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      books: [],
    };
  }

  getBook = async (num: any) => {
    const URL = `http://i3d204.p.ssafy.io:9999/book/detail/${num}`;
    await axios
      .get(URL)
      .then((res: any) => {
        console.log(res.data);
        this.state.books.push(res.data);
      })
      .catch((error: any) => {
        console.log(error.response);
      });
  };
  layBook = () => {
    this.props.mybooks.mybooks.map((element: any) => {
      this.getBook(element.bookNo);
    });
  };
  componentDidMount() {
    this.layBook();
  }
  render() {
    return (
      <div>
        <h1>hi</h1>
      </div>
    );
  }
}

export default Favorites;
