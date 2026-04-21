export type Warehouse = "IST" | "ANK" | "IZM";

export type StockStatus = "IN" | "OUT";

export type Stock = {
  id: number;

  // Product Info
  productName: string;
  sku: string;

  // Quantity
  quantity: number;

  // Location
  warehouse: Warehouse;

  // Status
  status: StockStatus;

  // Dates
  lastUpdated: string; // ISO string
  createdAt: string; // ISO string

  // Optional fields
  description?: string;
  price?: number;
};

const warehouses: Warehouse[] = ["IST", "ANK", "IZM"];
const statuses: StockStatus[] = ["IN", "OUT"];

const products = [
  "Nike Air Max",
  "Adidas Ultraboost",
  "Puma RS-X",
  "New Balance 574",
  "Asics Gel-Kayano",
  "Reebok Classic",
  "Under Armour HOVR",
  "Skechers D'Lites",
];

const descriptions = [
  "High performance running shoe",
  "Comfort daily sneaker",
  "Limited edition model",
  "Lightweight and breathable",
  "Best for training",
];

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

export const mockStocks: Stock[] = Array.from({ length: 50000 }).map((_, i) => {
  const created = randomDate(new Date(2025, 0, 1), new Date(2025, 6, 1));
  const updated = randomDate(created, new Date(2026, 3, 1));

  const quantity = Math.floor(Math.random() * 500);

  const status: StockStatus =
    quantity === 0 ? "OUT" : Math.random() > 0.2 ? "IN" : "OUT";

  return {
    id: i + 1,

    productName: products[i % products.length],
    sku: `SKU-${1000 + i}`,

    quantity,

    warehouse: warehouses[i % warehouses.length],

    status,

    createdAt: created.toISOString(),
    lastUpdated: updated.toISOString(),

    description: descriptions[Math.floor(Math.random() * descriptions.length)],

    price: Number((Math.random() * 5000 + 500).toFixed(2)),
  };
});
