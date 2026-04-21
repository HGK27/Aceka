import type { Stock } from "../../types/stock";
import { useMemo, memo } from "react";

interface Props {
  stocks: Stock[];
}

export const StatsCards = memo(({ stocks }: Props) => {
  const stats = useMemo(() => {
    let total = stocks.length;
    let inStock = 0;
    let outStock = 0;
    let totalQty = 0;

    for (const s of stocks) {
      if (s.status === "IN") inStock++;
      if (s.status === "OUT") outStock++;
      totalQty += s.quantity;
    }

    return {
      total,
      inStock,
      outStock,
      totalQty,
    };
  }, [stocks]);

  const cards = [
    {
      label: "Toplam Ürün",
      value: stats.total.toLocaleString("tr-TR"),
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Stokta",
      value: stats.inStock.toLocaleString("tr-TR"),
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Tükendi",
      value: stats.outStock.toLocaleString("tr-TR"),
      color: "bg-red-50 text-red-600",
    },
    {
      label: "Toplam Adet",
      value: stats.totalQty.toLocaleString("tr-TR"),
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center"
        >
          <div
            className={`w-full h-full rounded-xl p-4 flex items-center justify-center text-lg ${c.color}`}
          >
            <p className="text-xs text-slate-500 font-medium mr-4">
              {c.label}:
            </p>
            <p className="text-xl font-bold text-slate-800">{c.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
});
