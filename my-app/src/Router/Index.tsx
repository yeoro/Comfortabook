import * as React from "react";

export interface Props {}

export interface State {
  login: any;
}

class Index extends React.Component<Props, State> {
  stata = {
    login: {
      id: "",
      password: "",
    },
  };
  render() {
    return (
      <div>
        <input name="id"></input>
        <input name="pw"></input>
        <button>로그인</button>
      </div>
    );
  }
}

export default Index;
