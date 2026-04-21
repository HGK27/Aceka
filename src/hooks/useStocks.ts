// datalara ekleme, güncelleme, silme işlemlerini yöneten custom hook
import { useState, useCallback } from "react";
import { mockStocks } from "../data/mock-data";
import type { Stock, StockFormData } from "../types/stock";

export function useStocks() {
  const [stocks, setStocks] = useState<Stock[]>(mockStocks);

  const addStock = useCallback((data: StockFormData) => {
    const now = new Date().toISOString();
    const newStock: Stock = {
      ...data,
      id: Date.now(),
      createdAt: now,
      lastUpdated: now,
    };
    setStocks((prev) => [newStock, ...prev]);
    return newStock;
  }, []);

  const updateStock = useCallback((id: number, data: StockFormData) => {
    setStocks((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, ...data, lastUpdated: new Date().toISOString() }
          : s,
      ),
    );
  }, []);

  const deleteStock = useCallback((id: number) => {
    setStocks((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const deleteMany = useCallback((ids: number[]) => {
    const set = new Set(ids);
    setStocks((prev) => prev.filter((s) => !set.has(s.id)));
  }, []);

  return { stocks, addStock, updateStock, deleteStock, deleteMany };
}
