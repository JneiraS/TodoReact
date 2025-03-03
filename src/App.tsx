
import './App.css'
import { useState, useEffect } from "react";
import { TaskCreator } from './entities/taskCreator'
import { Task } from './entities/task'

function App() {


  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Appliquer le thème au chargement
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Fonction pour basculer le mode
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const apiMock =[
    {id:1, title: "Apprendre React"},
    {id:2, title: "Créer une Todo List"},
    {id:3, title: "Boire un café"}
  ]
  
  const tasks: Task[] = []

  apiMock?.forEach((item: { id: number, title: string }) => {
    const task = new TaskCreator().factoryMethod(item.id, item.title)
    tasks.push(task)
  })
  
  return (
    <>
        <div>
      <h1>Bienvenue sur mon App</h1>
      <button className="theme-switch" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Mode sombre" : "☀️ Mode clair"}
      </button>
    </div>
      <div>
        <h1>ToDo List</h1> 
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
export default App
