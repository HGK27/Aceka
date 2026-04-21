import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", ...props }, ref) => {
    const baseStyle =
      "w-full px-3 py-2 text-sm border rounded-xl outline-none transition-all";
    const stateStyle = error
      ? "border-red-300 focus:ring-2 focus:ring-red-300"
      : "border-slate-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent";

    return (
      <input
        ref={ref}
        className={`${baseStyle} ${stateStyle} ${className}`}
        {...props}
      />
    );
  },
);
