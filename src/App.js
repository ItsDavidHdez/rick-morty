import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Characters from "./components/Characters";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "App DarkMode" : "App"}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Characters darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default App;
