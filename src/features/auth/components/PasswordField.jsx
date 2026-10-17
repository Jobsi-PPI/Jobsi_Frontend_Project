import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordField = ({ label, placeholder, value, onChange, error, show, onToggle, message }) => (
    <div className="flex flex-col">
        <label className="block text-sm sm:text-base font-bold text-black">
            {label} <span className="text-red-500">*</span>
        </label>

        <div className={`flex items-center border-1 rounded-lg px-2 ${
                error ? "border-red-500" : "border-[#6b7280]"
            }`}>
            <input
            type={show ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-2 text-black outline-none"
            />

            <button
            type="button"
            className="p-2 btn-blanco text-black hover:text-gray-800"
            onClick={onToggle}
            >
            {show ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
            </button>
        </div>

        {message && (
            <p className="text-red-600 text-sm mt-2">{message}</p>
        )}
    </div>
);

export default PasswordField;
