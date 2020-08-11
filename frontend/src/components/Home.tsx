import * as React from "react";

import Today from "./Today";
import RecommendBook from "./RecommendBook";

export interface Props {}

export interface State {}

class Home extends React.Component<Props, State> {
  state = {};
  render() {
    return (
      <div>
        <Today />
        <RecommendBook />
      </div>
    );
  }
}

export default Home;
