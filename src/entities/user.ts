export class User {
    id: number;
    name: string;
    assigned_tasks: Number[];



    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.assigned_tasks = [];
    }



}

