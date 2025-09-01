import { createPortal } from 'react-dom';

const AddTaskDialog = ({ isOpen }) => {
   if (!isOpen) return null;

   return createPortal(
      <div className="fixed left-0 top-0 flex min-h-screen w-screen items-center justify-center">
         <div className="p5 rounded-xl text-white shadow">
            <h2 className="text-center text-xl font-semibold text-[#35383E]">
               Nova tarefa
            </h2>
            <p className="mt-1 text-sm text-[#9A9C9F]">
               Insira as informações abaixo
            </p>
         </div>
      </div>,
      document.body
   );
};

export default AddTaskDialog;
