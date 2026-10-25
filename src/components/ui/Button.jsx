import React from "react";

const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-lg transition duration-200 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "disabled:opacity-60 disabled:cursor-not-allowed";

const variants = {
    primary: "!bg-[#1e3a8a] text-white hover:!bg-[#1b347c]",

    warning: "!bg-[#ffb906] text-black hover:!bg-[#f59e0b] !border-[#ffb906]",

    secondary:
        "!bg-white text-[#1e3a8a] border !border-[#1e3a8a] hover:!bg-[#BABABA] ",

    danger: "!bg-red-600 text-white hover:!bg-red-700 ",

    dark: "!bg-black text-white hover:!bg-gray-800",
};

const sizes = {
    sm: "text-sm px-3 py-2",
    md: "text-sm px-4 py-2.5",
    lg: "text-base px-6 py-3",
    xl: "text-lg px-8 py-4",
};

const Button = ({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    fullWidth = false,
    className = "",
    ...props
}) => {
    return (
        <button
            type={type}
            className={`
                ${baseStyles}
                ${variants[variant] || variants.primary}
                ${sizes[size] || sizes.md}
                ${fullWidth ? "w-full" : ""}
                ${className}
            `}
            {...props}
            >
            {children}
        </button>
    );
};

export default Button;
