import axios, { AxiosResponse } from "axios";
import { API } from "../constants/constants";
import { Task } from "../entities/task";

// Configuration globale d'Axios
axios.defaults.baseURL = API.BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

interface ApiResponse {
  message: string;
  task: {
    id: number;
    title: string;
    priority: number;
    assigned_to: number;
    completed: boolean;
  }
}
/**
/** Récupère de manière asynchrone une liste de tâches depuis l'API. */
const GetTasks = async (): Promise<AxiosResponse<ApiResponse>> => {
  try {
     return await axios.get<ApiResponse>(API.TASKS);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    throw error;
  }
};

/**
 * Ajoute une nouvelle tâche de manière asynchrone.
 */
const AddTask = async (title: string, priority: number,assigned_to:number | undefined): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const newTask = {
      id:0,
      title:title,
      priority,
      completed: false,
      assigned_to: assigned_to,
    };
    return await axios.post<ApiResponse>(API.TASKS, newTask);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la tâche :", error);
    throw error;
  }
};

/**
 * Mets à jour le statut de complétion d'une tâche de manière asynchrone.
 */
const UpdateTaskCompleted = async (task: Task): Promise<AxiosResponse<ApiResponse>> => {
  try {
    // Priorité en nombre
    const priorityMap: Record<string, number> = {
      'basse': 1,
      'moyenne': 2,
      'haute': 3
    };
    
    // Conversion de la priorité en nombre
    const priorityValue = typeof task.priority === 'string' 
      ? priorityMap[task.priority] || task.priority 
      : task.priority;
    
    // Send the task data in the format expected by the API
    return await axios.put<ApiResponse>(`${API.TASKS}/${task.id}`, {
      id: task.id,
      title: task.title,
      priority: priorityValue,
      assigned_to: task.assigned_to,
      completed: task.completed
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche :", error);
    throw error;
  }
};



/**
* Supprime une tâche de manière asynchrone.
 */
const DeleteTask = async (id: number): Promise<AxiosResponse<void>> => {
  try {
    return await axios.delete(`${API.TASKS}/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche :", error);
    throw error;
  }
};


const GetAllUsers = async (): Promise<AxiosResponse<ApiResponse>> => {
  try {
    return await axios.get<ApiResponse>(API.USERS);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    throw error;
  }
};

export { GetTasks, AddTask, UpdateTaskCompleted, DeleteTask, GetAllUsers };
