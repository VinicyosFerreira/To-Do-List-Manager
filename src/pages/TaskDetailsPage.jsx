import { useEffect, useState } from 'react';
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
   const [task, setTask] = useState();
   const [deleteIsLoading, setDeleteIsLoading] = useState(false);
   const navigate = useNavigate();

   const {
      register,
      formState: { errors, isSubmitting },
      handleSubmit,
      reset,
   } = useForm({
      defaultValues: {
         title: task?.title,
         description: task?.description,
         period: task?.period,
      },
   });

   const handleBackClick = () => {
      navigate(-1);
   };

   useEffect(() => {
      const fetchTasks = async () => {
         try {
            const response = await fetch(
               `http://localhost:3000/tasks/${taskId}`
            );
            const data = await response.json();
            setTask(data);
            reset(data);
         } catch (error) {
            console.log(error);
         }
      };
      fetchTasks();
   }, [taskId, reset]);

   const handleEditClick = async (data) => {
      try {
         const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
         });

         if (!response.ok) {
            throw new Error('Erro ao editar tarefa. Tente novamente');
         }

         const responseData = await response.json();
         setTask(responseData);
         toast.success('Tarefa editada com sucesso!');
      } catch (error) {
         toast.error(error);
      }
   };

   const handleDeleteClick = async () => {
      setDeleteIsLoading(true);
      try {
         const response = await fetch(
            `http://localhost:3000/tasks/${task.id}`,
            {
               method: 'DELETE',
            }
         );

         if (!response.ok) {
            throw new Error('Erro ao deletar tarefa');
         }
         navigate(-1);
         toast.success('Tarefa excluida com sucesso!');
      } catch (error) {
         toast.error(error);
      } finally {
         setDeleteIsLoading(false);
      }
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
                     {deleteIsLoading ? (
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
                     disabled={isSubmitting}
                  >
                     {isSubmitting ? 'Salvando...' : 'Salvar'}
                  </Button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default TaskDetailsPage;
