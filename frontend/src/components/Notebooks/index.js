import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { getAllNotebook, deleteNotebook } from "../../store/notebooks";

import "./notebooks.css";


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
      <div className="notebook-container">
        <div className="notebook-list">
          {notebooks && Object.values(notebooks).map(({ id, title }) => (
            <NavLink className="notebooks-links" to={`/notebook/${id}/notes`} key={id}>
              <div className="title">{title}</div>
              <div className="notebooks-buttons">
              <NavLink className="edit-form-link" to={`/edit-notebook/${id}`}>
                <button className="submit-button">Edit</button>
              </NavLink>
              <NavLink className="edit-form-link" to={`/notebooks`}>
                <button
                  className="submit-button"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </button>
              </NavLink>
              </div>
            </NavLink>
          ))}
          <div>
            <NavLink className="add-notebook" to="/new-notebook">
              Add Notebook
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotebooksList;

