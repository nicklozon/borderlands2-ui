import * as React from "react"
import * as ReactDOM from "react-dom"
import WeaponForm from "./components/weapon_form"
import LibVersion from "./components/lib_version"
require("@blueprintjs/core/lib/css/blueprint.css")

ReactDOM.render(
  <React.Fragment>
    <WeaponForm />
    <LibVersion />
  </React.Fragment>,
  document.getElementById("root")
);
