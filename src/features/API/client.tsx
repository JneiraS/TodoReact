import axios, { AxiosResponse } from "axios";

interface ApiResponse {
  id: number;
  title: string;
  completed: boolean
}

const GetTasks = async (): Promise<AxiosResponse<ApiResponse>> => {
  try {
     return await axios.get<ApiResponse>("http://localhost:5000/tasks");

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
    return await axios.post<ApiResponse>("http://localhost:5000/tasks", newTask);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la tâche :", error);
    throw error;
  }
};

export { GetTasks, AddTask };


