import InputErrorMessage from './InputErrorMessage';
import InputLabel from './InputLabel';
const Input = ({ label, error, ...rest }) => {
   return (
      <div className="flex flex-col space-y-1 text-left text-[#35383E]">
         <InputLabel htmlFor={rest.id}>{label}</InputLabel>
         <input
            className="placeholder:[#9A9C9F] rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm"
            {...rest}
         />
         {error && <InputErrorMessage>{error.message}</InputErrorMessage>}
      </div>
   );
};

export default Input;
