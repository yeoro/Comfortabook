import React from "react";

import AddCircleIcon from "@material-ui/icons/AddCircle";

import "./BookList.css";
import axios from "axios";

function BookList({ title, author, image, publisher }: any) {
  // const books = [
  //   {
  //     title: "이동해",
  //     image:
  //       "https://i.pinimg.com/236x/c5/5c/c2/c55cc29c6f14a438865baec2516959e8.jpg",
  //   },
  //   {
  //     title: "김선호",
  //     image:
  //       "https://cdn.joongboo.com/news/photo/201911/363372953_2091416_1914.jpg",
  //   },
  //   {
  //     title: "수지",
  //     image:
  //       "https://www.gotit.co.kr/wp-content/uploads/2019/03/origin_%EC%88%98%EC%A7%80%EB%AA%85%EB%B6%88%ED%97%88%EC%A0%84%EC%B2%AD%EC%88%9C%EC%97%AC%EC%8B%A0.jpg",
  //   },
  // ];
  const addbook = async () => {
    const url = "http://i3d204.p.ssafy.io:9999/book/insertMyBook";
    await axios
      .post(url, {
        bookNo: "12",
        userNo: "12",
      })
      .then((res) => {
        console.log("성공");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className="books">
      <div className="book">
        <button onClick={addbook}>추가</button>
        <AddCircleIcon className="book__icon" />
        <img src={image} alt={title} title={title} className="book__img" />
        <h3 className="book__title">{title}</h3>
        <p>{author}</p>
        <p>{publisher}</p>
      </div>
    </div>
  );
}

export default BookList;
