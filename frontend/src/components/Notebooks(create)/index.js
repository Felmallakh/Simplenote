import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { addNotebook } from "../../store/notebooks";

import "../Notebooks/notebooks.css";

const CreateNotebook = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");

  if (!sessionUser) return <Redirect to="/login" />;

  const onSubmit = async (e) => {
    e.preventDefault();

    const notebook = await dispatch(addNotebook(title));

    if (notebook) return history.push("/notebooks");
  };


  const handleCancelClick = (e) => {
    e.preventDefault();
    return history.push("/notebooks");
  };

  return (
    <>
      <h2 className="notebook_title"> Create Notebook </h2>
      <div className="notebook-container">
        <br />
        <br />
        <div className="notebook_title">Title </div>
        <br />
        <form className="add-form" onSubmit={onSubmit}>
          <input
            className="input-form"
            name="title"
            placeholder="untitled notebook"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br />
          <div>
            <button className="submit-button" type="submit">
              Add Notebook
            </button>
            <button
              className="submit-button"
              type="button"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateNotebook;
