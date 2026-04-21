import { memo } from "react";

// selectedIds.length değişince render alır — doğru davranış
const BulkActionBar = memo(function BulkActionBar({
  count,
  onDeleteMany,
}: {
  count: number;
  onDeleteMany: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-indigo-50 dark:bg-indigo-950 border-b border-indigo-100 dark:border-indigo-900 h-12">
      <span className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">
        {count} kayıt seçildi
      </span>
      {count > 0 && (
        <button
          onClick={onDeleteMany}
          className="px-3 py-1.5 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
        >
          Seçilileri Sil
        </button>
      )}
    </div>
  );
});
export default BulkActionBar;
