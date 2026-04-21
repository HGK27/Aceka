import { memo } from "react";
import ModalButton from "../buttons/ModalButton";
import BasketIcon from "../icons/BasketIcon";

interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  count?: number;
}

export const DeleteConfirmModal = memo(
  ({ open, onConfirm, onCancel, count }: Props) => {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onCancel}
        />
        <div className="relative w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl p-6 text-center space-y-4">
          <div className="w-12 h-12 flex items-center justify-center mx-auto">
            <BasketIcon />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {count === 1
                ? "Seçili ürünü silmek istediğinize emin misiniz?"
                : `Seçili ${count} ürünü silmek istediğinize emin misiniz?`}
            </h3>
          </div>
          <div className="flex gap-3 justify-center">
            <ModalButton onClick={onCancel} variant="secondary">
              İptal
            </ModalButton>
            <ModalButton onClick={onConfirm} variant="primary">
              Evet, Sil
            </ModalButton>
          </div>
        </div>
      </div>
    );
  },
);
