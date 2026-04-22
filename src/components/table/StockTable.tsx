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

  const handleDeleteMany = useCallback(
    () => onDeleteMany(selectedIds),
    [onDeleteMany, selectedIds],
  );

  return (
    <div className="bg-white/90 rounded-2xl shadow-sm border border-white/10 overflow-hidden">
      <BulkActionBar
        count={selectedIds.length}
        onDeleteMany={handleDeleteMany}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-text">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr
                key={hg.id}
                className="bg-surface/50 border-b border-white/10"
              >
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-semibold text-text/60 uppercase tracking-wider whitespace-nowrap"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center gap-1.5 ${
                          header.column.getCanSort()
                            ? "cursor-pointer select-none hover:text-text"
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
                  className="text-center py-16 text-text/50"
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
      <div className="bg-surface/80 flex items-center justify-between px-4 py-3 border-t border-white/10">
        <p className="text-xs text-text/60">
          <span className="font-semibold text-text">{totalRows}</span> kayıttan{" "}
          <span className="font-semibold text-text">
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
            className="text-xs border border-white/10 px-2 py-1.5 text-text bg-surface focus:ring-2 focus:ring-primary/40 focus:outline-none"
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
              className="px-2.5 py-1.5 text-xs font-medium border border-white/10 text-text/70 hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              ‹ Önceki
            </button>

            <span className="px-3 py-1.5 text-xs text-text font-semibold">
              {pageIndex + 1} / {pageCount}
            </span>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-2.5 py-1.5 text-xs font-medium border border-white/10 text-text/70 hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Sonraki ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
