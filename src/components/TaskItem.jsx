import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from '../assets/icons';
import Button from './Button';

const TaskItem = ({ task, handleCheckboxChange }) => {
   const queryClient = useQueryClient();
   const { mutate, isPending } = useMutation({
      mutationKey: ['deleteTask', task.id],
      mutationFn: async () => {
         const response = await fetch(
            `http://localhost:3000/tasks/${task.id}`,
            {
               method: 'DELETE',
            }
         );

         return response.json();
      },
   });

   const handleDeleteClick = async () => {
      mutate(undefined, {
         onSuccess: () => {
            queryClient.setQueryData(['tasks'], (oldTask) => {
               return oldTask.filter((oldTask) => oldTask.id !== task.id);
            });
            toast.success('Tarefa excluida com sucesso!');
         },
         onError: () => {
            toast.error('Erro ao deletar tarefa');
         },
      });
   };
   const getVariantClass = () => {
      if (task.status === 'done') {
         return 'bg-[#00ADB51A]  text-[#002C2E]';
      }
      if (task.status === 'in_progress') {
         return 'bg-brand-process text-brand-process';
      }
      if (task.status === 'not_started') {
         return 'bg-brand-dark-blue bg-opacity-5 text-brand-dark-blue';
      }
   };

   return (
      <div
         className={`flex items-center justify-between gap-2 rounded-xl bg-opacity-10 px-4 py-3 text-sm ${getVariantClass()}`}
      >
         <div className="flex items-center gap-2 transition">
            <label
               className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getVariantClass()}`}
            >
               <input
                  type="checkbox"
                  checked={task.status === 'done'}
                  className="absolute h-full cursor-pointer opacity-0"
                  onChange={() => handleCheckboxChange(task)}
               />
               {task.status === 'done' && <CheckIcon />}
               {task.status === 'in_progress' && (
                  <LoaderIcon className="animate-spin text-brand-white" />
               )}
            </label>
            <p>{task.title}</p>
         </div>

         <div className="flex items-center gap-2">
            <Button
               color="ghost"
               onClick={handleDeleteClick}
               disabled={isPending}
            >
               {isPending ? (
                  <LoaderIcon className="animate-spin text-brand-text-gray" />
               ) : (
                  <TrashIcon className="text-brand-text-gray" />
               )}
            </Button>

            <a
               href={`/task/${task.id}`}
               className="transition hover:opacity-75"
            >
               <DetailsIcon />
            </a>
         </div>
      </div>
   );
};

export default TaskItem;
