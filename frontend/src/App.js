import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddAttraction from "./pages/AddAttraction";
import AttractionDetails from "./pages/AttractionDetails";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddAttraction />} />
        <Route path="/attraction/:id" element={<AttractionDetails />} />
      </Routes>
    </div>
  );
}
