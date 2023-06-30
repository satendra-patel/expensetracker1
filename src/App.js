import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Expenses from "./components/Expenses/Expenses";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Profile from "./components/profile/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/expenses" element={<Expenses/>}/>
        <Route path="/profile" element={<Profile/>}/>
       </Routes>
    </>
  );
}

export default App;
