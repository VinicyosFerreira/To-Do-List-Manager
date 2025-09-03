import InputErrorMessage from './InputErrorMessage';
import InputLabel from './InputLabel';
const Input = ({ label, error, ...rest }) => {
   return (
      <div className="flex flex-col space-y-1 text-left text-brand-dark-blue">
         <InputLabel htmlFor={rest.id}>{label}</InputLabel>
         <input
            className="placeholder:brand-text-gray rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-brand-primary placeholder:text-sm"
            {...rest}
         />
         {error && <InputErrorMessage>{error.message}</InputErrorMessage>}
      </div>
   );
};

export default Input;
