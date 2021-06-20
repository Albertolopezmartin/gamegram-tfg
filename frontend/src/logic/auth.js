import axios from "axios";
import Cookies from "js-cookie";
import Global from "../Global";

var url = Global.url;

export default {
  setUserLogged(userLogged) {
    Cookies.set("userLogged", userLogged);
  },
  getUserLogged() {
    return Cookies.get("userLogged");
  },
  register(email, pass, nick, idCou, pfp) {
    var user = { email, pass, nick, idCou, pfp };
    return axios.post(url + "user/save", user);
  },
  login(nick, pass) {
    var user = { nick, pass };
    return axios.post(url + "user/login", user);
  },
  deleteUserLogged() {
    Cookies.remove('userLogged');
  }
};
