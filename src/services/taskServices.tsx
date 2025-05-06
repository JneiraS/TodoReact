import axios, { AxiosResponse } from "axios";
import { API } from "../constants/constants";

// Configuration globale d'Axios
axios.defaults.baseURL = API.BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

interface ApiResponse {
  id: number;
  title: string;
  completed: boolean
  assigned_to:number

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
const AddTask = async (title: string, priority: number): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const newTask = {
      id:0,
      title:title,
      priority,
      completed: false,
      assigned_to: 1,
    };

    console.log(newTask);
    return await axios.post<ApiResponse>(API.TASKS, newTask);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la tâche :", error);
    throw error;
  }
};

/**
 * Mets à jour le statut de complétion d'une tâche de manière asynchrone.
 */
const UpdateTaskCompleted = async (id: number, completed: boolean): Promise<AxiosResponse<ApiResponse>> => {
  try {
    return await axios.patch<ApiResponse>(`${API.TASKS}/${id}`, { completed });
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

export { GetTasks, AddTask, UpdateTaskCompleted, DeleteTask };
