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
  register(email, pass, nick, idCou, pfp) {
    const user = { email, pass, nick, idCou, pfp };
    return axios.post(ENDPOINT_PATH + "user/save", user);
  },
  login(email, pass) {
    const user = { email, pass };
    return axios.post(ENDPOINT_PATH + "user/login", user);
  },
  deleteUserLogged() {
    Cookies.remove('userLogged');
  }
};
