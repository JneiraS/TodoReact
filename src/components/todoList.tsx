import { Task } from "../entities/task";



const TodoList = ({tasks}: {tasks: Task[]}) =>{
   return (
    <ul>
    {tasks.map((task) => (
      <li key={task.id}>
        {task.title}
      </li>
    ))}
  </ul>
   );
}

export default TodoList