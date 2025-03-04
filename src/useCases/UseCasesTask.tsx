import { useState, useEffect } from "react";
import { TaskCreator } from "../entities/taskCreator";
import { AddTask, GetTasks, UpdateTaskCompleted } from "../services/taskServices";
import { Task } from "../entities/task";
import TodoList from "../components/todoList";
import AddTodoForm from "../components/addTodoForm";

export function UseCasesTask() {
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

  return (
    <div>
      <AddTodoForm onAddTask={handleAddTask} />
      <h2>Mes Tâches</h2>
      <TodoList tasks={tasks} onToggle={handleToggle}  />
    </div>
  );
}
// Exportez le composant au lieu de handleToggle
export default UseCasesTask;