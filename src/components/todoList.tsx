import { Task } from "../entities/task";

const TodoList = ({tasks, onToggle}: {tasks: Task[], onToggle: (id: number) => void}) =>{
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
        </li>
      ))}
    </ul>
   );
}

export default TodoList