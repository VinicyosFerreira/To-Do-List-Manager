import { useQuery } from '@tanstack/react-query';

import { api } from '../../lib/axios';

export const useGetTasks = () => {
   return useQuery({
      queryKey: ['tasks'],
      queryFn: async () => {
         const { data: response } = await api.get('/tasks');
         return response;
      },
   });
};
