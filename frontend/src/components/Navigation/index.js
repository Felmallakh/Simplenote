import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import { loginUser } from "../../store/session";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

    // const demoLogin = async () => {
    //   await dispatch(loginUser("Demo", "password"));
    //   history.push("/home");
    // };

  let sessionLinks;

  if (sessionUser) sessionLinks = <ProfileButton user={sessionUser} />;

  else {
    sessionLinks = (
      <>
        <NavLink className="nav-link" to="/login">Log In</NavLink>
        <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
        {/* <span className="nav-link" onClick={demoLogin}>Demo</span> */}
      </>
    );
  }

  return (
    <div  className="nav-container">
    <ul>
      <li>
        <NavLink className="nav-link" exact to="/">
          SimpleNotes
        </NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
    </div>
  );
}

export default Navigation;
