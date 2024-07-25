import { useEffect, useState } from "react";

import { Route, BrowserRouter, Routes } from "react-router-dom";
import Register from "./user/Register.tsx";
import Home from "./pages/Home.tsx";
import SiteHeader from "./components/SiteHeader.tsx";
import Login from "./user/Login.tsx";
import Puzzle from "./pages/Puzzle.tsx";
import { CurrentUser, TypeCurrentUser } from "./context.ts";
import { WithAuth, WithOutAuth } from "./user/WithAuth.tsx";

function App() {
  const [currentUser, _setCurrentUser] = useState({});

  function setCurrentUser(user: TypeCurrentUser) {
    window.localStorage.setItem("_u", JSON.stringify(user));
    _setCurrentUser(user);
  }
  function logOut() {
    window.localStorage.removeItem("_u");
    _setCurrentUser({});
  }
  useEffect(() => {
    const a = JSON.parse(window.localStorage.getItem("_u") || "[]");

    _setCurrentUser(a);
  }, []);

  return (
    <CurrentUser.Provider value={{ currentUser, setCurrentUser, logOut }}>
      <BrowserRouter>
        <SiteHeader />
        <Routes>
          <Route path="/">
            <Route element={<Home />} index />
            <Route
              path="/register"
              element={<WithOutAuth element={<Register />} />}
            />
            <Route
              path="/login"
              element={<WithOutAuth element={<Login />} />}
            />
            <Route path="play">
              <Route index element={<WithAuth element={<Puzzle />} />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </CurrentUser.Provider>
  );
}

export default App;
