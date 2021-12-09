import { csrfFetch } from "./csrf";

const GET_NOTES = "note/getNotes";
const ADD_NOTE = "note/addNote";
const UPDATE_NOTE = "note/editNote";
const REMOVE_NOTE = "note/removeNote";

//GET Note
const get = (payload) => {
  return {
    type: GET_NOTES,
    payload,
  };
};

//ADD Note
const add = (payload) => {
  return {
    type: ADD_NOTE,
    payload,
  };
};

//UPDATE Note
const update = (payload) => {
  return {
    type: UPDATE_NOTE,
    payload,
  };
};

//DELETE Note
const remove = (payload) => {
  return {
    type: REMOVE_NOTE,
    payload,
  };
};

//Get Notes
export const getNotes = () => async (dispatch) => {
  const response = await csrfFetch("/api/notes");

  if (response.ok) {
    const data = await response.json();
    dispatch(get(data));
  }
};

//Add/Create Note
export const addNote = (notebookId, title, content) => async (dispatch) => {
  const response = await csrfFetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ notebookId, title, content }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(add(data));
    return data;
  }
};

//Update Note
export const editNote = (noteId, title, content) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes/${noteId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(update(data));
    return data;
  }
};

//Delete Note
export const deleteNote = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes/${id}`, { method: "DELETE" });

  if (response.ok) dispatch(remove(id));
};

const initialState = {};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTES:
      const notes = {};
      action.payload.forEach((note) => (notes[note.id] = note));
      return { ...state, ...notes };

    case ADD_NOTE:
      return { ...state, [action.payload.id]: action.payload };

    case UPDATE_NOTE:
      return { ...state, [action.payload.id]: action.payload };

    case REMOVE_NOTE:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    // return { ...state, [action.payload.id]: action.payload };

    default:
      return state;
  }
};

export default noteReducer;
