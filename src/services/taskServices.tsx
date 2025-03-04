import axios, { AxiosResponse } from "axios";

import { API } from "../constants/constants";

interface ApiResponse {
  id: number;
  title: string;
  completed: boolean
}

const GetTasks = async (): Promise<AxiosResponse<ApiResponse>> => {
  try {
     return await axios.get<ApiResponse>(API.BASE_URL.concat(API.TASKS));

  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    throw error;
  }
};

const AddTask = async (title: string): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const newTask = {
      title,
      completed: false
    };
    return await axios.post<ApiResponse>(API.BASE_URL.concat(API.TASKS), newTask);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la tâche :", error);
    throw error;
  }
};

const UpdateTaskCompleted = async (id: number, completed: boolean): Promise<AxiosResponse<ApiResponse>> => {
  try {
    return await axios.patch<ApiResponse>(`${API.BASE_URL}${API.TASKS}/${id}`, { completed });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche :", error);
    throw error;
  }
};

const DeleteTask = async (id: number): Promise<AxiosResponse<void>> => {
  try {
    return await axios.delete(`${API.BASE_URL}${API.TASKS}/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche :", error);
    throw error;
  }
};

export { GetTasks, AddTask, UpdateTaskCompleted, DeleteTask };



