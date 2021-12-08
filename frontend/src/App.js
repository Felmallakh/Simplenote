import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Navigation from "./components/Navigation";
import NotesList from "./components/Notes"
import NotebooksList from "./components/Notebooks"
import EditNotebook from "./components/Notebooks(edit)"
import EditNote from "./components/Notes(edit)"
import CreateNotebook from "./components/Notebooks(create)";
import CreateNote from "./components/Notes(create)";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/signup">
            <SignupForm />
          </Route>
          <Route path="/notebooks">
            <NotebooksList />
          </Route>
          <Route path="/edit-notebook/:notebookId">
            <EditNotebook />
          </Route>
          <Route path="/new-notebook">
            <CreateNotebook />
          </Route>
          <Route path="/notes">
            <NotesList />
          </Route>
          <Route path="/edit-note/:notebookId">
            <EditNote />
          </Route>
          <Route path="/new-note">
            <CreateNote />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
