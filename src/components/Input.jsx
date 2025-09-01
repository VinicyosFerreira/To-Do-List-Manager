const Input = ({ label, ...rest }) => {
   return (
      <div className="flex flex-col space-y-1 text-left text-[#35383E]">
         <label htmlFor={rest.id}>{label}</label>
         <input
            className="placeholder:[#9A9C9F] rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm"
            {...rest}
         />
      </div>
   );
};

export default Input;
