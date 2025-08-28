import CheckIcon from '../assets/icons/check.svg?react';
import LoaderIcon from '../assets/icons/loader.svg?react';
import DetailsIcon from '../assets/icons/details.svg?react';

const TaskItem = ({ task }) => {
   const getVariantClass = () => {
      if (task.status === 'done') {
         return 'bg-[#00ADB51A]  text-[#002C2E]';
      }
      if (task.status === 'in_progress') {
         return 'bg-[#FFAA04] text-[#FFAA04]';
      }
      if (task.status === 'not_started') {
         return 'bg-[#35383E0D] text-[#35383E]';
      }
   };

   return (
      <div
         className={`flex items-center justify-between gap-2 rounded-xl bg-opacity-10 px-4 py-3 text-sm ${getVariantClass()}`}
      >
         <div className="flex items-center gap-2">
            <label
               className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getVariantClass()}`}
            >
               <input
                  type="chekbox"
                  checked={task.status === 'done'}
                  className="absolute h-full cursor-pointer opacity-0"
               />
               {task.status === 'done' && <CheckIcon />}
               {task.status === 'in_progress' && (
                  <LoaderIcon className="animate-spin" />
               )}
            </label>
            {task.title}
         </div>

         <a href="#" className="transition hover:opacity-75">
            <DetailsIcon />
         </a>
      </div>
   );
};

export default TaskItem;
