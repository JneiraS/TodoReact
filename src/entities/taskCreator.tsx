import { Task } from "./task";



export class TaskCreator {
    public factoryMethod(id: number, title: string): Task {
        return new Task(id, title);
    }


}