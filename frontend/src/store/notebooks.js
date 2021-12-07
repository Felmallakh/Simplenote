const { csrfFetch } = require('./csrf');

const GET_ALL_NOTEBOOKS = "notebook/getAllNotebook";
const GET_ONE_NOTEBOOK = "notebook/getOneNotebook";
const ADD_NOTEBOOK = "notebook/addNotebook";
const UPDATE_NOTEBOOK = "notebook/editNotebook";
const REMOVE_NOTEBOOK = "notebook/deleteNotebook";

const getAll = payload => {
    return { type: GET_ALL_NOTEBOOKS, payload }
};

const getOne = payload => {
    return { type: GET_ONE_NOTEBOOK, payload }
};

const add = payload => {
    return { type: ADD_NOTEBOOK, payload }
};

const update = payload => {
    return { type: UPDATE_NOTEBOOK, payload }
};

const remove = payload => {
    return { type: REMOVE_NOTEBOOK, payload }
};

export const getAllNotebook = () => async (dispatch) => {
    const response = await csrfFetch('/api/notebooks');

    if (response.ok) {
        const data = await response.json();
        dispatch(getAll(data));
    }
};

export const getOneNotebook = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks/${id}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getOne(data));
    }
};

export const addNotebook = (title) => async (dispatch) => {
    const response = await csrfFetch("/api/notebooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({title})
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(add(data))
        return data;
    }
};

export const editNotebook = (id, title) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({title})
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(update(data))
        return data;
    }
};

export const deleteNotebook = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks/${id}`, { method: 'DELETE' })

    if (response.ok) dispatch(remove(id))
};

const initialState = {};

const notebookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_NOTEBOOKS:
      const notebooks = {};
      action.payload.forEach((notebook) => (notebooks[notebook.id] = notebook));
      return { ...state, ...notebooks };

    case GET_ONE_NOTEBOOK:
        return { ...state, [action.payload.id]: action.payload}

    case ADD_NOTEBOOK:
      return { ...state, [action.payload.id]: action.payload };

    case UPDATE_NOTEBOOK:
      return { ...state, [action.payload.id]: action.payload };

    case REMOVE_NOTEBOOK:
        const newState = { ...state };
        delete newState[action.payload]
        return newState;
    //   return { ...state, [action.payload.id]: action.payload };

    default:
      return state;
  }
};

export default notebookReducer
