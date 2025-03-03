
import './App.css'
import { TaskCreator } from './entities/taskCreator'
import { Task } from './entities/task'

function App() {

  const apiMock =[
    {id:1, title: "Apprendre React"},
    {id:2, title: "Créer une Todo List"},
    {id:3, title: "Boire un café"}
  ]

  // const newTask = new TaskCreator().factoryMethod()
  //newTask.setId(15);
  //newTask.setTitle("Apprender React")
  
  const tasks: Task[] = []
  // Correction de la boucle pour créer les tâches
  apiMock?.forEach((item: { id: number, title: string }) => {
    const task = new TaskCreator().factoryMethod(item.id, item.title)

    tasks.push(task)
  })
  
  return (
    <>
      <div>
        <h1>ToDo List</h1> 
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
export default App
