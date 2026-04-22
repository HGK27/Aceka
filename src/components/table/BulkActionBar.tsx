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
    <div className="bg-surface/80 flex items-center justify-between px-4 py-2.5 border-b border-primary/20 h-12">
      <span className="text-sm text-text font-medium">
        {count} kayıt seçildi
      </span>

      {count > 0 && (
        <button
          onClick={onDeleteMany}
          className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Seçilileri Sil
        </button>
      )}
    </div>
  );
});
export default BulkActionBar;
