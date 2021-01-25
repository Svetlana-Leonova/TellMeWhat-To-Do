import axios from "axios";

//ACTIONS
const GET_TODOS = "GET_TODOS";
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const COMPLETE_TODO = "COMPLETE_TODO";

//ACTION CREATORS

export const gotTodos = (todos) => {
  return {
    type: GET_TODOS,
    todos,
  };
};

export const addedTodo = (todo) => {
  return {
    type: ADD_TODO,
    todo,
  };
};

// THUNK CREATORS
export const addTodo = (todo) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api", todo);
      dispatch(addedTodo(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const fetchTodos = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api");
      dispatch(gotTodos(data));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return action.todos;
    case ADD_TODO:
      return [...state, action.todo];
    default:
      return state;
  }
}
