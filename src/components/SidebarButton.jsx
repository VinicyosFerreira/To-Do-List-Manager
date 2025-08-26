const SidebarButton = ({ children, variant }) => {
   const getVariants = () => {
      if (variant === 'unselected') {
         return 'text-[#35383E]';
      }
      if (variant === 'selected') {
         return 'bg-[#E6F7F8] text-[#00ADB5]';
      }
   };

   return (
      <a
         href="#"
         className={`rounded-[10px] px-6 py-3 text-sm ${getVariants()} flex items-center gap-2`}
      >
         {children}
      </a>
   );
};

export default SidebarButton;
