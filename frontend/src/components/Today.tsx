import * as React from "react";
import Homecarousel from "./Homecarousel";

export interface Props {}

export interface State {}

class Today extends React.Component<Props, State> {
  state = {};
  render() {
    return (
      <div className="today">
        <Homecarousel />
        도레미??????????????/
      </div>
    );
  }
}

export default Today;
