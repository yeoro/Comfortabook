import React from "react";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchSelector from "../components/SearchSelector";
import SearchBar from "../components/SearchBar";
import "./Search.css";

class Search extends React.Component {
  state = {
    isLodaing: true,
    books: [],
    searchWord: "해리포터",
  };

  getBooks = async () => {
    const CLIENT_ID = "4mBvXnxwSutbeO3Kl1Qw";
    const CLIENT_SECRET = "uiyoNOTqZt";
    const searchWord = this.state.searchWord;
    try {
      if (searchWord === "") {
        this.setState({ books: [], isLoading: false });
      } else {
        const {
          data: { items },
        } = await axios.get("https://openapi.naver.com/v1/search/book.json", {
          params: {
            query: searchWord,
            display: 20,
            start: 1,
            sort: "sim",
          },
          headers: {
            "X-Naver-Client-Id": CLIENT_ID,
            "X-Naver-Client-Secret": CLIENT_SECRET,
          },
        });

        this.setState({ books: items, isLoading: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    this.getBooks();
    return (
      <div className="search">
        <Header />
        <SearchSelector />
        <SearchBar />
        <Footer />
      </div>
    );
  }
}

export default Search;
