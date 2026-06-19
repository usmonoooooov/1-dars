"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "./types";

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => { ok: boolean; error?: string };
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
  total: () => number;
  rollCount: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items;
        if (existing.length > 0 && existing[0].sellerId !== item.sellerId) {
          return {
            ok: false,
            error: "Savatda boshqa sotuvchi mahsuloti bor. Avval savatni tozalang.",
          };
        }
        const found = existing.find((i) => i.productId === item.productId);
        if (found) {
          set({
            items: existing.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...existing, item] });
        }
        return { ok: true };
      },

      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.productId !== productId) }),

      updateQty: (productId, qty) => {
        if (qty < 1) return;
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, quantity: qty } : i
          ),
        });
      },

      clear: () => set({ items: [] }),

      total: () =>
        get().items.reduce(
          (sum, i) => sum + i.pricePerMeter * i.metersPerRoll * i.quantity,
          0
        ),

      rollCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "lolamarket-cart" }
  )
);
