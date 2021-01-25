import React from "react";
import { connect } from "react-redux";
import { fetchTodos } from "../redux/reducer";

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadTodos();
  }

  render() {
    const todos = this.props.todos;
    console.log("PROPS FROM LIST RENDER", this.props);
    return (
      <div>
        <ul>
          {todos
            ? todos.map((todo) => <li key={todo.id}>{todo.title}</li>)
            : ""}
        </ul>
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
    loadTodos: () => dispatch(fetchTodos()),
  };
};

export default connect(mapState, mapDispatch)(ToDoList);
