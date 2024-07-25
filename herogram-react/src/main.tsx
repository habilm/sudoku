import React from "react";
import ReactDOM from "react-dom/client";

import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./index.css";
import Register from "./user/Register.tsx";
import Home from "./pages/Home.tsx";
import SiteHeader from "./components/SiteHeader.tsx";
import Login from "./user/Login.tsx";
import Puzzle from "./pages/Puzzle.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SiteHeader />
      <Routes>
        <Route path="/">
          <Route element={<Home />} index />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="play">
            <Route index element={<Puzzle />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
