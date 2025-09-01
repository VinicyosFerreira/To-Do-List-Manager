function Button({
   children,
   variant = 'primary',
   size = 'small',
   className,
   ...rest
}) {
   const getVariantClass = () => {
      if (variant === 'primary') {
         return 'bg-[#00ADB5] text-white';
      }
      if (variant === 'ghost') {
         return 'bg-transparent text-[#818181]';
      }

      if (variant === 'secondary') {
         return 'bg-[#EEEEEE] text-[#35383E]';
      }
   };

   const getSizeClass = () => {
      if (size === 'small') {
         return 'text-xs py-1';
      }
      if (size === 'large') {
         return 'text-sm py-2';
      }
   };

   return (
      <button
         className={`flex justify-center gap-2 rounded-md bg-[#00ADB5] px-3 text-xs font-semibold ${getVariantClass()} ${getSizeClass()} transition hover:opacity-75 ${className}`}
         {...rest}
      >
         {children}
      </button>
   );
}

export default Button;
