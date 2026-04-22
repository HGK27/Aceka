import { useState, useCallback } from "react";

import { useStocks } from "../hooks/useStocks";
import { useStockTable } from "../hooks/useStockTable";
import { useStockModals } from "../hooks/useStockModals";

import { StockTable } from "../components/table/StockTable";
import { StockFiltersComponent } from "../components/filters/StockFilters";
import { StockModal } from "../components/modal/StockModal";
import { DeleteConfirmModal } from "../components/modal/DeleteConfirmModal";
import { StatsCards } from "../components/cards/StatsCards";
import { useTheme } from "../context/ThemeContext";
import { ExportModal } from "../components/modal/ExportModal";
import { PageHeader } from "../components/header/StockPageHeader";

import type { StockFilters as FiltersType } from "../types/stock";

export function StocksPage() {
  const { stocks, addStock, updateStock, deleteStock, deleteMany } =
    useStocks();
  const { isDark, toggleTheme } = useTheme();
  const [exportOpen, setExportOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersType>({
    search: "",
    warehouse: "ALL",
    status: "ALL",
  });

  const {
    modalOpen,
    editingStock,
    deleteTarget,
    deleteManyTarget,
    handleEdit,
    handleDeleteClick,
    handleDeleteManyClick,
    handleSave,
    handleCloseModal,
    handleConfirmDelete,
    handleConfirmDeleteMany,
    openAddModal,
    setDeleteTarget,
    setDeleteManyTarget,
  } = useStockModals(deleteStock, deleteMany, addStock, updateStock);

  const { table, selectedIds, clearSelection } = useStockTable(
    stocks,
    filters,
    handleEdit,
    handleDeleteClick,
  );

  const handleDeleteMany = useCallback(
    (ids: number[]) => {
      handleDeleteManyClick(ids);
      clearSelection();
    },
    [handleDeleteManyClick, clearSelection],
  );

  const filteredCount = table.getFilteredRowModel().rows.length;

  return (
    <div className="min-h-screen bg-background text-text">
      <PageHeader
        onExport={() => setExportOpen(true)}
        onAddStock={openAddModal}
        toggleTheme={toggleTheme}
        isDark={isDark}
      />

      <main className="max-w-screen-2xl mx-auto px-6 py-6 space-y-5">
        <StatsCards stocks={stocks} />
        <StockFiltersComponent
          filters={filters}
          onChange={setFilters}
          totalCount={stocks.length}
          filteredCount={filteredCount}
        />
        <StockTable
          table={table}
          selectedIds={selectedIds}
          onDeleteMany={handleDeleteMany}
        />
      </main>

      <StockModal
        key={editingStock?.id ?? "new"}
        open={modalOpen}
        stock={editingStock}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
      <DeleteConfirmModal
        open={deleteTarget !== null}
        count={1}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteTarget(null);
        }}
      />
      <DeleteConfirmModal
        open={deleteManyTarget.length > 0}
        count={deleteManyTarget.length}
        onConfirm={handleConfirmDeleteMany}
        onCancel={() => {
          setDeleteManyTarget([]);
        }}
      />
      <ExportModal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        table={table}
        selectedCount={selectedIds.length}
      />
    </div>
  );
}
