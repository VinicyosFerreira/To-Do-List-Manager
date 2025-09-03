import './AddTaskDialog.css';

import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { v4 } from 'uuid';

import Button from './Button';
import Input from './Input';
import PeriodSelect from './PeriodSelect';

const AddTaskDialog = ({ isOpen, handleCloseDialog, handleSubmit }) => {
   const [errors, setErrors] = useState([]);
   const nodeRef = useRef(null);
   const titleRef = useRef(null);
   const descriptionRef = useRef(null);
   const periodRef = useRef(null);

   const handleSaveClick = () => {
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

      const newTask = {
         id: v4(),
         title: title,
         description: description,
         period: period,
         status: 'not_started',
      };

      handleSubmit(newTask);
      handleCloseDialog();
   };

   const titleError = errors.find((error) => error.title === 'title');
   const descriptionError = errors.find(
      (error) => error.description === 'description'
   );
   const periodError = errors.find((error) => error.period === 'period');

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
                     <h2 className="text-center text-xl font-semibold text-[#35383E]">
                        Nova tarefa
                     </h2>
                     <p className="mb-4 mt-1 text-sm text-[#9A9C9F]">
                        Insira as informações abaixo
                     </p>

                     <div className="flex w-[336px] flex-col space-y-4">
                        <Input
                           label={'Titulo'}
                           id={'title'}
                           placeholder="Titulo"
                           error={titleError}
                           ref={titleRef}
                        />

                        <PeriodSelect
                           id="period"
                           ref={periodRef}
                           error={periodError}
                        />

                        <Input
                           label={'Descrição'}
                           id={'description'}
                           placeholder="Descrição"
                           error={descriptionError}
                           ref={descriptionRef}
                        />

                        <div className="flex justify-center gap-3">
                           <Button
                              size="large"
                              variant="secondary"
                              className="w-full"
                              onClick={handleCloseDialog}
                           >
                              Cancelar
                           </Button>
                           <Button
                              size="large"
                              className="w-full"
                              onClick={handleSaveClick}
                           >
                              Salvar
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>,
               document.body
            )}
         </div>
      </CSSTransition>
   );
};

export default AddTaskDialog;
