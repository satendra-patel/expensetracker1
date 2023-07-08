import React, { useContext } from "react";
import { Switch,Redirect, Route } from "react-router-dom";
import "./App.css";
import Expenses from "./components/Expenses/Expenses";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Profile from "./components/profile/Profile";
import AuthContext from "./store/Authstate";

function App() {
  const Authctx=useContext(AuthContext);
  const islogin=Authctx.islogin;
  return (
    <>
      <Switch>
        <Route exact path="/">
          {islogin && <Redirect to="/expenses" />}
          {!islogin && <Signup/>}
          
        </Route>

        <Route exact path="/login">
        {islogin && <Redirect to="/expenses" />}
          {!islogin && <Login/> }
         
          
        </Route>
        <Route exact path="/expenses">
          {islogin && <Expenses />}
          {!islogin && <Redirect to="/login" />}
        
         
        </Route>

        <Route exact path="/profile">
          {islogin && <Profile />}
          {!islogin && <Redirect to="/login" />}
          
        </Route>
      </Switch>
    </>
  );
}

export default App;
