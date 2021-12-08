import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, useParams } from "react-router-dom";
import { editNotebook } from "../../store/notebooks";

import "../Notebooks/notebooks.css";

const EditNotebook = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const { notebookId } = useParams();
  const notebook = useSelector((state) => state.notebooks[notebookId]);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setTitle(notebook.title);
  }, [notebook]);

  const updateTitle = (e) => setTitle(e.target.value)

  if (!sessionUser) return <Redirect to="/login" />

  const onSubmit = async (e) => {
    e.preventDefault();

    const notebook = await dispatch(editNotebook(notebookId, title))

    if (notebook) {
      return history.push("/notebooks");
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    return history.push("/notebooks");
  };

  return (
    <div>
      <h2 className="notebook_title">Edit Notebook</h2>
      <div className="notebook-container">
        <br />
        <br />
        <form onSubmit={onSubmit} className="add-form">
          <div className="notebook_title">Title</div>
          <br />
          <input
            className="input-form"
            onChange={updateTitle}
            name="title"
            type="text"
            placeholder="untitled notebook"
            value={title}
            required
          />
          <br />
          <div>
          <button className="submit-button" type="submit">
            Edit Notebook
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
    </div>
  );
};

export default EditNotebook;
