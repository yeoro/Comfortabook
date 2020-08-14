import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import SearchBar from "./SearchBar";
import BookList from "./BookList";
import "./Search.css";

function Search() {
  const [selectData, setSelectData] = useState("");
  const [valueData, setValueData] = useState("");
  const [books, setbooks] = useState([]);

  const consoleLog = () => {
    console.log(selectData, valueData);
    let summonerUrl = "/book/list";
    axios
      .get(
        "http://i3d204.p.ssafy.io:9999" +
          summonerUrl +
          `?type=${selectData}&keyword=${valueData}`,
        undefined
      )
      .then((res: AxiosResponse) => {
        console.log(res.data.content);
        setbooks(res.data.content);
      })
      .catch((error: AxiosResponse) => {
        console.log(error);
      });
  };

  useEffect(consoleLog, [selectData, valueData]);

  return (
    <div className="search">
      <SearchBar setSelectData={setSelectData} setValueData={setValueData} />
      {books.map((i: any, index: any) => (
        <BookList
          key={index}
          title={i.title}
          author={i.author}
          image={i.cover}
          publisher={i.publisher}
          description={i.description.substr(0, 100)}
        />
      ))}
      <br />
      <br />
      <br />
    </div>
  );
}

export default Search;
