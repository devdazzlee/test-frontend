import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterList from "./components/CharacterList";
import AddEditCharacter from "./components/AddEditCharacter";
import CharacterDetail from "./components/CharacterDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/add" element={<AddEditCharacter />} />
        <Route path="/edit/:id" element={<AddEditCharacter />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
