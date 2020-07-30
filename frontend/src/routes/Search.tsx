import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import "./Search.css";

class Search extends React.Component {
  render() {
    return (
      <div className="search">
        <Header />
        <SearchBar />
        <Footer />
      </div>
    );
  }
}

export default Search;
