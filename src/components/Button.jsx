function Button({ children, variant }) {
   const getVariantClass = () => {
      if (variant === 'primary') {
         return 'bg-[#00ADB5] text-white';
      }
      if (variant === 'ghost') {
         return 'bg-transparent text-[#818181]';
      }
   };

   return (
      <button
         className={`flex gap-2 rounded-md bg-[#00ADB5] px-3 py-1 text-xs font-semibold ${getVariantClass()}`}
      >
         {children}
      </button>
   );
}

export default Button;
