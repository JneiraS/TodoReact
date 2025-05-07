import React, {useEffect, useState} from "react";
import { GetAllUsers } from "../services/taskServices";
import { User } from "../entities/user";

interface TaskListProps {
    onAddTask: (task: string, priority: string, userId?: number) => void;
}

/**
 * Un composant React qui affiche un formulaire pour ajouter une nouvelle tâche.
 */
const AddTodoForm: React.FC<TaskListProps> = ({ onAddTask }) => {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("basse");
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<number | undefined>(undefined);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() === "") return;
        onAddTask(title, priority, selectedUserId);
        setTitle("");
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await GetAllUsers();
            setUsers(response.data);
           
        };
        fetchUsers();
    }, []);

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

            {/* Replace the nested select with a direct user selection */}
            <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(Number(e.target.value) || undefined)}
            >
                <option value="">Sélectionner un utilisateur</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>

            <button type="submit">Add</button>
        </form>
    );
};export default AddTodoForm;
