import { NavLink } from "react-router-dom"
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <h2 className="a1">Source Code Repository</h2>
      <div className="a2">
        <NavLink to="/githubSourceCode" className="a2">
          <i className="fab fa-github-square fa-2x"></i>
        </NavLink>
      </div>
      <h2 className="a3">Contact Me</h2>

      <div className="a4">
        <NavLink className="github-icon" to="/githubProfile">
          <i className="fab fa-github-square fa-2x"></i>
        </NavLink>
        <NavLink className="linkedin-icon" to="/linkedInProfile">
          <i className="fab fa-linkedin fa-2x"></i>
        </NavLink>
        <NavLink className="mail-icon" to="/email">
          <i className="fas fa-envelope-square fa-2x"></i>
        </NavLink>
      </div>
    </div>
  );
};

export default Footer;
