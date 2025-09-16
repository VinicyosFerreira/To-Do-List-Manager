import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export const useGetTasks = () => {
   return useQuery({
      queryKey: ['tasks'],
      queryFn: async () => {
         const { data: response } = await axios.get(
            'http://localhost:3000/tasks'
         );
         return response;
      },
   });
};
