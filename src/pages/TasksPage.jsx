import Navigation from '../components/Navigation';
import Tasks from '../components/Tasks';

const TasksPage = () => {
   return (
      <div className="flex flex-col md:flex-row">
         <Navigation />
         <Tasks />
      </div>
   );
};

export default TasksPage;
