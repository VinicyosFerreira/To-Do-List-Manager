const DashboardCard = ({ icon, mainText, secondaryText }) => {
   return (
      <div className="flex h-[150px] flex-col items-center justify-center gap-1 rounded-[10px] bg-brand-white">
         <div className="flex items-center gap-2">
            <span className="text-brand-primary">{icon}</span>
            <p className="text-3xl font-semibold text-brand-dark-blue">
               {mainText}
            </p>
         </div>
         <p className="text-brand-dark-blue">{secondaryText}</p>
      </div>
   );
};

export default DashboardCard;
