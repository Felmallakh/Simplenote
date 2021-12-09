import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { getNotes, deleteNote } from "../../store/notes";

// import "../Notebooks/notebooks.css"
import "./notes.css";

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
      <h2 className="notes_title">Notes</h2>
      <div className="notes-container">
        <div className="notes-list">
          {Object.values(notes).map(({ id, title, content }) => (
            <NavLink className="notes-links" to={`/notes/${id}`} key={id}>
              {/* <div className="notes-contents"> */}
              <div className="title">{title}</div>
              <div className="notes-contents">{content}</div>
              {/* </div> */}
              <div className="note-buttons">
                <NavLink className="edit-form-link" to={`/edit-note/${id}`}>
                  <div>
                    <button className="submit-button">Edit</button>
                  </div>
                </NavLink>
                <NavLink className="edit-form-link" to={`/notes`}>
                  <div>
                    <button
                      className="submit-button"
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </button>
                  </div>
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
