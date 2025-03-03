import "./App.css";
import { useState, useEffect } from "react";
import { TaskCreator } from "./entities/taskCreator";
import { Task } from "./entities/task";
import ButtonDarkMod from "./components/button";
import TodoList from "./components/todoList";
import AddTodoForm from "./components/addTodoForm";
import { GetTasks, AddTask } from "./features/API/client";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fonction pour basculer de mode
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Ajouter la fonction onToggle
  const handleToggle = (id: number) => {
    setTasks((prevTasks) => prevTasks.map(task => {
      if (task.id === id) {
        const updatedTask = new TaskCreator().factoryMethod(task.id, task.title);
        updatedTask.completed = !task.completed;
        return updatedTask;
      }
      return task;
    }));
  };

  const convertApiData = (apiData: { id: string; title: string; completed: boolean }[]) => {
    return apiData.map(item => {
      const task = new TaskCreator().factoryMethod(Number(item.id), item.title);
      task.completed = item.completed;
      return task;
    });
  };

  // const apiMock = [
  //   { id: 1, title: "Apprendre React" },
  //   { id: 2, title: "Créer une Todo List" },
  //   { id: 3, title: "Boire un café" },
  // ];

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
      <AddTodoForm
        onAddTask={async (task: string) => {
          try {
            const response = await AddTask(task);
            const newTask = new TaskCreator().factoryMethod(
              response.data.id,
              response.data.title
            );
            setTasks([...tasks, newTask]);
          } catch (error) {
            console.error("Erreur lors de l'ajout de la tâche:", error);
          }
        }}
      />
      <div>
        <h1>ToDo List</h1>
        <TodoList tasks={tasks} onToggle={handleToggle} />
      </div>
    </>
  );
}
export default App;
