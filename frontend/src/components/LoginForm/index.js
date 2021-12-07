import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { getNotes } from "../../store/notes";
import { getAllNotebook, deleteNotebook } from "../../store/notebooks";


import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const notebooks = useSelector((state) => state.notebooks);

   useEffect(() => {
     dispatch(getAllNotebook());
   }, [dispatch]);

   const handleDelete = (id) => {
     dispatch(deleteNotebook(id));
     // window.location.reload();
   };

  if (sessionUser) {
    return (
      <>
        <h2 className="notebook_title">Notebooks</h2>
        <div className="notebook-list">
          {notebooks &&
            Object.values(notebooks).map(({ id, title }) => (
              <NavLink
                className="notebooks-links"
                to={`/notebooks/${id}`}
                key={id}
              >
                {title}
                <NavLink to={`/edit-notebook/${id}`} className="edit-form-link">
                  Edit
                </NavLink>
                <button
                  onClick={() => handleDelete(id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </NavLink>
            ))}
          <NavLink to="/new-notebook" className="add-notebook">
            Add a Notebook
          </NavLink>
        </div>
      </>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.loginUser({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="form-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <h2 className="form-title"> Sign In</h2>
        <ul className="user-form-errors">
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
        <div className="sign-in-form">
          <div className="form-inputs">
            <label htmlFor="credential">Username or Email</label>
            <input
              name="credential"
              type="text"
              placeholder="Username or Email Address"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="sub-cancel-buttons">
          <button className="submit_button" type="submit">
            Sign In
          </button>
          <button
            className="submit_button"
            onClick={() => {
              setCredential("Demo");
              setPassword("password");
            }}
          >
            Demo User
          </button>
        </div>
        <div className="sub-cancel-buttons">
          <span className="cancel-button">
            <Link className="redirect-link" to="/">
              Cancel
            </Link>
          </span>
        </div>
        <label>
          Don't have an account? Signup{" "}
          <Link className="redirect-link" to="/signup">
            here
          </Link>
        </label>
      </form>
    </div>
  );
}

export default LoginForm;
