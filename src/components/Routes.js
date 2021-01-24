import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import { InputForm } from "./InputForm";
import { Microphone } from "./Microphone";

const Routes = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <div className="row">
            <div className="intro col-12">
              <h1>To-Do List</h1>
              <div>
                <div className="border1"></div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="helpText col-12">
              <p id="first">
                Enter text into the input field to add items to your list.
              </p>
              <p id="first">
                For a voice command, please click the microphone icon below.
              </p>
              <p id="second">Click the item to mark it as complete.</p>
              <p id="third">Click the "X" to remove the item from your list.</p>
            </div>
          </div>

          <InputForm />
          <Microphone />

          {/* <!-- Empty List --> */}
          <div className="row">
            <div className="listItems col-12">
              <ul className="col-12 offset-0 col-sm-8 offset-sm-2"></ul>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default Routes;
