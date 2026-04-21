import { memo, useCallback } from "react";
import type { StockFilters, Warehouse, StockStatus } from "../../types/stock";
import SearchIcon from "../icons/SearchIcon";

interface Props {
  filters: StockFilters;
  onChange: (filters: StockFilters) => void;
  totalCount: number;
  filteredCount: number;
}

export const StockFiltersComponent = memo(function StockFilters({
  filters,
  onChange,
  totalCount,
  filteredCount,
}: Props) {
  const set = useCallback(
    <K extends keyof StockFilters>(key: K, val: StockFilters[K]) =>
      onChange({ ...filters, [key]: val }),
    [filters, onChange],
  );

  const handleReset = useCallback(
    () => onChange({ search: "", warehouse: "ALL", status: "ALL" }),
    [onChange],
  );

  const hasActiveFilters =
    filters.search || filters.warehouse !== "ALL" || filters.status !== "ALL";

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <SearchIcon />
          <input
            type="text"
            placeholder="Ürün adı veya SKU ara..."
            value={filters.search}
            onChange={(e) => set("search", e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-200 text-slate-800 dark:text-slate-800 placeholder-slate-400 dark:placeholder-slate-400  focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all"
          />
          {filters.search && (
            <button
              onClick={() => set("search", "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              ✕
            </button>
          )}
        </div>

        {/* Warehouse filter */}
        <select
          value={filters.warehouse}
          onChange={(e) =>
            set("warehouse", e.target.value as Warehouse | "ALL")
          }
          className="px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-100 min-w-[140px] focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none"
        >
          <option value="ALL">Tüm Depolar</option>
          <option value="IST">İstanbul</option>
          <option value="ANK">Ankara</option>
          <option value="IZM">İzmir</option>
        </select>

        {/* Status filter */}
        <select
          value={filters.status}
          onChange={(e) => set("status", e.target.value as StockStatus | "ALL")}
          className="px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-100 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none"
        >
          <option value="ALL">Tüm Durumlar</option>
          <option value="IN">Stokta</option>
          <option value="OUT">Tükendi</option>
        </select>

        {/* Reset */}
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="px-3 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors whitespace-nowrap"
          >
            Temizle
          </button>
        )}
      </div>

      {filteredCount !== totalCount && (
        <p className="mt-2.5 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            {filteredCount}
          </span>{" "}
          sonuç gösteriliyor (toplam {totalCount})
        </p>
      )}
    </div>
  );
});
