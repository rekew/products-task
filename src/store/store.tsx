import { create } from "zustand";
import { persist } from "zustand/middleware";

//первый раз работаю с get-ом, поэтому иногда пробую разные способы обновление состояние и сравниваю

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

interface Store {
  data: Product[];
  favorites: Product[];
  error: string | null;
  loading: boolean;
  fetchData: () => Promise<void>;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  removeFromProduct: (productId: number) => void;
  addToList: (product: Product) => void;
  updateProduct: (product: Product) => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      data: [],
      favorites: [],
      error: null,
      loading: false,
      fetchData: async () => {
        set({ loading: true, error: null });
        try {
          const res = await fetch("https://fakestoreapi.com/products");
          if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
          }
          const json = await res.json();
          set({ data: json, loading: false });
        } catch (err: any) {
          set({ error: err.message, loading: false });
          console.error("Fetch Error", err);
        }
      },

      addToFavorites: (product) => {
        const favorites = get().favorites;
        if (!favorites.find((p) => p.id === product.id)) {
          set({ favorites: [...favorites, product] });
        }
      },

      removeFromFavorites: (productId) => {
        const favorites = get().favorites;
        set({ favorites: favorites.filter((p) => p.id !== productId) });
      },
      removeFromProduct: (productId) => {
        const data = get().data;
        set({ data: data.filter((p) => p.id !== productId) });
      },
      addToList: (product) =>
        set((state) => ({ data: [...state.data, product] })),
      updateProduct: (updatedProduct) => {
        const data = get().data;
        const updatedData = data.map((item) =>
          item.id === updatedProduct.id ? updatedProduct : item
        );
        set({ data: updatedData });
      },
    }),

    {
      name: "my-store",
      partialize: (state) => ({
        data: state.data,
        favorites: state.favorites,
      }),
    }
  )
);
