import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, useParams } from "react-router-dom";
import { editNote, getNotes } from "../../store/notes";

const EditNote = () => {
    const { notebookId } = useParams();
    const notes = useSelector((state) => state.notes[notebookId])
    const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("")

  const dispatch = useDispatch();
  const history = useHistory();

    useEffect(() => {
      if (!notes) {
        dispatch(getNotes());
      } else {
        setTitle(notes.title);
        setContent(notes.description);
      }
    }, [dispatch, notes, notebookId, title]);


    const updateContent = (e) => setContent(e.target.value);

  if (!sessionUser) return <Redirect to="/login" />;

  const onSubmit = async (e) => {
    e.preventDefault();

    const note = await dispatch(editNote(notebookId, title, content));

    if (note) {
      return history.push("/notes");
    }
  };

  return (
    <>
      <h2 className="edit-notebook-header">Edit Note</h2>
      <form onSubmit={onSubmit} className="add-notebook-form">
        Notebook Title :
        <span />{title}
        <br />
        Content:
        <input
          onChange={updateContent}
          name="content"
          type="text"
          placeholder="Edit content"
          value={content}
        />
        <button className="submit-button" type="submit">
          Edit Note
        </button>
      </form>
    </>
  );
};

export default EditNote;
