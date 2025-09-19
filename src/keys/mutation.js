export const taskMutationKeys = {
   add: () => '[addTask]',
   delete: (taskId) => ['deleteTask', taskId],
   update: (taskId) => ['updateTask', taskId],
   deleteAll: () => '[deleteAllTasks]',
};
