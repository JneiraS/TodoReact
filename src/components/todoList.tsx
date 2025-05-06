import { Task } from "../entities/task";
import React, { useState } from 'react';
import { ButtonDelete } from "./buttons";

const TodoList = React.memo(({
  tasks, 
  onToggle,
  onDelete
}: {
  tasks: Task[], 
  onToggle: (id: number) => void,
  onDelete: (id: number) => void
}) => {
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Filtre les tâches en fonction de la priorité sélectionnée
  const filteredTasks = React.useMemo(() => 
    tasks.filter(task => priorityFilter === 'all' ? true : task.priority === priorityFilter),
    [tasks, priorityFilter]
  );

  return (
    <div>
      <div className="filter-buttons">
        <button onClick={() => setPriorityFilter('all')}>Toutes</button>
        <button onClick={() => setPriorityFilter('basse')}>Basse</button>
        <button onClick={() => setPriorityFilter('moyenne')}>Moyenne</button>
        <button onClick={() => setPriorityFilter('haute')}>Haute</button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li 
            key={task.id} 
            onClick={() => onToggle(task.id)} 
            style={{ 
              textDecoration: task.completed ? 'line-through' : 'none', 
              opacity: task.completed ? 0.5 : 1,
              cursor: 'pointer',
              padding: '8px',
              marginBottom: '4px'
            }}
          >   
            {task.title}
            <div className="infos"> 
              <p className={String(task.priority)}>{task.priority.toString()}</p>
              <ButtonDelete onDelete={() => onDelete(task.id)}/>
            </div> 
          </li>
        ))}          </ul>    </div>
  );
});

export default TodoList