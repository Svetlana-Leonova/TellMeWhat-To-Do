import { createStore, applyMiddleware } from "redux";
import axios from "axios";
import appReducer from "./index";
import { createLogger } from "redux-logger"; // https://github.com/evgenyrodionov/redux-logger
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk"; // https://github.com/gaearon/redux-thunk

let middleware = [
  // `withExtraArgument` gives us access to axios in our async action creators!
  // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
  thunkMiddleware.withExtraArgument({ axios }),
];

export default createStore(
  appReducer,
  // 👇 This uses the Redux DevTools extension, assuming you have it installed in your browser.
  // 👇 See: https://github.com/zalmoxisus/redux-devtools-extension
  composeWithDevTools(applyMiddleware(...middleware))
);
