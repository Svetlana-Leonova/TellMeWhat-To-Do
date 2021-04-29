import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Instructions from "./Instructions";
import InputForm from "./InputForm";
import Microphone from "./Microphone";
import ToDoList from "./ToDoList";
import store from "../redux/store";

const Routes = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Instructions} />
        <Route exact path="/" component={Microphone} />
        <Route exact path="/" component={InputForm} />
        <Route exact path="/" component={ToDoList} />
      </Router>
    </Provider>
  );
};

export default Routes;
