import React from "react";
import axios from "axios";

import BookList from "./BookList";

class RecommendBook extends React.Component {
  state = {
    item: [],
  };

  getBestseller = async () => {
    const TTB_KEY = "ttbee2e1738001";
    let url = `/ttb/api/ItemList.aspx?ttbkey=${TTB_KEY}&QueryType=Bestseller&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`;
    const {
      data: { item },
    } = await axios.get(url);
    this.setState({ item });
  };

  componentDidMount() {
    this.getBestseller();
  }

  render() {
    const { item } = this.state;
    return (
      <div>
        {item.map((i: any) => (
          <BookList
            key={i.itemId}
            title={i.title}
            author={i.author}
            image={i.cover}
            publisher={i.publisher}
          />
        ))}
      </div>
    );
  }
}

export default RecommendBook;
