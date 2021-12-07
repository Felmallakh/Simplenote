import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes, removeNote } from "../../store/notes";
import { NavLink, Redirect } from "react-router-dom";

function NotesList() {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeNote(id));
  };

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h2 className="notes_title">Notes</h2>
      <div className="notes-list">
        {notes.map(({ id, title, content }) => (
          <NavLink to={`/notes/${id}`} key={id}>
            <div>{title}</div>
            <div>{content}</div>
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default NotesList;
