import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import App from './App.jsx';
import TaskDetailsPage from './pages/TaskDetailsPage.jsx';

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
      <Toaster
         toastOptions={{
            style: {
               color: '#002C2E',
            },
         }}
      />
      <RouterProvider router={router} />
   </StrictMode>
);
