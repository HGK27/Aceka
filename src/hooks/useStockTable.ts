//Table data, kolonlar, sıralama, filtreleme, seçim ve sayfalama mantığını yöneten custom hook
import { useCallback, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  type SortingState,
  type RowSelectionState,
  type PaginationState,
  type FilterFn,
} from "@tanstack/react-table";
import { stockColumns } from "../components/table/stockColumns";
import type { Stock, StockFilters } from "../types/stock";
import { useDebounce } from "./useDebounce";

// Custom global filter: search across productName and sku
const globalFilterFn: FilterFn<Stock> = (row, _columnId, value: string) => {
  const search = value.toLowerCase();
  return (
    row.original.productName.toLowerCase().includes(search) ||
    row.original.sku.toLowerCase().includes(search)
  );
};

export function useStockTable(
  stocks: Stock[],
  filters: StockFilters,
  onEdit: (stock: Stock) => void,
  onDelete: (id: number) => void,
) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const filteredData = useMemo(() => {
    return stocks.filter((s) => {
      if (filters.warehouse !== "ALL" && s.warehouse !== filters.warehouse)
        return false;
      if (filters.status !== "ALL" && s.status !== filters.status) return false;
      return true;
    });
  }, [stocks, filters.warehouse, filters.status]);

  const columns = useMemo(
    () => stockColumns(onEdit, onDelete),
    [onEdit, onDelete],
  );

  const debouncedSearch = useDebounce(filters.search, 500);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      rowSelection,
      pagination,
      globalFilter: debouncedSearch,
    },
    globalFilterFn,
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const selectedIds = useMemo(
    () =>
      Object.keys(rowSelection)
        .filter((key) => rowSelection[key])
        .map((key) => Number(key)),
    [rowSelection],
  );
  const clearSelection = useCallback(() => setRowSelection({}), []);

  return { table, selectedIds, clearSelection };
}
