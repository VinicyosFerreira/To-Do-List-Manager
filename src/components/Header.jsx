import { useState } from 'react';

import { AddIcon, TrashIcon } from '../assets/icons';
import AddTaskDialog from './AddTaskDialog';
import Button from './Button';

const Header = ({ subtitle, title }) => {
   const [isOpenDialog, setIsOpenDialog] = useState(false);
   return (
      <div className="flex w-full justify-between">
         <div>
            <span className="text-xs font-semibold text-brand-primary">
               {subtitle}
            </span>
            <h2 className="text-xl font-semibold text-brand-dark-blue">
               {title}
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
            />
         </div>
      </div>
   );
};

export default Header;
