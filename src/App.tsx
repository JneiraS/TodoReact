
import './App.css'
import { useState, useEffect } from "react";
import { TaskCreator } from './entities/taskCreator'
import { Task } from './entities/task'
import ButtonDarkMod from './components/button'
import TodoList from './components/todoList'

function App() {

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const tasks: Task[] = []
  // Fonction pour basculer le mode
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const apiMock = [
    { id: 1, title: "Apprendre React" },
    { id: 2, title: "Créer une Todo List" },
    { id: 3, title: "Boire un café" }
  ]

  
  // Appliquer le thème au chargement
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);


  apiMock?.forEach((item: { id: number, title: string }) => {
    const task = new TaskCreator().factoryMethod(item.id, item.title)
    tasks.push(task)
  })

  return (
    <>
      <div>
        <h1>Bienvenue sur mon App</h1>
        <ButtonDarkMod theme={theme} toggleTheme={toggleTheme} />
      </div>
      <div>
        <h1>ToDo List</h1>
        <TodoList tasks={tasks}/>
      </div>
    </>
  )
}
export default App
