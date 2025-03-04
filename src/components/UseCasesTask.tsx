import { useState, useEffect } from "react";
import { TaskCreator } from "../entities/taskCreator";
import { AddTask, GetTasks, UpdateTaskCompleted, DeleteTask } from "../services/taskServices";
import { Task } from "../entities/task";
import TodoList from "./todoList";
import AddTodoForm from "./addTodoForm";


// Le composant `UseCases` gère les tâches : récupération, ajout, 
// modification et suppression, en utilisant les services et entités 
// appropriés.
export function UseCases() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchData = async () => {
    try {
      const response = await GetTasks();
      const tasks = Array.isArray(response.data) 
        ? response.data.map(item => {
            const task = new TaskCreator().factoryMethod(item.id, item.title);
            task.completed = item.completed;
            return task;
          })
        : [];
      setTasks(tasks);
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTask = async (task: string) => {
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
  };

  const handleToggle = (id: number) => {
    setTasks((prevTasks) => prevTasks.map(task => {
      if (task.id === id) {
        const updatedTask = new TaskCreator().factoryMethod(task.id, task.title);
        updatedTask.completed = !task.completed;
        UpdateTaskCompleted(task.id, updatedTask.completed);
        return updatedTask;
      }
      return task;
    }));
  };

  const handleDelete = async (id: number) => {
    try {
      await DeleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche:", error);
    }
  };

  return (
    <div>
      <AddTodoForm onAddTask={handleAddTask} />
      <h2>Mes Tâches</h2>
      <TodoList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}// Exportez le composant au lieu de handleToggle
export default UseCases;