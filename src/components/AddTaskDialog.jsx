import './AddTaskDialog.css';

import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Button from './Button';
import Input from './Input';

const AddTaskDialog = ({ isOpen, handleCloseDialog }) => {
   const nodeRef = useRef(null);

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
                        />
                        <Input
                           label={'Horário'}
                           id={'period'}
                           placeholder="Horário"
                        />
                        <Input
                           label={'Descrição'}
                           id={'description'}
                           placeholder="Descrição"
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
                           <Button size="large" className="w-full">
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
