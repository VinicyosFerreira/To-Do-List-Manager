import './AddTaskDialog.css';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'sonner';
import { v4 } from 'uuid';

import Button from './Button';
import Input from './Input';
import PeriodSelect from './PeriodSelect';

const AddTaskDialog = ({ isOpen, handleCloseDialog }) => {
   const nodeRef = useRef(null);
   const queryClient = useQueryClient();
   const { mutate, isPending } = useMutation({
      mutationKey: ['addTask'],
      mutationFn: async (newTask) => {
         const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
         });

         return response.json();
      },
   });

   const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
   } = useForm({
      defaultValues: {
         title: '',
         description: '',
         period: 'morning',
      },
   });

   const handleSaveClick = async (data) => {
      const newTask = {
         id: v4(),
         title: data.title.trim(),
         description: data.description,
         period: data.period.trim(),
         status: 'not_started',
      };

      mutate(newTask, {
         onSuccess: () => {
            queryClient.setQueryData(['tasks'], (oldTask) => {
               return [...oldTask, newTask];
            });
            handleCloseDialog();
            reset({
               title: '',
               description: '',
               period: 'morning',
            });
            toast.success('Tarefa criada com sucesso!');
         },
         onError: () => {
            toast.error('Erro ao criar tarefa');
         },
      });
   };

   const handleCancelClick = () => {
      reset({
         title: '',
         description: '',
         period: 'morning',
      });
      handleCloseDialog();
   };

   return (
      <CSSTransition
         nodeRef={nodeRef}
         in={isOpen}
         timeout={400}
         classNames="add-task-dialog"
         unmountOnExit
      >
         <div>
            {createPortal(
               <div
                  className="fixed left-0 top-0 flex min-h-screen w-screen items-center justify-center backdrop-blur"
                  ref={nodeRef}
               >
                  {/* DIALOG */}
                  <div className="rounded-xl bg-white p-5 text-center shadow">
                     <h2 className="text-center text-xl font-semibold text-brand-dark-blue">
                        Nova tarefa
                     </h2>
                     <p className="mb-4 mt-1 text-sm text-brand-text-gray">
                        Insira as informações abaixo
                     </p>

                     <form
                        className="flex w-[336px] flex-col space-y-4"
                        onSubmit={handleSubmit(handleSaveClick)}
                     >
                        <Input
                           label={'Titulo'}
                           id={'title'}
                           placeholder="Titulo"
                           disabled={isPending}
                           {...register('title', {
                              required: 'O titulo é obrigatório',
                              validate: (value) => {
                                 if (!value.trim()) {
                                    return 'O titulo não pode ser vazio';
                                 }
                                 return true;
                              },
                           })}
                           error={errors?.title}
                        />

                        <PeriodSelect
                           id="period"
                           disabled={isPending}
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

                        <Input
                           label={'Descrição'}
                           id={'description'}
                           placeholder="Descrição"
                           disabled={isPending}
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

                        <div className="flex justify-center gap-3">
                           <Button
                              size="large"
                              color="secondary"
                              className="w-full"
                              type="button"
                              onClick={handleCancelClick}
                           >
                              Cancelar
                           </Button>
                           <Button
                              size="large"
                              className="w-full"
                              type="submit"
                              disabled={isPending}
                           >
                              {isPending ? 'Salvando ...' : 'Salvar'}
                           </Button>
                        </div>
                     </form>
                  </div>
               </div>,
               document.body
            )}
         </div>
      </CSSTransition>
   );
};

export default AddTaskDialog;
