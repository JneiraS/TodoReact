
export class Task {

    id: number;
    title: string;
    completed : boolean


    constructor(id: number, title: string) {
        this.id = id;
        this.title = title;
        this.completed = false
    }

    public setId(id: number) {
        this.id = id;
    }

    public setTitle(title: string) {
        this.title = title;
    }
}

