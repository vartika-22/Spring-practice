// App.js
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Authentication from "./Components/Authentication";
import HomePage from "./Components/HomPage/HomePage";
import Profile from "./Components/Profile/Profile";
import Message from "./Components/Message/Message";
import Login from "./Components/Login";
import Register from "./Components/Register";
import PrivateRoute from "./PrivateRoute";
import MiddlePart from "./Components/MiddlePart/MiddlePart";
import Reels from "./Components/Reels/Reels";
import CreateReelForm from "./Components/Reels/CreateReelForm";

function App() {
  const isAuthenticated = !!localStorage.getItem("jwt");
  return (
    <div className="App">
        <BrowserRouter forceRefresh={true}>
        <Routes>
          <Route path="*" element={<Authentication />} />
          
          <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Authentication />}
        />
          <Route
            path="/profile/:id"
            element={<Profile /> }
          />
          <Route
            path="/message"
            element={<PrivateRoute element={<Message />} />}
          />
          <Route path='/*' element={<MiddlePart />} />
              <Route path='/home/reels' element={<Reels />} />
              <Route path='/home/create-reels' element={<CreateReelForm />} />
              <Route path="/home/profile" element={<Profile />} />
          
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
