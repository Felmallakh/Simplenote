import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { addNotebook } from "../../store/notebooks";

import "./notebookform.css";


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

  return (
    <>
    <h2 className="headers"> Create Notebook </h2>
    <form className="add-form" onSubmit={onSubmit}>
        <input name="title" placeholder="untitled notebook" value={title} onChange={e => setTitle(e.target.value)} />
      <div>
        <button className="submit-button" type="submit">Add Notebook</button>
      </div>
    </form>
    </>
  );
};

export default CreateNotebook;
