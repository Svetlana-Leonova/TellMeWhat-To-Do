import React from "react";
import "../dist/style.css";
import { render } from "react-dom";
import Routes from "./components/Routes";
import store from "./redux/store";

render(<Routes store={store} />, document.getElementById("app"));
