import { z } from "zod";

export const stockSchema = z.object({
  productName: z
    .string()
    .min(2, "Ürün adı en az 2 karakter olmalı")
    .max(50, "Ürün adı en fazla 50 karakter olabilir"),

  sku: z
    .string()
    .min(3, "SKU en az 3 karakter olmalı")
    .regex(/^[A-Z0-9\-]+$/, "SKU sadece büyük harf, rakam ve - içerebilir"),

  quantity: z
    .number({ error: "Geçerli bir miktar giriniz" })
    .int("Miktar tam sayı olmalı")
    .min(0, "Miktar 0'dan küçük olamaz")
    .max(99999, "Miktar çok büyük"),

  warehouse: z.enum(["IST", "ANK", "IZM"], "Geçerli bir depo seçiniz"),

  status: z.enum(["IN", "OUT"], "Geçerli bir durum seçiniz"),

  description: z.string().max(200, "Açıklama en fazla 200 karakter").optional(),

  price: z
    .number({ error: "Geçerli bir fiyat giriniz" })
    .min(0, "Fiyat 0'dan küçük olamaz")
    .max(999999, "Fiyat çok büyük")
    .optional(),
});

export type StockSchemaType = z.infer<typeof stockSchema>;
