import * as React from "react";
// import jwt_decode from "jwt-decode";
import Auth from "../Components/Authentication";
import { History } from "history";

export interface Props {
  history: History;
}

export interface State {
  id: string;
  password: string;
}

class Index extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: "",
      password: "",
    };
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "id") {
      this.setState({
        id: value,
      });
    } else {
      this.setState({
        password: value,
      });
    }
  };
  dologin = () => {
    Auth.executeJwtAuthenticationService(this.state.id, this.state.password)
      .then((response: any) => {
        Auth.registerSuccessfulLoginForJwt(this.state.id, response.data);
        console.log("success");
        this.props.history.push("/home");
      })
      .catch(() => {
        // this.setState({showSuccessMessage:false})
        // this.setState({hasLoginFailed:true})
        console.log("success");
      });
  };

  render() {
    return (
      <div>
        <input onChange={this.onChange} name="id"></input>
        <input onChange={this.onChange} name="pw" type="password"></input>
        <button onClick={this.dologin}>로그인</button>
      </div>
    );
  }
}

export default Index;
