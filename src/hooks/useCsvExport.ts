// hooks/useCsvExport.ts
import { useCallback } from "react";
import type { Table } from "@tanstack/react-table";
import type { Stock } from "../types/stock";

// Hangi kolonların export edileceği ve başlıkları
const EXPORT_COLUMNS: { key: keyof Stock; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "productName", label: "Ürün Adı" },
  { key: "sku", label: "SKU" },
  { key: "quantity", label: "Adet" },
  { key: "warehouse", label: "Depo" },
  { key: "status", label: "Durum" },
  { key: "price", label: "Fiyat" },
  { key: "lastUpdated", label: "Son Güncelleme" },
];

function stocksToCsv(stocks: Stock[]): string {
  const header = EXPORT_COLUMNS.map((c) => c.label).join(",");
  const rows = stocks.map((s) =>
    EXPORT_COLUMNS.map(({ key }) => {
      const val = s[key] ?? "";
      // Virgül veya tırnak içeren değerleri quote'la
      const str = String(val);
      return str.includes(",") || str.includes('"')
        ? `"${str.replace(/"/g, '""')}"`
        : str;
    }).join(","),
  );
  return [header, ...rows].join("\n");
}

function downloadCsv(content: string, filename: string) {
  // BOM ekle — Excel Türkçe karakterleri doğru okusun
  const bom = "\uFEFF";
  const blob = new Blob([bom + content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function useCsvExport(table: Table<Stock>) {
  const exportAll = useCallback(() => {
    const stocks = table.getCoreRowModel().rows.map((r) => r.original);
    downloadCsv(stocksToCsv(stocks), "stoklar-tumu.csv");
  }, [table]);

  const exportSelected = useCallback(() => {
    const stocks = table.getSelectedRowModel().rows.map((r) => r.original);
    downloadCsv(stocksToCsv(stocks), "stoklar-secili.csv");
  }, [table]);

  return { exportAll, exportSelected };
}
