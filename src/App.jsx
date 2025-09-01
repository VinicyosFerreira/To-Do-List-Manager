import { Toaster } from 'sonner';

import Sidebar from './components/Sidebar';
import Tasks from './components/Tasks';
function App() {
   return (
      <div className="flex">
         <Toaster
            toastOptions={{
               style: {
                  color: '#002C2E',
               },
            }}
         />
         <Sidebar />
         <Tasks />
      </div>
   );
}

export default App;
