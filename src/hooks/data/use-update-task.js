import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useUpdateTask = (taskId) => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationKey: ['updateTask', taskId],
      mutationFn: async (data) => {
         const { data: updatedTask } = await axios.patch(
            `http://localhost:3000/tasks/${taskId}`,
            {
               title: data.title.trim(),
               description: data.description.trim(),
               period: data.period,
            }
         );

         queryClient.setQueryData(['tasks'], (oldTasks) => {
            return oldTasks?.map((oldTask) => {
               if (oldTask.id === taskId) {
                  return updatedTask;
               }
               return oldTask;
            });
         });

         queryClient.setQueryData(['task', taskId], updatedTask);
      },
   });
};
