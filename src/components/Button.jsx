import { tv } from 'tailwind-variants';

function Button({
   children,
   color = 'primary',
   size = 'small',
   className,
   ...rest
}) {
   const button = tv({
      base: 'flex justify-center gap-2 rounded-md bg-brand-primary px-3 text-xs font-semibold transition hover:opacity-75',
      variants: {
         color: {
            primary: 'bg-brand-primary text-white',
            ghost: 'bg-transparent text-brand-dark-gray',
            secondary: 'bg-brand-light-gray text-brand-dark-blue',
         },
         size: {
            small: 'py-1 text-xs',
            large: 'py-2 text-sm',
         },
         defaultVariants: {
            color: 'primary',
            size: 'small',
         },
      },
   });

   return (
      <button className={button({ color, size, className })} {...rest}>
         {children}
      </button>
   );
}

export default Button;
