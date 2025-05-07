
export class Task {

    id: number;
    title: string;
    priority: string|Number;
    completed : boolean;
    assigned_to : number | undefined
    


    constructor(id: number, title: string) {
        this.id = id;
        this.title = title;
        this.priority = "basse"
        this.completed = false
        this.assigned_to = 0
    }

    public setId(id: number) {
        this.id = id;
    }

    public setTitle(title: string) {
        this.title = title;
    }
}

