import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface UserStore {
  data: Product[];
  addToUserList: (product: Product) => void;
  removeFromProduct: (productId: number) => void;
  setUpdate: (product: Product) => void;
}

export const UserListStore = create<UserStore>()(
  persist(
    (set) => ({
      data: [],
      addToUserList: (product) =>
        set((state) => ({ data: [...state.data, product] })),
      removeFromProduct: (id) =>
        set((state) => ({ data: state.data.filter((p) => p.id !== id) })),
      setUpdate: (updatedProduct) =>
        set((state) => ({
          data: state.data.map((item) =>
            item.id === updatedProduct.id ? updatedProduct : item
          ),
        })),
    }),
    {
      name: "user-store",
      partialize: (state) => ({
        data: state.data,
      }),
    }
  )
);
