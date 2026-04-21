// components/layout/PageHeader.tsx
import DarkModeButton from "../buttons/DarkModeButton";
import { ExportButton } from "../buttons/ExportButton";
import { AddStockButton } from "../buttons/AddStockButton";

interface Props {
  onExport: () => void;
  onAddStock: () => void;
  toggleTheme: () => void;
  isDark: boolean;
}

export function PageHeader({
  onExport,
  onAddStock,
  toggleTheme,
  isDark,
}: Props) {
  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Stok Yönetimi
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            IST · ANK · IZM depoları
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ExportButton onClick={onExport} />
          <DarkModeButton onClick={toggleTheme} isDark={isDark} />
          <AddStockButton onClick={onAddStock} />
        </div>
      </div>
    </header>
  );
}
