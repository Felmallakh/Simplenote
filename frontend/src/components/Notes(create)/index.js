import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect, useParams } from "react-router-dom";
import { addNote } from "../../store/notes";
import { getAllNotebook } from "../../store/notebooks";

import "./noteform.css";

const CreateNote = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const notebooks = useSelector((state) => Object.values(state.notebooks));

  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showNotebooks, setShowNotebooks] = useState("");
  const { notebookId } = useParams();

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

  return (
    <>
      <h2 className="edit-notebook-header"> Create Note </h2>
      <form className="add-notebook-form" onSubmit={onSubmit}>
        <div className="inputs">
          Title:
          <input
            className="title-input"
            name="title"
            placeholder="untitled note"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br />
          <br />
          <br />
          Notebook:
          <select
            className="notebook-categories"
            onChange={updateNotebook}
            value={showNotebooks}
          >
            {notebooks.map((notebook) => (
              <option key={notebook.id} value={notebook.id}>
                {notebook.title}
              </option>
            ))}
          </select>
          Content:{" "}
          <textarea
            className="description-input"
            name="content"
            placeholder="Note content goes here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <button className="submit-button" type="submit">
            Add Notebook
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateNote;
