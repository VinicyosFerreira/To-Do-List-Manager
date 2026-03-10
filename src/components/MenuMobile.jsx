import { HomeIcon, TasksIcon } from '../assets/icons';
import NavButton from './NavButton';
import Title from './Title';
const MenuBottomMobile = () => {
   return (
      <>
         <Title />
         <div className="fixed bottom-0 z-10 flex w-full justify-center rounded-lg bg-brand-white p-3 shadow-lg">
            <NavButton to="/">
               <HomeIcon />
               Início
            </NavButton>
            <NavButton to="/tasks">
               <TasksIcon />
               Minhas Tarefas
            </NavButton>
         </div>
      </>
   );
};

export default MenuBottomMobile;
