import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../redux/reducer";
import micIcon from "../../mic-icon.png";
// import chime from "../../chime.mp3";
// let audio = new Audio(chime);

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
      if (event.results[0].isFinal) {
        // console.log("COMMAND>>>>>", command);
        // console.log("TODO>>>>>", toDo);
        if (command === "add") {
          let item = {
            title: toDo,
          };
          this.props.addItem(item);
          console.log("PROPS FROM MIC>>>>>", this.props);
        }
        //   if (command.includes("delete" || "remove") {
        // dispatch a request to find text and remove matching item from the store/state
        //FOR LATER: if not found, send a helpful voice message?
        // }
        //if (command.includes("complete") {
        //dispatch a request to find text and mark matching item as complete
        //FOR LATER: if it is already marked as completed, send a helpful voice message?
      }
    };
  }

  render() {
    return (
      <div>
        <button
          className="button"
          onClick={() => {
            // audio.play();
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
  };
};

export default connect(mapState, mapDispatch)(Microphone);
