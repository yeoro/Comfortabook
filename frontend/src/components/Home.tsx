import * as React from "react";
import Hometabs from "./Hometabs";
import RecommendBook from "./RecommendBook";

export interface Props {}

export interface State {}

class Home extends React.Component<Props, State> {
  state = {};
  render() {
    return (
      <div>
        <Hometabs />;
        <RecommendBook />
      </div>
    );
  }
}

export default Home;
