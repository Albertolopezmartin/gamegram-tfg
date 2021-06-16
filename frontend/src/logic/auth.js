import axios from "axios";
import Cookies from "js-cookie";

const ENDPOINT_PATH = "http://localhost:3900/api/";

export default {
  setUserLogged(userLogged) {
    Cookies.set("userLogged", userLogged);
  },
  getUserLogged() {
    return Cookies.get("userLogged");
  },
  register(email, password) {
    const user = { email, password };
    return axios.post(ENDPOINT_PATH + "save/user", user);
  },
  login(email, password) {
    const user = { email, password };
    return axios.post(ENDPOINT_PATH + "save", user);
  },
  deleteUserLogged() {
    Cookies.remove('userLogged');
  }
};
