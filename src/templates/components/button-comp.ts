export const buttonGenericTemplate = () => `
"use client";

import React from "react";

type ButtonGenericProps = {
    label: string;
    type?: "reset" | "submit" | "button";
} & React.ComponentProps<"button">;

export const ButtonGeneric: React.FC<ButtonGenericProps> = ({
    label,
    type = "submit",
    className = "",
    ...props
}) => {
    return (
        <button
            type={type}
            className={\`max-h-7 px-6 py-1 bg-(--brand-300) text-white font-bold text-md rounded-md flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-(--brand-400) lg:w-auto w-full lg:mt-0 \${className}\`}
            {...props}
        >
            {label}
        </button>
    );
};
`;