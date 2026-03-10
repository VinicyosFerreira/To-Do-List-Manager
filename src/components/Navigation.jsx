import { HomeIcon, TasksIcon } from '../assets/icons';
import MenuMobile from './MenuMobile';
import NavButton from './NavButton';
import Title from './Title';

const Navigation = () => {
   return (
      <>
         <div className="hidden min-h-screen w-72 bg-brand-white md:block">
            <Title />
            <div className="flex flex-col p-2">
               <NavButton to="/">
                  <HomeIcon />
                  Início
               </NavButton>
               <NavButton to="/tasks">
                  <TasksIcon />
                  Minhas Tarefas
               </NavButton>
            </div>
         </div>
         <div className="md:hidden">
            <MenuMobile />
         </div>
      </>
   );
};

export default Navigation;
