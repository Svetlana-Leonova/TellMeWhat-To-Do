import { combineReducers } from "redux";
import reducer from "./reducer";

const appReducer = combineReducers({
  todos: reducer,
});

export default appReducer;
