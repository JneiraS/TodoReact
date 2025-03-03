
export class Task {

    id: number;
    title: string;

    constructor(id: number, title: string) {
        this.id = id;
        this.title = title;
    }

    public setId(id: number) {
        this.id = id;
    }

    public setTitle(title: string) {
        this.title = title;
    }
}

