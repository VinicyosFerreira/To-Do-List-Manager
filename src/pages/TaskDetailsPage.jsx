import { useEffect, useRef, useState } from 'react';
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
   const [errors, setErrors] = useState([]);
   const [saveIsLoading, setSaveIsLoading] = useState(false);
   const [deleteIsLoading, setDeleteIsLoading] = useState(false);
   const navigate = useNavigate();
   const titleRef = useRef(null);
   const descriptionRef = useRef(null);
   const periodRef = useRef(null);

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
         } catch (error) {
            console.log(error);
         }
      };
      fetchTasks();
   }, [taskId]);

   const handleEditClick = async () => {
      setSaveIsLoading(true);
      const newErrors = [];

      const title = titleRef.current.value;
      const description = descriptionRef.current.value;
      const period = periodRef.current.value;

      if (!title.trim()) {
         newErrors.push({
            title: 'title',
            message: 'O campo de titulo é obrigatório',
         });
      }

      if (!description.trim()) {
         newErrors.push({
            description: 'description',
            message: 'O campo de descrição é obrigatório',
         });
      }

      if (!period.trim()) {
         newErrors.push({
            period: 'period',
            message: 'O campo de horário  é obrigatório',
         });
      }

      setErrors(newErrors);

      if (newErrors.length > 0) {
         return;
      }

      const editTask = {
         title: title,
         description: description,
         period: period,
      };

      try {
         const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(editTask),
         });

         if (!response.ok) {
            throw new Error('Erro ao editar tarefa. Tente novamente');
         }

         const data = await response.json();
         setTask(data);
         toast.success('Tarefa editada com sucesso!');
      } catch (error) {
         toast.error(error);
      } finally {
         setSaveIsLoading(false);
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

   const titleError = errors.find((error) => error.title === 'title');
   const descriptionError = errors.find(
      (error) => error.description === 'description'
   );
   const periodError = errors.find((error) => error.period === 'period');

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
            <div className="w-full space-y-3 rounded-xl bg-brand-white p-6">
               <div>
                  <Input
                     label="Nome"
                     defaultValue={task?.title}
                     id="title"
                     ref={titleRef}
                     error={titleError}
                  />
               </div>
               <div>
                  <PeriodSelect
                     label="Horário"
                     defaultValue={task?.period}
                     id="period"
                     ref={periodRef}
                     error={periodError}
                  />
               </div>
               <div>
                  <Input
                     label="Descrição"
                     defaultValue={task?.description}
                     id="description"
                     ref={descriptionRef}
                     error={descriptionError}
                  />
               </div>
            </div>

            {/* botões de salvar/cancelar */}
            <div className="flex justify-end">
               <Button
                  size="large"
                  color="primary"
                  onClick={handleEditClick}
                  disabled={saveIsLoading}
               >
                  {saveIsLoading ? 'Salvando...' : 'Salvar'}
               </Button>
            </div>
         </div>
      </div>
   );
};

export default TaskDetailsPage;
