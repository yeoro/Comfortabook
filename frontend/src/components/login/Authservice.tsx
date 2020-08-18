import axios from "axios";

class AuthenticationService {
  // send username, password to the SERVER
  executeJwtAuthenticationService = async (
    username: string,
    password: string
  ) => {
    return await axios.post(
      "http://i3d204.p.ssafy.io/api/user/signin",
      {
        email: username,
        password: password,
      },
      undefined
    );
  };

  // executeHelloService() {
  //   console.log("===executeHelloService===");
  //   return axios.get("http://localhost:8090/hello");
  // }

  registerSuccessfulLoginForJwt(username: string, token: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("authenticatedUser", username);
    // sessionStorage.setItem('authenticatedUser', username)
    //this.setupAxiosInterceptors(this.createJWTToken(token))
    this.setupAxiosInterceptors();
  }

  createJWTToken(token: string) {
    return "Bearer " + token;
  }

  setupAxiosInterceptors() {
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
  }

  logout() {
    //sessionStorage.removeItem('authenticatedUser');
    localStorage.removeItem("authenticatedUser");
    localStorage.removeItem("token");
  }

  isUserLoggedIn() {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    }

    return false;
  }

  getLoggedInUserName() {
    //let user = sessionStorage.getItem('authenticatedUser')
    let user = localStorage.getItem("authenticatedUser");
    if (user === null) return "";
    return user;
  }
}

export default new AuthenticationService();
