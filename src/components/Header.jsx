import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import "./Header.css";

const Header = ({ darkMode, setDarkMode }) => {
  let color = useContext(ThemeContext);

  const handleClick = () => {
    setDarkMode(!darkMode);
  };

  const handleColor = () => {
    if (!darkMode) {
      return color;
    } else {
      return (color = "white");
    }
  };

  return (
    <div className="Header">
      <h1 className="H1" style={{ color: `${handleColor()}` }}>
        Reacthooks
      </h1>
      <button
        type="button"
        className={!darkMode ? "btn btn-dark" : "btn btn-light"}
        onClick={() => handleClick()}
      >
        {!darkMode ? "Darkmode" : "Lightmode"}
      </button>
    </div>
  );
};

export default Header;
