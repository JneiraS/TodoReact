import "./App.css";
import { useState, useEffect, useCallback } from "react";
import ButtonDarkMod from "./components/button";
import { UseCasesTask } from "./useCases/UseCasesTask";
import { THEME } from "./constants";

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
      <UseCasesTask />
    </>
  );
}

export default App;
