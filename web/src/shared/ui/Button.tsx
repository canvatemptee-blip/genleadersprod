import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}

export default function Button({
    children,
    className,
    variant = "primary",
    ...props
}: ButtonProps) {
    return (
        <button
            className={clsx(
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                variant === "primary"
                    ? "bg-[#06154A] text-white hover:-translate-y-0.5 hover:bg-[#0B236E]"
                    : "border border-[#06154A] text-[#06154A] hover:bg-[#06154A] hover:text-white",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}