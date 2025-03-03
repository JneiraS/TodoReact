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

export default GetTasks;