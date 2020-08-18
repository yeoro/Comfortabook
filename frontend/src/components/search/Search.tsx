import React, { useState, useEffect, useRef } from "react";
import axios, { AxiosResponse } from "axios";

import SearchBar from "./SearchBar";
import BookList from "../home/BookList";
import "./Search.css";

interface Props {
  userNo: number;
}

function Search(props: Props) {
  const [selectData, setSelectData] = useState("");
  const [valueData, setValueData] = useState("");
  const [books, setbooks] = useState([]);
  const [bookCheck, setBookCheck] = useState(true);

  const consoleLog = () => {
    let summonerUrl = "/book/list";
    axios
      .get(
        "https://i3d204.p.ssafy.io/api" +
          summonerUrl +
          `?type=${selectData}&keyword=${valueData}`,
        undefined
      )
      .then((res: AxiosResponse) => {
        if (res.data.content.length === 0) {
          setbooks(res.data.content);
          setBookCheck(false);
        } else {
          setbooks(res.data.content);
          setBookCheck(true);
        }
      })
      .catch((error: AxiosResponse) => {
        console.log(error);
      });
  };

  useEffect(consoleLog, [selectData, valueData]);

  return (
    <div className="search">
      <SearchBar setSelectData={setSelectData} setValueData={setValueData} />
      {valueData ? (
        bookCheck ? (
          <div>
            <h2>검색어 : "{valueData}"</h2>
            {books.map((i: any, index: any) => (
              <BookList
                key={index}
                userNo={props.userNo}
                bookNo={i.bookNo}
                title={i.title}
                author={i.author}
                image={i.cover}
                publisher={i.publisher}
                description={i.description.substr(0, 130) + ". . ."}
              />
            ))}
          </div>
        ) : (
          <h2>해당 검색어 "{valueData}"로 검색 한 결과가 없습니다.</h2>
        )
      ) : (
        <div>
          <h1>전체 책 목록</h1>
          {books.map((i: any, index: any) => (
            <BookList
              key={index}
              userNo={props.userNo}
              bookNo={i.bookNo}
              title={i.title}
              author={i.author}
              image={i.cover}
              publisher={i.publisher}
              description={i.description.substr(0, 130) + ". . ."}
            />
          ))}
        </div>
      )}

      <br />
      <br />
      <br />
    </div>
  );
}

export default Search;
