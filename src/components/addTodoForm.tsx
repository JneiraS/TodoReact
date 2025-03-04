import React, {useState} from "react";

interface TaskListProps {
    onAddTask: (task: string) => void;
  }
  
  /**
   * Un composant React qui affiche un formulaire pour ajouter une nouvelle tâche.
   */
  const AddTodoForm: React.FC<TaskListProps> = ({ onAddTask }) => {
    const [title, setTitle] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (title.trim() === "") return;
      onAddTask(title);
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
        <button type="submit">Add</button>
      </form>
    );
  };

export default AddTodoForm;

