import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as Types from "./store/actions/types";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";

const token = localStorage.getItem("auth_token");
if (token) {
  let decode = (token) => {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };
  setAuthToken(token)
  store.dispatch({
    type: Types.SET_USER,
    payload: {
      user: decode(token),
    },
  });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
