import DashboardCards from '../components/DashboardCards';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import TaskItem from '../components/TaskItem';
import { useGetTasks } from '../hooks/data/use-get-tasks';

const HomePage = () => {
   const { data: tasks } = useGetTasks();
   return (
      <div className="flex flex-col md:flex-row">
         <Navigation />
         <div className="mb-20 w-full space-y-6 px-3 py-10 md:mb-0 md:px-8 md:py-16">
            <Header subtitle="Início" title="Início" />
            <DashboardCards />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.5fr,1fr]">
               <div className="space-y-6 rounded-[10px] bg-brand-white p-6">
                  <div>
                     <h3 className="text-xl font-semibold text-brand-dark-blue">
                        Tarefas
                     </h3>
                     <span className="text-sm text-brand-dark-gray">
                        Resumo das tarefas principais
                     </span>
                  </div>

                  <div className="space-y-3">
                     {tasks?.map((task) => (
                        <TaskItem task={task} key={task.id} />
                     ))}
                  </div>
               </div>

               <div className="flex items-center justify-center rounded-[10px] bg-brand-white p-6">
                  <p className="text-brand-dark-gray">
                     Cada pequena ação de hoje te aproxima das grandes
                     conquistas de amanhã. Faça o que precisa ser feito!
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default HomePage;
