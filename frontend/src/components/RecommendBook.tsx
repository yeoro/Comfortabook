import React from "react";
import axios from "axios";

import BookList from "./BookList";

class RecommendBook extends React.Component {
  state = {
    // data: [],
  };

  // getBestseller = async () => {
  //   const URL = "/book/list";
  //   const { data } = await axios.get(URL);
  //   this.setState({ data });
  //   console.log({ data });
  // };

  // componentDidMount() {
  //   this.getBestseller();
  // }

  render() {
    // const { data } = this.state;
    return (
      <div>
        {/* {data.map((i: any) => (
          <BookList
            key={i.bookNo}
            title={i.title}
            author={i.author}
            image={i.cover}
            publisher={i.publisher}
          />
        ))} */}
      </div>
    );
  }
}

export default RecommendBook;
