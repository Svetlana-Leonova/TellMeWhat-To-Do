import axios from "axios";

//ACTIONS
const TOGGLE_COMPLETE = "TOGGLE_COMPLETE";
const FIND_TODO = "FIND_TODO";

//ACTION CREATORS

const toggledComplete = (todo) => {
  return {
    type: TOGGLE_COMPLETE,
    todo,
  };
};

const foundTodo = (todo) => {
  return {
    type: FIND_TODO,
    todo,
  };
};

// THUNK CREATORS
export const toggleComplete = (todo) => {
  return async (dispatch) => {
    try {
      todo.completed = !todo.completed;
      const newData = await axios.put(`/api/${todo.id}`, todo);
      dispatch(toggledComplete(newData));
    } catch (err) {
      console.error(err);
    }
  };
};

export const findTodo = (todo) => {
  return async (dispatch) => {
    try {
      const { title } = todo;
      if (!title) {
        console.error("Error, search parameter not defined");
        return;
      }
      const { data } = await axios.get(`/api/${title}`);
      dispatch(foundTodo(data));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = {};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_COMPLETE:
      return action.todo;
    case FIND_TODO:
      return action.todo;
    default:
      return state;
  }
}
