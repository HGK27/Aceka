import type { ReactNode } from "react";
import { memo } from "react";
interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

export const FormField = memo(({ label, error, children }: FormFieldProps) => (
  <div className="space-y-1">
    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
      {label}
    </label>
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
));
