import { useMutation, useQueryClient } from '@tanstack/react-query';

import { taskMutationKeys } from '../../keys/mutation';
import { taskQueryKeys } from '../../keys/queries';
import { api } from '../../lib/axios';

export const useDeleteTask = (taskId) => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationKey: taskMutationKeys.delete(taskId),
      mutationFn: async () => {
         const { data: deletedTask } = await api.delete(`tasks/${taskId}`);
         return deletedTask;
      },
      onSuccess: (deletedTask) => {
         queryClient.setQueryData(taskQueryKeys.getAll(), (oldTask) => {
            return oldTask?.filter((oldTask) => oldTask.id !== deletedTask.id);
         });
      },
   });
};
