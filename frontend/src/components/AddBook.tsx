import * as React from "react";
import "./AddBook.css";
import axios from "axios";
import { History } from "history";

import { TextField, Button } from "@material-ui/core";

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
  checkCover: Boolean;
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
      checkCover: false,
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
        checkCover: true,
      });
      this.setCoverCheck();
      console.log(this.setCoverCheck);
    } else if (name === "publisher") {
      this.setState({
        publisher: value,
      });
    }
  };

  setCoverCheck = () => {
    if (this.state.checkCover === false) {
      return <span className="cover-check">등록 된 이미지가 없습니다.</span>;
    } else {
      return <span className="cover-check">이미지를 등록 했습니다.</span>;
    }
  };

  render() {
    return (
      <div className="add-book">
        <form noValidate autoComplete="off">
          <TextField
            name="title"
            fullWidth
            label="제목"
            onChange={this.onChange}
          />
          <TextField
            className="tfield"
            name="author"
            label="작가"
            onChange={this.onChange}
          />
          <TextField
            className="tfield t-margin"
            name="categoryName"
            label="카테고리"
            onChange={this.onChange}
          />
          <TextField
            className="tfield"
            name="isbn"
            label="ISBN"
            onChange={this.onChange}
          />
          <TextField
            className="tfield t-margin"
            name="publisher"
            label="출판사"
            onChange={this.onChange}
          />
          <TextField
            name="content"
            fullWidth
            multiline
            rows={20}
            label="내용"
            onChange={this.onChange}
          />
        </form>
        <br></br>
        <div className="button-container">
          <div>
            <input
              accept="image/*"
              className="image-input"
              id="contained-button-file"
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                onChange={this.onChange}
                component="span"
              >
                파일 선택
              </Button>
            </label>
            {this.setCoverCheck()}
          </div>
          <br></br>
          <br></br>
          <Button variant="contained" onClick={this.sendData}>
            등록
          </Button>
        </div>
      </div>
    );
  }
}

export default AddBook;
