import React from "react";
import { connect } from "react-redux";
import { addTodo, deleteTodo, fetchTodos } from "../redux/reducer";
import { findTodo, toggleComplete } from "../redux/itemReducer";
import micIcon from "../../mic-icon.png";
import chime from "../../chime.mp3";
// let audio = new Audio(chime);

window.SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new SpeechRecognition();

class Microphone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speech: "",
    };
    this.dictate = this.dictate.bind(this);
  }

  componentDidMount() {
    this.props.loadTodos();
  }

  dictate() {
    const commandsList = ["add", "remove", "delete", "complete"];
    recognition.start();
    recognition.onresult = async (event) => {
      const speechToText = event.results[0][0].transcript;
      this.setState({ speech: speechToText });
      const command = speechToText.split(" ")[0];
      const title = speechToText.split(" ").slice(1).join(" ").toLowerCase();
      const titleObj = {
        title: title,
      };
      if (commandsList.indexOf(command) === -1) {
        return;
      }
      if (command === "add") {
        this.props.addItem(titleObj);
        return;
      }

      if (command === "complete") {
        await this.props.findItem(titleObj);
        this.props.toggleStatus(this.props.item);
        return;
      }

      if (command === "delete" || "remove") {
        await this.props.findItem(titleObj);
        this.props.removeItem(this.props.item.id);
        return;
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
        <p>I heard you say: {this.state.speech}</p>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    todos: state.todos,
    item: state.item,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addItem: (item) => dispatch(addTodo(item)),
    removeItem: (id) => dispatch(deleteTodo(id)),
    findItem: (title) => dispatch(findTodo(title)),
    toggleStatus: (todo) => dispatch(toggleComplete(todo)),
    loadTodos: () => dispatch(fetchTodos()),
  };
};

export default connect(mapState, mapDispatch)(Microphone);
