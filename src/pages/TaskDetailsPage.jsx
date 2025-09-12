import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import {
   ArrowLeftIcon,
   ChevronRightIcon,
   LoaderIcon,
   TrashIcon,
} from '../assets/icons';
import Button from '../components/Button';
import Input from '../components/Input';
import PeriodSelect from '../components/PeriodSelect';
import Sidebar from '../components/Sidebar';

const TaskDetailsPage = () => {
   const { id: taskId } = useParams();
   const navigate = useNavigate();
   const queryClient = useQueryClient();
   const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
   } = useForm({});

   const { data: task } = useQuery({
      queryKey: ['task', taskId],
      queryFn: async () => {
         const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
         const responseData = await response.json();
         reset(responseData);
         return responseData;
      },
   });

   const { mutate: deleteTask, isPending: isDeletePending } = useMutation({
      mutationKey: ['deleteTask', taskId],
      mutationFn: async () => {
         const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'DELETE',
         });
         const deleteTask = await response.json();
         queryClient.setQueryData(['tasks'], (oldTasks) => {
            return oldTasks?.filter((oldTask) => oldTask.id !== deleteTask.id);
         });
      },
   });

   const { mutate: updateTask, isPending: isUpdatePending } = useMutation({
      mutationKey: ['updateTask', taskId],
      mutationFn: async (data) => {
         const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               title: data.title.trim(),
               description: data.description.trim(),
               period: data.period,
            }),
         });

         if (!response.ok) {
            throw new Error();
         }

         const updatedData = await response.json();
         queryClient.setQueryData(['tasks'], (oldTasks) => {
            return oldTasks?.map((oldTask) => {
               if (oldTask.id === taskId) {
                  return updatedData;
               }
               return oldTask;
            });
         });

         return updatedData;
      },
   });

   const handleBackClick = () => {
      navigate(-1);
   };

   const handleEditClick = async (data) => {
      updateTask(data, {
         onSuccess: () => {
            toast.success('Tarefa editada com sucesso!');
         },
         onError: () => {
            toast.error('Erro ao editar tarefa');
         },
      });
   };

   const handleDeleteClick = async () => {
      deleteTask(undefined, {
         onSuccess: () => {
            toast.success('Tarefa excluida com sucesso!');
            navigate(-1);
         },

         onError: (err) => {
            console.log(err);
            toast.error('Erro ao deletar tarefa');
         },
      });
   };

   return (
      <div className="flex">
         <Sidebar />
         <div className="w-full space-y-6 px-8 py-16">
            {/* barra do topo */}
            <div className="flex justify-between">
               {/* parte da esquerda */}
               <div>
                  <button
                     className="mb-2 rounded-full bg-brand-primary p-1"
                     onClick={handleBackClick}
                  >
                     <ArrowLeftIcon />
                  </button>
                  <div className="flex items-center gap-1 text-xs">
                     <Link
                        className="cursor-pointer text-brand-text-gray"
                        to="/"
                     >
                        Minhas tarefas
                     </Link>
                     <ChevronRightIcon className="text-brand-text-gray" />
                     <span className="font-semibold text-brand-primary">
                        {task?.title}
                     </span>
                  </div>
                  <h1 className="mt-1 text-xl font-semibold text-brand-dark-blue">
                     {task?.title}
                  </h1>
               </div>

               {/* parte da direita */}

               <div className="h-fit self-end">
                  <Button
                     className="flex items-center justify-center bg-brand-danger"
                     onClick={handleDeleteClick}
                  >
                     {isDeletePending ? (
                        <LoaderIcon className="animate-spin text-brand-text-gray" />
                     ) : (
                        <TrashIcon />
                     )}
                     Deletar tarefa
                  </Button>
               </div>
            </div>

            {/* corpo com inputs das tarefas */}
            <form onSubmit={handleSubmit(handleEditClick)}>
               <div className="w-full space-y-3 rounded-xl bg-brand-white p-6">
                  <div>
                     <Input
                        label="Nome"
                        id="title"
                        defaultValue={task?.title}
                        {...register('title', {
                           required: 'O título é obrigatório',
                           validate: (value) => {
                              if (!value.trim()) {
                                 return 'O título não pode ser vazio';
                              }
                              return true;
                           },
                        })}
                        error={errors?.title}
                     />
                  </div>
                  <div>
                     <PeriodSelect
                        label="Horário"
                        id="period"
                        defaultValue={task?.period}
                        {...register('period', {
                           required: 'O horário é obrigatório',
                           validate: (value) => {
                              if (!value.trim()) {
                                 return 'O horário não pode ser vazio';
                              }
                              return true;
                           },
                        })}
                        error={errors?.period}
                     />
                  </div>
                  <div>
                     <Input
                        label="Descrição"
                        id="description"
                        defaultValue={task?.description}
                        {...register('description', {
                           required: 'A descrição é obrigatória',
                           validate: (value) => {
                              if (!value.trim()) {
                                 return 'A descrição não pode ser vazia';
                              }
                              return true;
                           },
                        })}
                        error={errors?.description}
                     />
                  </div>
               </div>

               {/* botões de salvar/cancelar */}
               <div className="flex justify-end">
                  <Button
                     size="large"
                     color="primary"
                     type="submit"
                     disabled={isDeletePending || isUpdatePending}
                  >
                     {isDeletePending || isUpdatePending
                        ? 'Salvando...'
                        : 'Salvar'}
                  </Button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default TaskDetailsPage;
