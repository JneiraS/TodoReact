import { Task } from "./task";
import { Product } from "../interfaces/iTask";

abstract class Creator {

    public abstract factoryMethod(): Product
}

export class TaskCreator extends Creator {
    public factoryMethod(): Product {
        return new Task(0, "");
    }

    /**
     * setId
     */

}