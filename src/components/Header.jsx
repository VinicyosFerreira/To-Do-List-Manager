import { useState } from 'react';
import { toast } from 'sonner';

import { AddIcon, TrashIcon } from '../assets/icons';
import { useDeleteAllTasks } from '../hooks/data/use-delete-all-tasks';
import AddTaskDialog from './AddTaskDialog';
import Button from './Button';

const Header = ({ subtitle, title }) => {
   const [isOpenDialog, setIsOpenDialog] = useState(false);
   const { mutate: deleteAllTasks } = useDeleteAllTasks();

   const deleteAllTasksClick = () => {
      deleteAllTasks(undefined, {
         onSuccess: () => {
            toast.success('Todas as tarefas foram excluidas com sucesso!');
         },
         onError: (err) => {
            console.log(err);
            toast.error('Erro ao deletar tarefa');
         },
      });
   };

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
            <Button color="ghost" onClick={() => deleteAllTasksClick()}>
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
