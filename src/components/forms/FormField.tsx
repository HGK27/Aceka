import type { ReactNode } from "react";
import { memo } from "react";
interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

export const FormField = memo(({ label, error, children }: FormFieldProps) => (
  <div className="space-y-1">
    {/* LABEL */}
    <label className="block text-xs font-semibold text-text/60 tracking-wide">
      {label}
    </label>

    {/* INPUT */}
    {children}

    {/* ERROR */}
    {error && <p className="text-xs text-red-500/90">{error}</p>}
  </div>
));
