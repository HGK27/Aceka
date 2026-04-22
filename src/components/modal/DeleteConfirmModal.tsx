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
        {/* BACKDROP */}
        <div
          className="absolute inset-0 bg-background/60 backdrop-blur-sm"
          onClick={onCancel}
        />

        {/* MODAL */}
        <div className="relative w-full max-w-sm mx-4 bg-surface border border-white/10 text-text rounded-2xl shadow-2xl p-6 text-center space-y-4">
          {/* ICON */}
          <div className="w-12 h-12 flex items-center justify-center mx-auto text-primary">
            <BasketIcon />
          </div>

          {/* TITLE */}
          <div>
            <h3 className="text-lg font-bold">
              {count === 1
                ? "Seçili ürünü silmek istediğinize emin misiniz?"
                : `Seçili ${count} ürünü silmek istediğinize emin misiniz?`}
            </h3>
          </div>

          {/* ACTIONS */}
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
