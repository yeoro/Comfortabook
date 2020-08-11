import * as React from "react";
import "./AddBook.css";
import axios from "axios";
import { History } from "history";

export interface Props {
  history: History;
}

export interface State {
  author: string;
  categoryName: string;
  cover: string;
  description: string;
  isbn: string;
  publisher: string;
  title: string;
}

class AddBook extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      author: "",
      categoryName: "",
      cover: "",
      description: "",
      isbn: "",
      publisher: "",
      title: "",
    };
  }

  sendData = async () => {
    const URL = "http://i3d204.p.ssafy.io:9999/book/insert";
    await axios
      .post(
        URL,
        {
          author: this.state.author,
          categoryName: this.state.categoryName,
          cover: this.state.cover,
          description: this.state.description,
          isbn: this.state.isbn,
          publisher: this.state.publisher,
          title: this.state.title,
        },
        undefined
      )
      .then(() => {
        this.props.history.goBack();
      })
      .catch((error) => {
        alert("저장 실패");
      });
  };

  onChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "title") {
      this.setState({
        title: value,
      });
    } else if (name === "content") {
      this.setState({
        description: value,
      });
    } else if (name === "author") {
      this.setState({
        author: value,
      });
    } else if (name === "categoryName") {
      this.setState({
        categoryName: value,
      });
    } else if (name === "isbn") {
      this.setState({
        isbn: value,
      });
    } else if (name === "cover") {
      this.setState({
        cover: value,
      });
    } else if (name === "publisher") {
      this.setState({
        publisher: value,
      });
    }
  };

  render() {
    return (
      <div>
        <label>제목</label>
        <br></br>
        <input onChange={this.onChange} name="title"></input>
        <br></br>
        <br></br>
        <label>작가</label>
        <br></br>
        <input onChange={this.onChange} name="author"></input>
        <br></br>
        <br></br>
        <label>카테고리</label>
        <br></br>
        <input onChange={this.onChange} name="categoryName"></input>
        <br></br>
        <br></br>
        <label>ISBN</label>
        <br></br>
        <input onChange={this.onChange} name="isbn"></input>
        <br></br>
        <br></br>
        <label>출판사</label>
        <br></br>
        <input onChange={this.onChange} name="publisher"></input>
        <br></br>
        <br></br>
        <textarea
          className="textarea"
          onChange={this.onChange}
          name="content"
        ></textarea>
        <br></br>
        <input onChange={this.onChange} type="file" name="cover"></input>
        <br></br>
        <br></br>
        <button onClick={this.sendData}>등록</button>
      </div>
    );
  }
}

export default AddBook;
