import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from "./app"
import { Provider } from "react-redux";
import { RootStore } from "./store";
require("@blueprintjs/core/lib/css/blueprint.css")

ReactDOM.render(
  <React.Fragment>
    <Provider store={RootStore}>
      <App />
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
