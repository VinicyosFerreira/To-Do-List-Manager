import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeftIcon, ChevronRightIcon, TrashIcon } from '../assets/icons';
import Button from '../components/Button';
import Input from '../components/Input';
import PeriodSelect from '../components/PeriodSelect';
import Sidebar from '../components/Sidebar';

const TaskDetailsPage = () => {
   const { id: taskId } = useParams();
   const [task, setTask] = useState();
   const navigate = useNavigate();

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
                     <span
                        className="cursor-pointer text-brand-text-gray"
                        onClick={handleBackClick}
                     >
                        Minhas tarefas
                     </span>
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
                  <Button className="bg-brand-danger">
                     <TrashIcon />
                     Deletar tarefa
                  </Button>
               </div>
            </div>

            {/* corpo com inputs das tarefas */}
            <div className="w-full space-y-3 rounded-xl bg-brand-white p-6">
               <div>
                  <Input label="Nome" value={task?.title} id="title" />
               </div>
               <div>
                  <PeriodSelect
                     label="Horário"
                     value={task?.period}
                     id="period"
                  />
               </div>
               <div>
                  <Input
                     label="Descrição"
                     value={task?.description}
                     id="description"
                  />
               </div>
            </div>

            {/* botões de salvar/cancelar */}
            <div className="flex justify-end">
               <Button size="large" color="secondary">
                  Cancelar
               </Button>
               <Button size="large" color="primary">
                  Salvar
               </Button>
            </div>
         </div>
      </div>
   );
};

export default TaskDetailsPage;
