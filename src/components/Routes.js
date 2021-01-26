import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import InputForm from "./InputForm";
import Microphone from "./Microphone";
import ToDoList from "./ToDoList";
import store from "../redux/store";

const Routes = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <h1>To-Do List</h1>
          <h2>Welcome to your new voice-operated to-do list!</h2>
          <p id="first">
            Enter text into the input field to add items to your list.
          </p>
          <p id="second">Click the item to mark it as complete.</p>
          <p id="third">Click the "X" to remove the item from your list.</p>
          <p>For a voice command, please click the microphone icon below.</p>
          <p>
            Please note that I currently understand only the following voice
            commands:
          </p>
          <p>ADD, REMOVE (or DELETE), COMPLETE (to toggle completion status)</p>
          <Route exact path="/" component={Microphone} />
          <Route exact path="/" component={InputForm} />
          <Route exact path="/" component={ToDoList} />
        </div>
      </Router>
    </Provider>
  );
};

export default Routes;
