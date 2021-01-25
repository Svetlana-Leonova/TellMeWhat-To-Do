import React from "react";
import { connect } from "react-redux";
import { addTodo, deleteTodo } from "../redux/reducer";
import micIcon from "../../mic-icon.png";
import chime from "../../chime.mp3";
let audio = new Audio(chime);

window.SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new SpeechRecognition();

export class Microphone extends React.Component {
  constructor(props) {
    super(props);
  }

  dictate() {
    recognition.start();
    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      let command = speechToText.split(" ")[0];
      let toDo = speechToText.split(" ").slice(1).join(" ");
      let item = {
        title: toDo,
      };
      if (event.results[0].isFinal) {
        // console.log("COMMAND>>>>>", command);
        // console.log("TODO>>>>>", toDo);
        if (command === "add") {
          this.props.addItem(item);
          console.log("PROPS FROM MIC>>>>>", this.props);
          //FOR LATER: If it's a 409, send a helpful message
        }
        if (command === "delete" || "remove") {
          console.log(command);
          console.log(item);
          //find item by title and dispatch a delete request
          // FOR LATER: if 404, send a helpful message
        }
        if (command === "complete") {
          console.log(command);
          console.log(item);
          //find item by title and dispatch a complete request
          // FOR LATER: if it is already marked as completed, send a helpful voice message?
        }
        // FOR LATER:
        //* add a voice command to show completed tasks only
        //* add a voice command to show incomplete tasks only
      }
    };
  }

  render() {
    return (
      <div>
        <button
          className="button"
          onClick={() => {
            audio.play();
            this.dictate();
          }}
        >
          <img className="mic-icon" src={micIcon} />
        </button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    todos: state.todos,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addItem: (item) => dispatch(addTodo(item)),
    removeItem: (id) => dispatch(deleteTodo(id)),
  };
};

export default connect(mapState, mapDispatch)(Microphone);
