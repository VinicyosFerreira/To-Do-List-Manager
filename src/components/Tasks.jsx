import { useState } from 'react';
import { toast } from 'sonner';

import {
   AddIcon,
   CloudSunIcon,
   MoonIcon,
   SunIcon,
   TrashIcon,
} from '../assets/icons';
import TasksSeparator from '../components/TasksSeparator';
import TASKS from '../constant/tasks';
import AddTaskDialog from './AddTaskDialog';
import Button from './Button';
import TaskItem from './TaskItem';

const Tasks = () => {
   const [tasks, setTasks] = useState(TASKS);
   const [isOpenDialog, setIsOpenDialog] = useState(false);

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

   const handleTaskDeleteClick = (taskId) => {
      const newTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(newTasks);
      toast.success('Tarefa excluida com sucesso!');
   };

   const handleAddTasks = (newTask) => {
      console.log(newTask);
      console.log(tasks);
      setTasks([...tasks, newTask]);
   };

   return (
      <div className="w-full space-y-6 px-8 py-16">
         <div className="flex w-full justify-between">
            <div>
               <span className="text-xs font-semibold text-[#00ADB5]">
                  Minhas tarefas
               </span>
               <h2 className="text-xl font-semibold text-[#35383E]">
                  Minhas tarefas
               </h2>
            </div>

            <div className="flex h-min items-center gap-3">
               <Button variant="ghost">
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
