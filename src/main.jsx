import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import App from './App.jsx';
import TaskDetailsPage from './pages/TaskDetailsPage.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
   {
      path: '/',
      element: <App />,
   },
   {
      path: '/task/:id',
      element: <TaskDetailsPage />,
   },
]);

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <QueryClientProvider client={queryClient}>
         <Toaster
            toastOptions={{
               style: {
                  color: '#002C2E',
               },
            }}
         />
         <RouterProvider router={router} />
      </QueryClientProvider>
   </StrictMode>
);
