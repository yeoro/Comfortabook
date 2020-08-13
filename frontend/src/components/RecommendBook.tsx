import React from "react";
import axios, { AxiosResponse } from "axios";

import BookList from "./BookList";

export interface Props {
  bestSeller: any;
}

export interface State {
  bestSeller: any;
}

class RecommendBook extends React.Component {
  state = {
    bestSeller: [],
  };

  getBestseller = async () => {
    let summonerUrl = "/book/bestSeller";
    await axios
      .get("http://i3d204.p.ssafy.io:9999" + summonerUrl, undefined)
      .then((res: AxiosResponse) => {
        this.setState({
          bestSeller: res.data,
        });
        console.log(this.state.bestSeller);
      })
      .catch((error: AxiosResponse) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getBestseller();
  }

  render() {
    const { bestSeller } = this.state;
    return (
      <div>
        {bestSeller.map((i: any, index: any) => (
          <BookList
            key={index}
            title={i.title}
            author={i.author}
            image={i.cover}
            publisher={i.publisher}
            description={i.description}
          />
        ))}
      </div>
    );
  }
}

export default RecommendBook;
