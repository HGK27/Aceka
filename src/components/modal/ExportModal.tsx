// components/modal/ExportModal.tsx
import { memo } from "react";
import type { Table } from "@tanstack/react-table";
import type { Stock } from "../../types/stock";
import { useCsvExport } from "../../hooks/useCsvExport";
import ModalButton from "../buttons/ModalButton";

interface Props {
  open: boolean;
  onClose: () => void;
  table: Table<Stock>;
  selectedCount: number;
}

export const ExportModal = memo(function ExportModal({
  open,
  onClose,
  table,
  selectedCount,
}: Props) {
  const { exportAll, exportSelected } = useCsvExport(table);

  if (!open) return null;

  const totalCount = table.getCoreRowModel().rows.length;

  const handleExportAll = () => {
    exportAll();
    onClose();
  };

  const handleExportSelected = () => {
    exportSelected();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm mx-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            CSV İndir
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            ✕
          </button>
        </div>

        {/* Seçenekler */}
        <div className="space-y-3">
          {/* Tümünü indir */}
          <button
            onClick={handleExportAll}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
          >
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Tümünü İndir
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {totalCount} kayıt
              </p>
            </div>
            <svg
              className="w-5 h-5 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>

          {/* Seçilileri indir */}
          <button
            onClick={handleExportSelected}
            disabled={selectedCount === 0}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-left"
          >
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Seçilileri İndir
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {selectedCount > 0
                  ? `${selectedCount} kayıt seçili`
                  : "Henüz seçim yapılmadı"}
              </p>
            </div>
            <svg
              className="w-5 h-5 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>

        <div className="flex justify-end">
          <ModalButton variant="secondary" onClick={onClose}>
            İptal
          </ModalButton>
        </div>
      </div>
    </div>
  );
});
