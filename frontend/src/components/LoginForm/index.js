import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

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
