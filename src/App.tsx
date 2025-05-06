import "./App.css";
import { useState, useEffect, useCallback } from "react";
import { ButtonDarkMod } from "./components/buttons";
import { UseCases } from "./components/UseCasesTask";
import { THEME } from "./constants/constants";
import { NavLink, Routes, Route } from "react-router";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || THEME.LIGHT);
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme: string) => (prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    
    <>
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Accueil
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/todo" className={({ isActive }) => (isActive ? "active" : "")}>
            ToDo List
          </NavLink>
        </li>

      </ul>
      <ButtonDarkMod theme={theme} toggleTheme={toggleTheme} />
    </nav>
    <Routes>
      <Route path="/" element={<h1>Bienvenue sur mon application</h1>} />
      <Route path="/todo" element={<UseCases />} />
    </Routes>
    </>
  );
}

export default App;
