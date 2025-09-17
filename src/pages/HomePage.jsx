import {
   GlassWaterIcon,
   LayoutListIcon,
   LoaderIcon,
   TasksIcon,
} from '../assets/icons';
import DashboardCard from '../components/DashboardCard';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useGetTasks } from '../hooks/data/use-get-tasks';

const HomePage = () => {
   const { data: tasks } = useGetTasks();

   const inProgressTasks = tasks?.filter((task) => {
      task.status === 'not_started';
   }).length;

   const inDoneTasks = tasks?.filter((task) => {
      task.status === 'done';
   }).length;

   return (
      <div className="flex">
         <Sidebar />
         <div className="w-full space-y-6 px-8 py-16">
            <Header subtitle="Início" title="Início" />
            <div className="grid grid-cols-4 gap-9">
               <DashboardCard
                  icon={<LayoutListIcon />}
                  mainText={tasks?.length}
                  secondaryText="Tarefas disponíveis"
               />
               <DashboardCard
                  icon={<TasksIcon />}
                  mainText={inDoneTasks}
                  secondaryText="Tarefas concluídas"
               />
               <DashboardCard
                  icon={<LoaderIcon />}
                  mainText={inProgressTasks}
                  secondaryText="Tarefas em andamento"
               />
               <DashboardCard
                  icon={<GlassWaterIcon />}
                  mainText="40%"
                  secondaryText="Água"
               />
            </div>
         </div>
      </div>
   );
};

export default HomePage;
