import axios from "axios";

//ACTIONS
const GET_TODOS = "GET_TODOS";
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

//ACTION CREATORS

const gotTodos = (todos) => {
  return {
    type: GET_TODOS,
    todos,
  };
};

const addedTodo = (todo) => {
  return {
    type: ADD_TODO,
    todo,
  };
};

const deletedTodo = (id) => {
  return {
    type: DELETE_TODO,
    id,
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

export const deleteTodo = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/${id}`);
      dispatch(deletedTodo(id));
    } catch (err) {
      console.error(err);
    }
  };
};

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
      console.log("TITLE FROM REDUCER", title);
      const { data } = await axios.get(`/api/${title}`);
      console.log("DATA FROM FIND TODO THUNK", data);
      dispatch(foundTodo(data));
    } catch (err) {
      next(err);
    }
  };
};

const initialState = [];

export default function toDosReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return action.todos;
    case ADD_TODO:
      return [...state, action.todo];
    case DELETE_TODO:
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
}
