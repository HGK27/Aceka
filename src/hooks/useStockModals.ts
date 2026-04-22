import { useState, useCallback } from "react";
import type { StockFormData, Stock } from "../types/stock";

export function useStockModals(
  deleteStock: (id: number) => void,
  deleteMany: (ids: number[]) => void,
  addStock: (data: StockFormData) => Stock,
  updateStock: (id: number, data: StockFormData) => void,
) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStock, setEditingStock] = useState<Stock | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [deleteManyTarget, setDeleteManyTarget] = useState<number[]>([]);

  const handleEdit = useCallback((stock: Stock) => {
    setEditingStock(stock);
    setModalOpen(true);
  }, []);

  const handleDeleteClick = useCallback((id: number) => {
    setDeleteTarget(id);
  }, []);

  const handleDeleteManyClick = useCallback((ids: number[]) => {
    setDeleteManyTarget(ids);
  }, []);

  const handleSave = useCallback(
    (data: StockFormData) => {
      if (editingStock) {
        updateStock(editingStock.id, data);
      } else {
        addStock(data);
      }
      setModalOpen(false);
      setEditingStock(null);
    },
    [editingStock, updateStock, addStock],
  );

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setEditingStock(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (deleteTarget !== null) deleteStock(deleteTarget);
    setDeleteTarget(null);
  }, [deleteTarget, deleteStock]);

  const handleConfirmDeleteMany = useCallback(() => {
    deleteMany(deleteManyTarget);
    setDeleteManyTarget([]);
  }, [deleteManyTarget, deleteMany]);

  return {
    // state
    modalOpen,
    editingStock,
    deleteTarget,
    deleteManyTarget,
    // handlers
    setDeleteTarget,
    setDeleteManyTarget,
    handleEdit,
    handleDeleteClick,
    handleDeleteManyClick,
    handleSave,
    handleCloseModal,
    handleConfirmDelete,
    handleConfirmDeleteMany,
    // actions
    openAddModal: useCallback(() => {
      setEditingStock(null);
      setModalOpen(true);
    }, []),
  };
}
