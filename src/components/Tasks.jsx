import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { CloudSunIcon, MoonIcon, SunIcon } from '../assets/icons';
import TasksSeparator from '../components/TasksSeparator';
import { useGetTasks } from '../hooks/data/use-get-tasks';
import { taskQueryKeys } from '../keys/queries';
import Header from './Header';
import TaskItem from './TaskItem';

const Tasks = () => {
   const queryClient = useQueryClient();
   const { data: tasks } = useGetTasks();

   const morningTasks = tasks?.filter((task) => task.period === 'morning');
   const afternoonTasks = tasks?.filter((task) => task.period === 'afternoon');
   const eveningTasks = tasks?.filter((task) => task.period === 'evening');

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

      queryClient.setQueryData(taskQueryKeys.getAll(), newTasks);
   };

   return (
      <div className="w-full space-y-6 px-8 py-16">
         <Header subtitle="Minhas tarefas" title="Minhas tarefas" />

         {/* <TaskList /> */}
         <div className="rounded-xl bg-white p-6">
            {/* MANHÃ */}
            <div className="space-y-3">
               <TasksSeparator title="Manhã" icon={<SunIcon />} />
               {morningTasks?.length === 0 && (
                  <p className="text-sm text-brand-text-gray">
                     Nenhuma tarefa cadastrada para o período da manhã
                  </p>
               )}
               {morningTasks?.map((task) => (
                  <TaskItem
                     task={task}
                     key={task.id}
                     handleCheckboxChange={() =>
                        handleTaskCheckboxChange(task.id)
                     }
                  />
               ))}
            </div>

            {/* TARDE */}
            <div className="my-6 space-y-3">
               <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />
               {afternoonTasks?.length === 0 && (
                  <p className="text-sm text-brand-text-gray">
                     Nenhuma tarefa cadastrada para o período da tarde
                  </p>
               )}
               {afternoonTasks?.map((task) => (
                  <TaskItem
                     task={task}
                     key={task.id}
                     handleCheckboxChange={() =>
                        handleTaskCheckboxChange(task.id)
                     }
                  />
               ))}
            </div>

            {/* NOITE */}
            <div className="space-y-3">
               <TasksSeparator title="Noite" icon={<MoonIcon />} />
               {eveningTasks?.length === 0 && (
                  <p className="text-sm text-brand-text-gray">
                     Nenhuma tarefa cadastrada para o período da noite
                  </p>
               )}
               {eveningTasks?.map((task) => (
                  <TaskItem
                     task={task}
                     key={task.id}
                     handleCheckboxChange={() =>
                        handleTaskCheckboxChange(task.id)
                     }
                  />
               ))}
            </div>
         </div>
      </div>
   );
};

export default Tasks;
