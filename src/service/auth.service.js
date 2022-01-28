import axios from "axios";

import authHeader from "./auth-header";


const API_URL = "http://localhost:8081/users/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "authenticate", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      });
  }

  register(user) {
    return axios.post(API_URL + "register", user).then((response) => {
      return response.data;
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  whoami() {
    return axios
      .get("http://localhost:8080/api/whoami/", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new AuthService();
