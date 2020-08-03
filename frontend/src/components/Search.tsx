import React, { useState, useEffect } from "react";

import SearchBar from "./SearchBar";
import BookList from "./BookList";
import "./Search.css";

function Search() {
  const [selectData, setSelectData] = useState("");
  const [valueData, setValueData] = useState("");

  const consoleLog = () => {
    console.log(selectData, valueData);
  };

  useEffect(consoleLog, [selectData, valueData]);

  return (
    <div className="search">
      <SearchBar setSelectData={setSelectData} setValueData={setValueData} />
      <BookList />
    </div>
  );
}

export default Search;
