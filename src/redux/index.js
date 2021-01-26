import { combineReducers } from "redux";
import toDosReducer from "./reducer";
import itemReducer from "./itemReducer";

const appReducer = combineReducers({
  todos: toDosReducer,
  item: itemReducer,
});

export default appReducer;
