import { Task } from "../entities/task";

const TodoList = ({tasks, onToggle}: {tasks: Task[], onToggle: (id: number) => void}) =>{
   return (
    <ul>
    {tasks.map((task) => (
      <li key={task.id} onClick={() => onToggle(task.id)} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.title}
      </li>
    ))}
  </ul>
   );
}

export default TodoList