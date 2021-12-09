import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, useParams } from "react-router-dom";
import { editNote, getNotes } from "../../store/notes";

import "../Notebooks/notebooks.css";

const EditNote = () => {
  const { notebookId } = useParams();
  const notes = useSelector((state) => state.notes[notebookId]);
  const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!notes) {
      dispatch(getNotes());
    } else {
      setTitle(notes.title);
      setContent(notes.content);
    }
  }, [dispatch, notes, notebookId]);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateContent = (e) => setContent(e.target.value);

  if (!sessionUser) return <Redirect to="/login" />;

  const onSubmit = async (e) => {
    e.preventDefault();

    const note = await dispatch(editNote(notebookId, title, content));

    if (note) {
      return history.push("/notes");
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    return history.push("/notes");
  };

  return (
    <>
      <h2 className="notebook_title">Edit Note</h2>
      <div className="notebook-container">
        <br />
        <br />
        <form onSubmit={onSubmit} className="add-form">
          <div className="notebook_title">Note Title :</div>
          <input
            className="input-form"
            onChange={updateTitle}
            name="content"
            type="text"
            placeholder="untitled note"
            value={title}
          />
          <br />
          <br />
          <div className="notebook_title">Content :</div>

          <textarea
            className="text-form"
            onChange={updateContent}
            name="content"
            type="text"
            placeholder="Edit content"
            value={content}
            maxlength="100"
            required
          />
          <br />
          <div className="note-buttons">
            <button className="submit-button" type="submit">
              Save Note <i className="far fa-save" />
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

export default EditNote;
