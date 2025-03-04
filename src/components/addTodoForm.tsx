import React, {useState} from "react";

interface TaskListProps {
    onAddTask: (task: string, priority: string) => void;
}

/**
 * Un composant React qui affiche un formulaire pour ajouter une nouvelle tâche.
 */
const AddTodoForm: React.FC<TaskListProps> = ({ onAddTask }) => {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("basse");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() === "") return;
        onAddTask(title, priority);
        setTitle("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ajouter une tâche"
            />

            <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="basse">Priorité Basse</option>  
                <option value="moyenne">Priorité Moyenne</option>
                <option value="haute">Priorité Haute</option>         
                </select>
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTodoForm;

