import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { getAllNotebook, deleteNotebook } from "../../store/notebooks";

function NotebooksList() {
  const notebooks = useSelector((state) => state.notebooks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNotebook());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteNotebook(id));
  };

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h2 className="notebook_title">Notebooks</h2>
      <div className="notebook-list">
        {Object.values(notebooks).map(({ id, title }) => (
          <NavLink to={`/notebooks/${id}`} key={id}>
            {title}
            <NavLink to={`/edit-notebook/${id}`}>Edit</NavLink>
            <button onClick={() => handleDelete(id)}>Delete</button>
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default NotebooksList;
