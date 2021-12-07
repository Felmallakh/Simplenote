import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { getNotes, deleteNote } from "../../store/notes";

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
      <div className="notes-list">
        {Object.values(notes).map(({ id, title, content }) => (
          <NavLink to={`/notes/${id}`} key={id}>
            <div>{title}</div>
            <div>{content}</div>
            <NavLink to={`/edit-note/${id}`}>
              <button className="submit-button">Edit
              </button></NavLink>
            <button className="submit-button" onClick={() => handleDelete(id)}>
              Delete
            </button>
          </NavLink>
        ))}
        <NavLink to="/new-note">Add a Note</NavLink>
      </div>
    </>
  );
}

export default NotesList;
