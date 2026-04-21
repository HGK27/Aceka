import { useEffect, memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stockSchema } from "../../schemas/stockSchema";
import type { StockFormData, Stock } from "../../types/stock";
import { Input } from "../forms/input";
import { FormField } from "../forms/FormField";
import ModalButton from "../buttons/ModalButton";

interface Props {
  open: boolean;
  stock?: Stock | null;
  onClose: () => void;
  onSave: (data: StockFormData) => void;
}

export const StockModal = memo(({ open, stock, onClose, onSave }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    getValues, // ← ekle
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<StockFormData>({
    resolver: zodResolver(stockSchema),
  });

  useEffect(() => {
    if (open) {
      reset(stock || { warehouse: "IST", status: "IN", quantity: 0 });
    }
  }, [open, stock, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <form
        onSubmit={handleSubmit(onSave)}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold">{stock ? "Düzenle" : "Ekle"}</h2>
          <button type="button" onClick={onClose} className="cursor-pointer">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Product Name */}
          <FormField label="Ürün Adı *" error={errors.productName?.message}>
            <Input
              {...register("productName")}
              error={!!errors.productName}
              placeholder="Nike Air Max"
            />
          </FormField>
          {/* SKU */}
          <FormField label="SKU *" error={errors.sku?.message}>
            <Input
              {...register("sku")}
              error={!!errors.sku}
              placeholder="SKU-1001"
            />
          </FormField>
          {/* Quantity & Price */}
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Miktar *" error={errors.quantity?.message}>
              <div className="flex gap-2">
                <Input
                  type="number"
                  {...register("quantity", { valueAsNumber: true })}
                  error={!!errors.quantity}
                />
                <div className="flex gap-1">
                  {[100, 250].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => {
                        const current = getValues("quantity") || 0;
                        setValue("quantity", current + amount);
                      }}
                      className="px-2 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 cursor-pointer dark:hover:bg-indigo-50 rounded-lg transition-colors whitespace-nowrap"
                    >
                      +{amount}
                    </button>
                  ))}
                </div>
              </div>
            </FormField>

            <FormField label="Fiyat *" error={errors.price?.message}>
              <Input
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                error={!!errors.price}
              />
            </FormField>
          </div>
          {/* Warehouse & Status */}
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Depo *" error={errors.warehouse?.message}>
              <select
                {...register("warehouse")}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.warehouse ? "border-red-500" : "border-slate-300"
                }`}
              >
                <option value="IST">İstanbul</option>
                <option value="ANK">Ankara</option>
                <option value="IZM">İzmir</option>
              </select>
            </FormField>

            <FormField label="Durum *" error={errors.status?.message}>
              <select
                {...register("status")}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.status ? "border-red-500" : "border-slate-300"
                }`}
              >
                <option value="IN">Stokta</option>
                <option value="OUT">Tükendi</option>
              </select>
            </FormField>
          </div>

          {/* Description */}
          <FormField label="Açıklama" error={errors.description?.message}>
            <textarea
              {...register("description")}
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.description ? "border-red-500" : "border-slate-300"
              }`}
              placeholder="Ürünle ilgili açıklama..."
              rows={3}
            />
          </FormField>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t flex justify-end gap-3">
          <ModalButton variant="secondary" type="button" onClick={onClose}>
            İptal
          </ModalButton>
          <ModalButton variant="primary" type="submit" disabled={isSubmitting}>
            {stock ? "Güncelle" : "Ekle"}
          </ModalButton>
        </div>
      </form>
    </div>
  );
});
