import { flexRender } from "@tanstack/react-table";
import type { Table } from "@tanstack/react-table";
import type { Stock } from "../../types/stock";
import { SortIcon } from "../icons/SortIcon";
import { TableRow } from "./TableRow";
import BulkActionBar from "./BulkActionBar";
import { useCallback } from "react";

interface Props {
  table: Table<Stock>;
  selectedIds: number[];
  onDeleteMany: (ids: number[]) => void;
}

export function StockTable({ table, selectedIds, onDeleteMany }: Props) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRows = table.getFilteredRowModel().rows.length;
  const pageCount = table.getPageCount();

  // BulkActionBar'a geçilen callback stabil olsun
  const handleDeleteMany = useCallback(
    () => onDeleteMany(selectedIds),
    [onDeleteMany, selectedIds],
  );
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <BulkActionBar
        count={selectedIds.length}
        onDeleteMany={handleDeleteMany}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="bg-slate-50 border-b border-slate-200">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center gap-1.5 ${
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getCanSort() && (
                          <SortIcon sorted={header.column.getIsSorted()} />
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={table.getAllColumns().length}
                  className="text-center py-16 text-slate-400"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span>Kayıt bulunamadı</span>
                  </div>
                </td>
              </tr>
            ) : (
              table
                .getRowModel()
                .rows.map((row) => (
                  <TableRow
                    key={row.id}
                    rowId={row.id}
                    isSelected={row.getIsSelected()}
                    table={table}
                    original={row.original}
                  />
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50">
        <p className="text-xs text-slate-500">
          <span className="font-semibold text-slate-700">{totalRows}</span>{" "}
          kayıttan{" "}
          <span className="font-semibold text-slate-700">
            {pageIndex * pageSize + 1}–
            {Math.min((pageIndex + 1) * pageSize, totalRows)}
          </span>{" "}
          arası gösteriliyor
        </p>

        <div className="flex items-center gap-2">
          {/* Page size */}
          <select
            value={pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 text-slate-600 bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n} / sayfa
              </option>
            ))}
          </select>

          {/* Prev / Next */}
          <div className="flex gap-1">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 text-slate-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ‹ Önceki
            </button>
            <span className="px-3 py-1.5 text-xs text-slate-700 font-semibold">
              {pageIndex + 1} / {pageCount}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 text-slate-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Sonraki ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
