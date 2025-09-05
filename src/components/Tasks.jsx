import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
   AddIcon,
   CloudSunIcon,
   MoonIcon,
   SunIcon,
   TrashIcon,
} from '../assets/icons';
import TasksSeparator from '../components/TasksSeparator';
import AddTaskDialog from './AddTaskDialog';
import Button from './Button';
import TaskItem from './TaskItem';

const Tasks = () => {
   const [tasks, setTasks] = useState([]);
   const [isOpenDialog, setIsOpenDialog] = useState(false);

   useEffect(() => {
      const fetchTasks = async () => {
         try {
            const response = await fetch('http://localhost:3000/tasks');
            const data = await response.json();
            setTasks(data);
         } catch (error) {
            console.log(error);
         }
      };
      fetchTasks();
   }, []);

   const morningTasks = tasks.filter((task) => task.period === 'morning');
   const afternoonTasks = tasks.filter((task) => task.period === 'afternoon');
   const eveningTasks = tasks.filter((task) => task.period === 'evening');

   const handleTaskCheckboxChange = (taskId) => {
      const newTasks = tasks.map((task) => {
         if (task.id !== taskId) {
            return task;
         }

         if (task.status === 'not_started') {
            toast.success('Tarefa iniciada com sucesso!');
            return { ...task, status: 'in_progress' };
         }

         if (task.status === 'in_progress') {
            toast.success('Tarefa concluida com sucesso!');
            return { ...task, status: 'done' };
         }

         if (task.status === 'done') {
            toast.success('Tarefa reiniciada com sucesso!');
            return { ...task, status: 'not_started' };
         }

         return task;
      });
      setTasks(newTasks);
   };

   const handleTaskDeleteClick = async (taskId) => {
      try {
         const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'DELETE',
         });
         if (!response.ok) {
            throw new Error('Erro ao deletar tarefa');
         }
      } catch (error) {
         toast.error('Erro ao deletar tarefa');
         console.log(error);
      }
      const newTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(newTasks);
      toast.success('Tarefa excluida com sucesso!');
   };
   const handleAddTasks = async (newTask) => {
      try {
         const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
         });

         if (!response.ok) {
            throw new Error('Erro ao criar tarefa. Tente novamente');
         }

         toast.success('Tarefa criada com sucesso!');
         setTasks([...tasks, newTask]);
      } catch (error) {
         toast.error('Erro ao criar tarefa');
         console.log(error);
      }
   };

   return (
      <div className="w-full space-y-6 px-8 py-16">
         <div className="flex w-full justify-between">
            <div>
               <span className="text-xs font-semibold text-brand-primary">
                  Minhas tarefas
               </span>
               <h2 className="text-xl font-semibold text-brand-dark-blue">
                  Minhas tarefas
               </h2>
            </div>

            <div className="flex h-min items-center gap-3">
               <Button color="ghost">
                  Limpar Tarefas
                  <TrashIcon />
               </Button>

               <Button onClick={() => setIsOpenDialog(true)}>
                  Nova Tarefa
                  <AddIcon />
               </Button>

               <AddTaskDialog
                  isOpen={isOpenDialog}
                  handleCloseDialog={() => setIsOpenDialog(false)}
                  handleSubmit={handleAddTasks}
               />
            </div>
         </div>

         {/* <TaskList /> */}
         <div className="rounded-xl bg-white p-6">
            {/* MANHÃ */}
            <div className="space-y-3">
               <TasksSeparator title="Manhã" icon={<SunIcon />} />
               {morningTasks.map((task) => (
                  <TaskItem
                     task={task}
                     key={task.id}
                     handleCheckboxChange={() =>
                        handleTaskCheckboxChange(task.id)
                     }
                     handleDeleteClick={() => handleTaskDeleteClick(task.id)}
                  />
               ))}
            </div>

            {/* TARDE */}
            <div className="my-6 space-y-3">
               <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />
               {afternoonTasks.map((task) => (
                  <TaskItem
                     task={task}
                     key={task.id}
                     handleCheckboxChange={() =>
                        handleTaskCheckboxChange(task.id)
                     }
                     handleDeleteClick={() => handleTaskDeleteClick(task.id)}
                  />
               ))}
            </div>

            {/* NOITE */}
            <div className="space-y-3">
               <TasksSeparator title="Noite" icon={<MoonIcon />} />
               {eveningTasks.map((task) => (
                  <TaskItem
                     task={task}
                     key={task.id}
                     handleCheckboxChange={() =>
                        handleTaskCheckboxChange(task.id)
                     }
                     handleDeleteClick={() => handleTaskDeleteClick(task.id)}
                  />
               ))}
            </div>
         </div>
      </div>
   );
};

export default Tasks;
