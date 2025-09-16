import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

export const useUpdateTask = (taskId) => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationKey: ['updateTask', taskId],
      mutationFn: async (data) => {
         const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               title: data.title.trim(),
               description: data.description.trim(),
               period: data.period,
            }),
         });

         if (!response.ok) {
            throw new Error();
         }

         const updatedTask = await response.json();
         queryClient.setQueryData(['tasks'], (oldTasks) => {
            return oldTasks?.map((oldTask) => {
               if (oldTask.id === taskId) {
                  return updatedTask;
               }
               return oldTask;
            });
         });
      },
   });
};
