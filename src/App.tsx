import "./App.css";
import { useState, useEffect } from "react";
import { TaskCreator } from "./entities/taskCreator";
import { Task } from "./entities/task";
import ButtonDarkMod from "./components/button";
import { GetTasks } from "./features/API/client";
import { UseCasesTask } from "./useCases/UseCasesTask";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [tasks, setTasks] = useState<Task[]>([]);
  // Fonction pour basculer de mode
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };



  const convertApiData = (apiData: { id: string; title: string; completed: boolean }[]) => {
    return apiData.map(item => {
      const task = new TaskCreator().factoryMethod(Number(item.id), item.title);
      task.completed = item.completed;
      return task;
    });
  };


  // Appliquer le thème au chargement
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetTasks();
        if (Array.isArray(response.data)) {
          const convertedData = convertApiData(response.data);
          setTasks(convertedData);
        } else {
          const initialTasks: Task[] = [];
          if (Array.isArray(response.data)) {
            response.data.forEach((item: { id: number; title: string }) => {
              const task = new TaskCreator().factoryMethod(item.id, item.title);
              initialTasks.push(task);
            });
          }
          setTasks(initialTasks);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données : ", error);
      } finally {
        fetchData();
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <ButtonDarkMod theme={theme} toggleTheme={toggleTheme} />
      </div>
      <div>
      <UseCasesTask />
     
      </div>
    </>
  );
}
export default App;
