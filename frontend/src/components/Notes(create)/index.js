import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect, useParams } from "react-router-dom";
import { addNote } from "../../store/notes";
import { getAllNotebook } from "../../store/notebooks";

// import "../Notebooks/notebooks.css";
import "../Notes/notes.css";

const CreateNote = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const notebooks = useSelector((state) => Object.values(state.notebooks));

  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showNotebooks, setShowNotebooks] = useState("");
  // const { notebookId } = useParams();

  const updateNotebook = (e) => setShowNotebooks(e.target.value);

  useEffect(() => {
    dispatch(getAllNotebook());
  }, [dispatch]);

  useEffect(() => {
    if (notebooks.length && !showNotebooks) {
      setShowNotebooks(notebooks[0].id);
    }
  }, [notebooks, showNotebooks]);
  console.log(notebooks);

  if (!sessionUser) return <Redirect to="/" />;

  const onSubmit = async (e) => {
    e.preventDefault();

    const note = await dispatch(addNote(showNotebooks, title, content));

    if (note) return history.push("/notes");
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    return history.push("/notes");
  };

  return (
    <>
      <h2 className="notes_title"> Create Note </h2>
      <div className="notes-container">
        <br />
        <br />
        <form className="add-form" onSubmit={onSubmit}>
          <div className="titles">
            <div className="notebook_content">
              Title
              <input
                className="input-form"
                name="title"
                placeholder="untitled note"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              {""} Notebook 
              <select
                className="dropdown"
                onChange={updateNotebook}
                value={showNotebooks}
              >
                {notebooks.map((notebook) => (
                  <option className="dropdown-content" key={notebook.id} value={notebook.id}>
                    {notebook.title}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <br />
          </div>
          <div className="notebook_content">Content </div>
          <textarea
            className="text-form"
            name="content"
            type="text"
            placeholder="Note content goes here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxlength="100"
            required
          />
          <div className="notebook-buttons">
            <button className="submit-button" type="submit">
              Add Note <i className="fas fa-plus-circle" />
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

export default CreateNote;
