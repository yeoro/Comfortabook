import * as React from "react";
import Homecarousel from "./Homecarousel";

export interface Props {}

export interface State {}

class Today extends React.Component<Props, State> {
  state = {};
  render() {
    return (
      <div>
        <Homecarousel />
      </div>
    );
  }
}

export default Today;
