import { memo } from "react";

interface ButtonProps {
  children: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const ModalButton = memo(
  ({
    children,
    onClick,
    variant = "primary",
    type = "button",
    disabled = false,
  }: ButtonProps) => {
    const variantStyles = {
      primary:
        "px-5 py-2 text-sm transition-colors rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 cursor-pointer",
      secondary:
        "px-5 py-2 text-sm transition-colors rounded-xl font-medium text-slate-600 hover:bg-slate-100 cursor-pointer",
    };

    return (
      <button
        onClick={onClick}
        className={variantStyles[variant]}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    );
  },
);

export default ModalButton;
