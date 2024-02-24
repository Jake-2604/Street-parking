// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FeaturePage from "./pages/FeaturePage";
import "./App.css"; // Make sure to adjust styling as needed
import { ThemeProvider } from "./themeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
