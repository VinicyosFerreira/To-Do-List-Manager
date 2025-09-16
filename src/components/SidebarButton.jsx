import { NavLink } from 'react-router-dom';
import { tv } from 'tailwind-variants';

const SidebarButton = ({ children, to }) => {
   const sidebar = tv({
      base: `flex items-center gap-2 rounded-[10px] px-6 py-3 text-sm`,
      variants: {
         color: {
            unselected: 'text-brand-dark-blue',
            selected: 'bg-[#E6F7F8] text-brand-primary',
         },
      },
   });

   return (
      <NavLink
         to={to}
         className={({ isActive }) =>
            sidebar({ color: isActive ? 'selected' : 'unselected' })
         }
      >
         {children}
      </NavLink>
   );
};

export default SidebarButton;
