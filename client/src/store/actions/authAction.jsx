import Axios from "axios";
// import * as jwtDecode from 'jwt-decode'
import * as Types from "./types";
import setAuthToken from "../../utils/setAuthToken";

export const register = (user, history) => (dispatch) => {
  Axios.post("/api/users/register", user)
    .then((res) => {
      dispatch({
        type: Types.USERS_ERROR,
        payload: {
          error: {},
        },
      });
      console.log(res);
      history.push("/login");
    })
    .catch((error) => {
      dispatch({
        type: Types.USERS_ERROR,
        payload: {
          error: error.response.data,
        },
      });
    });
};

export const login = (user, history) => (dispatch) => {
  Axios.post("/api/users/login", user)
    .then((res) => {
      let token = res.data.token;
      localStorage.setItem("auth_token", token);
      setAuthToken(token);
      let decode = (token) => {
        let base64Url = token.split(".")[1];
        let base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
      };

      dispatch({
        type: Types.SET_USER,
        payload: {
          user: decode(token),
        },
      });

      history.push("/dashboard");

      // decode our token
      // save token to local storage
      // set auth header
      // dispatch set user
    })
    .catch((error) => {
      console.log(error.response.data);

      dispatch({
        type: Types.USERS_ERROR,
        payload: {
          error: error.response.data,
        },
      });
    });
};

export const logout = (history) => {
  localStorage.removeItem("auth_token");
  history.push("/login");
  return {
    type: Types.SET_USER,
    payload: {
      user: {},
    },
  };
};
