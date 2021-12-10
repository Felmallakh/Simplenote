import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, useParams, useHistory } from "react-router-dom";
import { getNotebooksNotes, deleteNote } from "../../store/notes";

import "../Notebooks/notebooks.css";
// import "./notes.css";

function NotebookNotes() {
  //   const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const notebookId = useParams();
  const history = useHistory();

  console.log("noteebookIddd", notebookId);

  const notebooks = useSelector((state) => state.notebooks);

  const [isLoaded, setisLoaded] = useState(false);

  useEffect(() => {
    dispatch(getNotebooksNotes(notebookId)).then(() => {
      setisLoaded(true);
    });
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
    return history.push(`/notebook/${notebookId}/notes`);
  };

  const notes = useSelector((state) => state.notes.notesbookNotes);
  // console.log("notexxxxx", notes[0])

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h2 className="notes_title">Notebook Notes</h2>
      <div className="notes-container">
        <div className="notes-list">
          {notes &&
            Object.values(notes).map(({ id, title, content, createdAt }) => {
              const date = new Date(createdAt).toLocaleString().replace('-', '.').split('T')[0].replace('-', '.');
              return (
                <NavLink
                  className="notes-links"
                  to={`/notebook/${id}/notes`}
                  key={id}
                >
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
                  <div className="date">Created at {date}</div>
                </NavLink>
              );
            })}
          <div>
            <NavLink className="add-notebook" to="/new-note">
              Add a Note
            </NavLink>
            <NavLink className="add-notebook" to="/notebooks">
              <i className="fas fa-arrow-left" /> Notebooks
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotebookNotes;
