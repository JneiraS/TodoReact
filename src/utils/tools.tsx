import { TaskCreator } from "../entities/taskCreator";


/* Convertit les données API en un tableau d'instances de `TaskCreator`.*/
const convertApiData = (apiData: { id: string; title: string; completed: boolean }[]) => {
    return apiData.map(item => {
      const task = new TaskCreator().factoryMethod(Number(item.id), item.title);
      task.completed = item.completed;
      return task;
    });
  };

  export { convertApiData };