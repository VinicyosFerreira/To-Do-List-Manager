function Button({
   children,
   variant = 'primary',
   size = 'small',
   className,
   ...rest
}) {
   const getVariantClass = () => {
      if (variant === 'primary') {
         return 'bg-brand-primary text-white';
      }
      if (variant === 'ghost') {
         return 'bg-transparent text-brand-dark-gray';
      }

      if (variant === 'secondary') {
         return 'bg-brand-light-gray text-brand-dark-blue';
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
         className={`flex justify-center gap-2 rounded-md bg-brand-primary px-3 text-xs font-semibold ${getVariantClass()} ${getSizeClass()} transition hover:opacity-75 ${className}`}
         {...rest}
      >
         {children}
      </button>
   );
}

export default Button;
