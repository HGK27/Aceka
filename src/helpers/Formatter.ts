export const warehouseLabel: Record<string, string> = {
  IST: "İstanbul",
  ANK: "Ankara",
  IZM: "İzmir",
};

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatPrice(price?: number) {
  if (price == null) return "—";
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(price);
}
