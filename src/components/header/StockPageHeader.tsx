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
    <header className="bg-background text-text border-b border-primary/20 sticky top-0 z-40">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Stok Yönetimi</h1>

          <p className="text-xs text-text/70 mt-0.5">
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
