import { useMutation, useQueryClient } from '@tanstack/react-query';

import { taskMutationKeys } from '../../keys/mutation';
import { taskQueryKeys } from '../../keys/queries';
import { api } from '../../lib/axios';

export const useAddTasks = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationKey: taskMutationKeys.add(),
      mutationFn: async (newTask) => {
         const { data: createdTask } = await api.post('/tasks', newTask);
         return createdTask;
      },
      onSuccess: (createdTask) => {
         queryClient.setQueryData(taskQueryKeys.getAll(), (oldTask) => {
            return [...oldTask, createdTask];
         });
      },
   });
};
