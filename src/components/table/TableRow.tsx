import { memo } from "react";
import { flexRender } from "@tanstack/react-table";
import type { Table } from "@tanstack/react-table";
import type { Stock } from "../../types/stock";

export const TableRow = memo(function TableRow({
  rowId,
  isSelected,
  table,
  original, //sadece memo'nun takip etmesi için, direkt kullanmıyoruz
}: {
  rowId: string;
  isSelected: boolean;
  table: Table<Stock>;
  original: Stock;
}) {
  const row = table.getRow(rowId);

  return (
    <tr
      className={`border-b border-white/10 transition-colors  
    ${isSelected ? "bg-primary/10 dark:bg-surface/50" : "hover:bg-primary/5 dark:hover:bg-surface/20"}
  `}
    >
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="px-4 py-3 text-text">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
});
