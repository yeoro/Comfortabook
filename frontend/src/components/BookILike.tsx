import React, { useState } from "react";

interface Props {
  mybooks: any;
  recentBook: number;
}

interface State {
  book: any;
}

class BookILike extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      book: null,
    };
  }
  readRecentBook = () => {
    this.props.mybooks.map((element: any) => {
      if (element.bookNo === this.props.recentBook) {
        this.setState({
          book: element,
        });
      }
    });
  };
  getRecentBook = () => {
    if (!!this.state.book === true) {
      return <h1>{this.state.book.title}</h1>;
    } else {
      return <h1>저장된 최근 도서가 없습니다.</h1>;
    }
  };
  componentWillMount() {
    this.readRecentBook();
  }
  render() {
    return this.getRecentBook();
  }
}

export default BookILike;
