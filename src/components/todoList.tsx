import { Task } from "../entities/task";
import React from 'react';
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
  return (
    <ul>
      {tasks.map((task) => (
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
            <ButtonDelete onDelete={() => onDelete(task.id)}/>
          </div> 
        </li>
      ))}    
    </ul>
  );
});

export default TodoList