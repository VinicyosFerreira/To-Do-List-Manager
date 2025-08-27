import Button from './Button';
import AddIcon from '../assets/icons/addIcon.svg?react';
import TrashIcon from '../assets/icons/trashIcon.svg?react';
import SunIcon from '../assets/icons/sun.svg?react';
import CloudSunIcon from '../assets/icons/cloud-sun.svg?react';
import MoonIcon from '../assets/icons/moon.svg?react';
import TasksSeparator from './TasksSeparator';

const Tasks = () => {
   return (
      <div className="w-full px-8 py-16">
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

               <Button variant="primary">
                  Nova Tarefa
                  <AddIcon />
               </Button>
            </div>
         </div>

         {/* <TaskList /> */}
         <div className="rounded-xl bg-white p-6">
            {/* MANHÃ */}
            <div className="space-y-3">
               <TasksSeparator title="Manhã" icon={<SunIcon />} />
            </div>

            {/* TARDE */}
            <div className="my-6 space-y-3">
               <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />
            </div>

            {/* NOITE */}
            <div className="space-y-3">
               <TasksSeparator title="Noite" icon={<MoonIcon />} />
            </div>
         </div>
      </div>
   );
};

export default Tasks;
