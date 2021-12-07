import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, useParams } from "react-router-dom";
import { editNotebook } from "../../store/notebooks";

const EditNotebook = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const { notebookId } = useParams();
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

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
    <>
      <h2 className="edit-notebook-header">Edit Notebook</h2>
      <form onSubmit={onSubmit} className="add-notebook-form">
        Title:{" "}
        <input
          onChange={updateTitle}
          name="title"
          type="text"
          placeholder="untitled notebook"
          value={title}
          required
        />
        <button className="submit-button" type="submit">
          Edit Notebook
        </button>
        <button className="submit-button" type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default EditNotebook;
