import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import type { Stock } from "../../types/stock";
import {
  warehouseLabel,
  formatDate,
  formatPrice,
} from "../../helpers/Formatter";

const col = createColumnHelper<Stock>();

export function stockColumns(
  onEdit: (stock: Stock) => void,
  onDelete: (id: number) => void,
): ColumnDef<Stock, any>[] {
  return [
    // Checkbox select
    col.display({
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          className="w-4 h-4 accent-indigo-600 cursor-pointer"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="w-4 h-4 accent-indigo-600 cursor-pointer"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      size: 40,
      enableSorting: false,
    }),

    col.accessor("id", {
      header: "ID",
      size: 60,
      cell: (info) => (
        <span className="text-slate-400 text-xs font-mono">
          #{info.getValue()}
        </span>
      ),
    }),

    col.accessor("productName", {
      header: "Ürün Adı",
      cell: (info) => (
        <div>
          <p className="font-semibold text-slate-800 text-sm">
            {info.getValue()}
          </p>
          {info.row.original.description && (
            <p className="text-xs text-slate-400 truncate">
              {info.row.original.description}
            </p>
          )}
        </div>
      ),
    }),

    col.accessor("sku", {
      header: "SKU",
      cell: (info) => (
        <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
          {info.getValue()}
        </span>
      ),
    }),

    col.accessor("quantity", {
      header: "Adet",
      cell: (info) => {
        const qty: number = info.getValue();
        const color =
          qty === 0
            ? "text-red-600"
            : qty < 20
              ? "text-orange-500"
              : "text-emerald-600";
        return (
          <span className={`font-bold text-sm ${color}`}>
            {qty.toLocaleString("tr-TR")}
          </span>
        );
      },
    }),

    col.accessor("warehouse", {
      header: "Depo",
      cell: (info) => {
        const w = info.getValue() as string;
        const colors: Record<string, string> = {
          IST: "bg-blue-100 text-blue-700",
          ANK: "bg-purple-100 text-purple-700",
          IZM: "bg-teal-100 text-teal-700",
        };
        return (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors[w]}`}
          >
            {warehouseLabel[w]}
          </span>
        );
      },
    }),

    col.accessor("status", {
      header: "Durum",
      cell: (info) => {
        const s = info.getValue() as string;
        return s === "IN" ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Stokta
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
            Tükendi
          </span>
        );
      },
    }),

    col.accessor("price", {
      header: "Fiyat",
      cell: (info) => (
        <span className="text-sm text-slate-700">
          {formatPrice(info.getValue())}
        </span>
      ),
    }),

    col.accessor("lastUpdated", {
      header: "Son Güncelleme",
      cell: (info) => (
        <span className="text-xs text-slate-500">
          {formatDate(info.getValue())}
        </span>
      ),
    }),

    col.display({
      id: "actions",
      header: "",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex gap-1.5 justify-end">
          <button
            onClick={() => onEdit(row.original)}
            className="px-2.5 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
          >
            Düzenle
          </button>
          <button
            onClick={() => onDelete(row.original.id)}
            className="px-2.5 py-1 text-xs font-medium text-red-500 hover:bg-red-50 rounded-md transition-colors"
          >
            Sil
          </button>
        </div>
      ),
    }),
  ];
}
