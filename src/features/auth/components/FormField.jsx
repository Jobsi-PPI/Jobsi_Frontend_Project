const FormField = ({ label, error, onChange, className = "", ...inputProps }) => (
    <div className={className}>
        <label className="block text-sm sm:text-base font-bold text-black">
            {label} <span className="text-red-500">*</span>
        </label>
        <input
            {...inputProps}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full p-2 border-1 rounded-lg text-black
                ${ error ? "border-red-500" : "border-[#6b7280]"}`}
        />
    </div>
);

export default FormField;
