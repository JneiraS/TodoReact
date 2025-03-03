
import './App.css'
import { useState, useEffect } from "react";
import { TaskCreator } from './entities/taskCreator'
import { Task } from './entities/task'
import ButtonDarkMod from './components/button'
import TodoList from './components/todoList'
import AddTodoForm from './components/addTodoForm'

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [tasks, setTasks] = useState<Task[]>([]);

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
  
  // Charger les tâches
  useEffect(() => {
    const initialTasks: Task[] = [];
    apiMock.forEach((item: { id: number, title: string }) => {
      const task = new TaskCreator().factoryMethod(item.id, item.title);
      initialTasks.push(task);
    });
    setTasks(initialTasks);
  }, []);

  return (
    <>
      <div>
        <h1>Bienvenue sur mon App</h1>
        <ButtonDarkMod theme={theme} toggleTheme={toggleTheme} />
      </div>
      <AddTodoForm onAddTask={(task: string) => {
        const newTask = new TaskCreator().factoryMethod(tasks.length + 1, task) 
        setTasks([...tasks, newTask])
      }} />
      <div>
        <h1>ToDo List</h1>
        <TodoList tasks={tasks}/>
      </div>
    </>
  )
}export default App
