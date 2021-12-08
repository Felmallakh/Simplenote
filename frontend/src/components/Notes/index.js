import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { getNotes, deleteNote } from "../../store/notes";

import "../Notebooks/notebooks.css"

function NotesList() {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
  };

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h2 className="notebook_title">Notes</h2>
      <div className="notebook-container">
      <div className="notebook-list">
        {Object.values(notes).map(({ id, title, content }) => (
          <NavLink className="notebooks-links" to={`/notes/${id}`} key={id}>
            <div className="title">{title}</div>
            <div className="content">{content}</div>
              <div className="notebooks-buttons">

            <NavLink className="edit-form-link" to={`/edit-note/${id}`}>
              <button className="submit-button">Edit</button>
            </NavLink>
              <NavLink className="edit-form-link" to={`/notes`}>

            <button className="submit-button" onClick={() => handleDelete(id)}>
              Delete
            </button>
          </NavLink>
          </div>
          </NavLink>
        ))}
        <div>
          <NavLink className="add-notebook" to="/new-note">
            Add a Note
          </NavLink>
        </div>
      </div>
      </div>
    </>
  );
}

export default NotesList;
