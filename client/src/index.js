import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./app/lib/state/store";
import App from "./app/index";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
