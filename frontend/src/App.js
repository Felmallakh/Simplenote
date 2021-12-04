import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <Switch>
        <h1>Hello from App</h1>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
      </Switch>
    )
  );
}

export default App;
