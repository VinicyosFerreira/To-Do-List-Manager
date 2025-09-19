import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { taskMutationKeys } from '../../keys/mutation';
import { taskQueryKeys } from '../../keys/queries';
import { api } from '../../lib/axios';

export const useDeleteAllTasks = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationKey: taskMutationKeys.deleteAll(),
      mutationFn: async () => {
         const { data: deletedTasks } = await api.get('/tasks');
         await Promise.all(
            deletedTasks.map((task) => api.delete(`/tasks/${task.id}`))
         );
         return deletedTasks;
      },

      onSuccess: () => {
         queryClient.setQueryData(taskQueryKeys.getAll(), []);
      },
   });
};
