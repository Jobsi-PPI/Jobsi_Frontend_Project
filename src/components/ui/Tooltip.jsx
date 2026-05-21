import { useState, useRef, useEffect } from "react";
import { FiHelpCircle } from "react-icons/fi";

const Tooltip = ({ text }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return;
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    return (
        <span ref={ref} className="relative inline-flex items-center ml-1">
            <span
                role="button"
                tabIndex={0}
                onClick={() => setOpen((v) => !v)}
                onKeyDown={(e) => e.key === "Enter" && setOpen((v) => !v)}
                className="cursor-pointer text-gray-400 hover:text-[#1e3a8a] transition-colors"
            >
                <FiHelpCircle size={14} />
            </span>
            {open && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-52 bg-[#1e3a8a] text-white text-xs rounded-lg px-3 py-2 shadow-lg text-center">
                    {text}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1e3a8a]" />
                </span>
            )}
        </span>
    );
};

export default Tooltip;
