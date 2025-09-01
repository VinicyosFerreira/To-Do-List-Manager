import { HomeIcon, TasksIcon } from '../assets/icons';
import SidebarButton from './SidebarButton';

const Sidebar = () => {
   return (
      <div className="vh-100 w-72 bg-[#fff]">
         <div className="space-y-1 px-8 py-6">
            <h1 className="text-xl font-semibold text-[#00ADB5]">
               Task Manager
            </h1>
            <p>
               Um simples{' '}
               <span className="text-[#00ADB5]">organizador de tarefas</span>
            </p>
         </div>

         <div className="flex flex-col p-2">
            <SidebarButton variant="unselected">
               <HomeIcon />
               Início
            </SidebarButton>
            <SidebarButton variant="selected">
               <TasksIcon />
               Minhas Tarefas
            </SidebarButton>
         </div>
      </div>
   );
};

export default Sidebar;
