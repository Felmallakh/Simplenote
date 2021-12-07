import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { addNote } from "../../store/notes";


const CreateNote = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!sessionUser) return <Redirect to="/" />;

  const onSubmit = async (e) => {
    e.preventDefault();

    const note = await dispatch(addNote(title, content));

    if (note) return history.push("/notes");
  };

  return (
    <>
      <h2 className="headers"> Create Note </h2>
      <form className="add-form" onSubmit={onSubmit}>
        <div className="inputs">
          Title:
          <input
            name="title"
            placeholder="untitled note"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br />
          <br />
          <br />
          Content:{" "}
          <textarea
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
