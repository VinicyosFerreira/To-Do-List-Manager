import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TaskDetailsPage = () => {
   const { id: taskId } = useParams();
   const [tasks, setTasks] = useState();
   console.log(taskId);

   useEffect(() => {
      const fetchTasks = async () => {
         try {
            const response = await fetch(
               `http://localhost:3000/tasks/${taskId}`
            );
            const data = await response.json();
            setTasks(data);
            console.log(data);
         } catch (error) {
            console.log(error);
         }
      };
      fetchTasks();
   }, [taskId]);

   return (
      <div>
         <h1>Detalhes da Tarefa</h1>
         <p>{tasks?.title}</p>
         <p>{tasks?.description}</p>
      </div>
   );
};

export default TaskDetailsPage;
