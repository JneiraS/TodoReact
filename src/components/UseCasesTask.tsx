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

            console.log(item.priority);

          if (item.priority == 1) {
              task.priority = "basse";
            } else if (item.priority == 2) {
              task.priority = "moyenne";
            } else if (item.priority == 3) {
              task.priority = "haute";
            }

            
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

  const handleAddTask = async (task: string, priority: string) => {
    try {
      const priorityNumber = priority === "basse" ? 1 : priority === "moyenne" ? 2 : 3;
      const response = await AddTask(task, priorityNumber);
      

      if (response.status === 200) {
        // Utiliser les données de la tâche renvoyées par l'API
        const taskData = response.data.task;
        
        console.log("Données de la tâche renvoyées par l'API :");

        // Créer un nouvel objet Task avec les données renvoyées
        const newTask = new TaskCreator().factoryMethod(
          taskData.id,
          taskData.title
        );
        
        // Définir la priorité en format texte
        if (taskData.priority === 1) {
          newTask.priority = "basse";
        } else if (taskData.priority === 2) {
          newTask.priority = "moyenne";
        } else if (taskData.priority === 3) {
          newTask.priority = "haute";
        }
        
        newTask.completed = taskData.completed;

        // Mettre à jour l'état avec la nouvelle tâche
        setTasks(prevTasks => [...prevTasks, newTask]);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche:", error);
    }
  };
  
  
  
  const handleToggle = (id: number) => {
    setTasks((prevTasks) => prevTasks.map(task => {
      if (task.id === id) {
        const updatedTask = new TaskCreator().factoryMethod(task.id, task.title);
        updatedTask.completed = !task.completed;
        updatedTask.priority = task.priority;
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
    <div className="todo_container">
      <AddTodoForm onAddTask={handleAddTask} />
      <h2>Mes Tâches</h2>
      <TodoList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}export default UseCases;