const TaskItem = ({ task }) => {
   const getVariantClass = () => {
      if (task.status === 'done') {
         return 'bg-[#00ADB51A] bg-opacity-10 text-[#002C2E]';
      }
      if (task.status === 'in_progress') {
         return 'bg-[#FFAA04] bg-opacity-10 text-[#FFAA04]';
      }
      if (task.status === 'not_started') {
         return 'bg-[#35383E0D] bg-opacity-10 text-[#35383E]';
      }
   };

   return (
      <div
         className={`flex gap-2 rounded-xl px-4 py-3 text-sm ${getVariantClass()}`}
      >
         {task.title}
      </div>
   );
};

export default TaskItem;
