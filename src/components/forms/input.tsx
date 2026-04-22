import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", ...props }, ref) => {
    const baseStyle =
      "w-full px-3 py-2 text-sm bg-surface text-text border border-white/10 rounded-xl outline-none transition-all";

    const stateStyle = error
      ? "border-red-500/60 focus:ring-2 focus:ring-red-500/30"
      : "focus:ring-2 focus:ring-primary/40 focus:border-primary/40";

    return (
      <input
        ref={ref}
        className={`${baseStyle} ${stateStyle} ${className}`}
        {...props}
      />
    );
  },
);
