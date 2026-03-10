import { LayoutListIcon, LoaderIcon, TasksIcon } from '../assets/icons';
import { useGetTasks } from '../hooks/data/use-get-tasks';
import DashboardCard from './DashboardCard';

const DashboardCards = () => {
   const { data: tasks } = useGetTasks();

   const notStartedTasks = tasks?.filter((task) => {
      return task.status === 'not_started';
   }).length;

   const inProgressTasks = tasks?.filter((task) => {
      return task.status === 'in_progress';
   }).length;

   const inDoneTasks = tasks?.filter((task) => {
      return task.status === 'done';
   }).length;

   return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-9">
         <DashboardCard
            icon={<LayoutListIcon />}
            mainText={tasks?.length}
            secondaryText="Tarefas disponíveis"
         />

         <DashboardCard
            mainText={notStartedTasks}
            secondaryText="Tarefas não iniciadas"
            icon={<LoaderIcon />}
         />
         <DashboardCard
            icon={<LoaderIcon />}
            mainText={inProgressTasks}
            secondaryText="Tarefas em andamento"
         />
         <DashboardCard
            icon={<TasksIcon />}
            mainText={inDoneTasks}
            secondaryText="Tarefas concluídas"
         />
      </div>
   );
};

export default DashboardCards;
