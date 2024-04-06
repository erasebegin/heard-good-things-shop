import { create } from "zustand";

type CartState = {
  items: string[];
  addItem: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
};

const useCart = create<CartState>((set) => ({
  items: [],
  addItem: (itemId) => set((state) => ({ items: [...state.items, itemId] })),
  removeItem: (itemId) =>
    set((state) => ({ items: state.items.filter((i) => i !== itemId) })),
  clearCart: () => set({ items: [] }),
}));

export default useCart;
