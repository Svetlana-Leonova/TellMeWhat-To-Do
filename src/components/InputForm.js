import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../redux/reducer";

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEdit(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addItem(this.state);
  }

  render() {
    return (
      <div>
        <hr />
        <p>Tired of voice commands? Use regular text input</p>
        <p id="first">
          Enter text into the input field to add items to your list.
        </p>
        <p id="second">Click the item to mark it as complete.</p>
        <p id="third">Click the "X" to remove the item from your list.</p>
        <hr />
        <div className="row">
          <form className="col-12" onSubmit={this.handleSubmit}>
            <input
              name="title"
              id="userInput"
              type="text"
              placeholder="Type new item here..."
              maxLength="27"
              onChange={this.handleEdit}
            />
            <button id="enter">
              Add<i className="fas fa-pencil-alt"></i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    todos: state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addItem: (item) => dispatch(addTodo(item)),
  };
};

export default connect(mapState, mapDispatch)(InputForm);
