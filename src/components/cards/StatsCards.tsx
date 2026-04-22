import type { Stock } from "../../types/stock";
import { useMemo, memo, useState } from "react";
import InStockIcon from "../icons/InStockIcon";
import TotalStockIcon from "../icons/TotalStockIcon";
import OutStockIcon from "../icons/OutStockIcon";
import PackageIcon from "../icons/PackageIcon";
import EyeIcon from "../icons/EyeIcon";
import EyeOffIcon from "../icons/EyeOffIcon";

interface Props {
  stocks: Stock[];
}

export const StatsCards = memo(({ stocks }: Props) => {
  const [open, setOpen] = useState(true);

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

    return { total, inStock, outStock, totalQty };
  }, [stocks]);

  const cards = [
    { label: "Toplam Ürün", value: stats.total, icon: PackageIcon },
    { label: "Stokta", value: stats.inStock, icon: InStockIcon },
    { label: "Tükendi", value: stats.outStock, icon: OutStockIcon },
    { label: "Toplam Adet", value: stats.totalQty, icon: TotalStockIcon },
  ];

  return (
    <div className="space-y-3 border border-primary/20 p-5 rounded-2xl">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text">İstatistikler</h2>

        <button
          onClick={() => setOpen((p) => !p)}
          className="text-xs text-text/70 hover:text-text transition flex items-center gap-1"
        >
          <EyeIcon className={`w-4 h-4 ${open ? "hidden" : "block"}`} />
          <EyeOffIcon className={`w-4 h-4 ${open ? "block" : "hidden"}`} />
          {open ? "Gizle" : "Göster"}
        </button>
      </div>

      {/* COLLAPSE */}
      <div
        className={`grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-300 ${
          open
            ? "opacity-100 max-h-[500px]"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        {cards.map((c) => (
          <div
            key={c.label}
            className="bg-surface text-text rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-white/10 hover:shadow-md transition-all"
          >
            {/* ICON */}
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <c.icon />
            </div>
            {/* TEXT */}
            <div className="flex flex-col">
              <span className="text-xs text-text/60">{c.label}</span>
              <span className="text-xl font-bold text-text">
                {c.value.toLocaleString("tr-TR")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
