export type Warehouse = "IST" | "ANK" | "IZM";
export type StockStatus = "IN" | "OUT";

export type Stock = {
  id: number;
  productName: string;
  sku: string;
  quantity: number;
  warehouse: Warehouse;
  status: StockStatus;
  lastUpdated: string;
  createdAt: string;
  description?: string;
  price?: number;
};

export type StockFormData = Omit<Stock, "id" | "createdAt" | "lastUpdated">;

export type StockFilters = {
  search: string;
  warehouse: Warehouse | "ALL";
  status: StockStatus | "ALL";
};
