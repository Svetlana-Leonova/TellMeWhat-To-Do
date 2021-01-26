import React from "react";
import { connect } from "react-redux";
import { fetchTodos, deleteTodo } from "../redux/reducer";
import { toggleComplete } from "../redux/itemReducer";

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.loadTodos();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.item !== this.props.item) {
      this.props.loadTodos();
    }
  }

  handleClick(todo) {
    this.props.toggleStatus(todo);
  }

  handleDelete(id) {
    this.props.removeItem(id);
  }

  render() {
    const todos = this.props.todos;
    return (
      <div>
        <ul>
          {todos
            ? todos.map((todo) => (
                <li
                  key={todo.id}
                  className={todo.completed ? "done" : ""}
                  onClick={() => this.handleClick(todo)}
                >
                  {todo.title}
                  <button onClick={() => this.handleDelete(todo.id)}>X</button>
                </li>
              ))
            : ""}
        </ul>
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
    loadTodos: () => dispatch(fetchTodos()),
    removeItem: (id) => dispatch(deleteTodo(id)),
    toggleStatus: (todo) => dispatch(toggleComplete(todo)),
  };
};

export default connect(mapState, mapDispatch)(ToDoList);
