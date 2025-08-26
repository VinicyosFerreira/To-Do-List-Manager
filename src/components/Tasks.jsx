import Button from './Button';
import AddIcon from '../assets/icons/addIcon.svg?react';
import TrashIcon from '../assets/icons/trashIcon.svg?react';

const Tasks = () => {
   return (
      <div className="flex w-full px-8 py-14">
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
      </div>
   );
};

export default Tasks;
