import { Task } from "../entities/task";
import React, { useEffect, useState } from 'react';
import { ButtonDelete } from "./buttons";
import { GetAllUsers } from "../services/taskServices";
import { User } from "../entities/user";

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
    const [users, setUsers] = useState<User[]>([]);

  // Filtre les tâches en fonction de la priorité sélectionnée
  const filteredTasks = React.useMemo(() =>
    tasks.filter(task => priorityFilter === 'all' ? true : task.priority === priorityFilter),
    [tasks, priorityFilter]
  );

  useEffect(() => {
    const fetchUsers = async () => {
        const response = await GetAllUsers();
        setUsers(response.data as unknown as User[]);
       
    };
    fetchUsers();
}, []);


  // Function to get user name by ID
  const getUserNameById = (userId: number | undefined): string => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : `User ${userId}`;
  };


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
              marginBottom: '4px',
              backgroundColor: 'rgba(128, 128, 128, 0.05)',
            }}
          >
            {task.title}

            
            <div className="infos">
            {getUserNameById(task.assigned_to)}
              <p className={String(task.priority)}>{task.priority.toString()}</p>
              <ButtonDelete onDelete={() => onDelete(task.id)} />
            </div>
          </li>
        ))}          </ul>    </div>
  );
});

export default TodoList