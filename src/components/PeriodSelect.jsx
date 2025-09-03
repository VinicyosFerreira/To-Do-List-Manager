import InputErrorMessage from './InputErrorMessage';
import InputLabel from './InputLabel';

const PeriodSelect = (props) => {
   return (
      <div className="flex flex-col gap-1 text-left">
         <InputLabel htmlFor="period">Horário</InputLabel>
         <select
            id="period"
            className="placeholder:brand-text-gray rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-brand-primary placeholder:text-sm"
            {...props}
         >
            <option value="morning">Manhã</option>
            <option value="afternoon">Tarde</option>
            <option value="evening">Noite</option>
         </select>
         {props.error && (
            <InputErrorMessage>{props.error.message}</InputErrorMessage>
         )}
      </div>
   );
};

export default PeriodSelect;
