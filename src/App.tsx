import "./App.css";
import { useState, useEffect, useCallback } from "react";
import { ButtonDarkMod } from "./components/buttons";
import { UseCases } from "./components/UseCasesTask";
import { THEME } from "./constants/constants";

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
      <ButtonDarkMod theme={theme} toggleTheme={toggleTheme} />
      <UseCases />
    </>
  );
}

export default App;
