"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Order } from "./types";

type OrderStore = {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateStatus: (
    orderId: string,
    status: Order["status"],
    extra?: Partial<Order>
  ) => void;
  getByBuyer: (buyerId: string) => Order[];
  getBySeller: (sellerId: string) => Order[];
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => set({ orders: [order, ...get().orders] }),

      updateStatus: (orderId, status, extra = {}) =>
        set({
          orders: get().orders.map((o) =>
            o.id === orderId
              ? { ...o, status, updatedAt: new Date().toISOString(), ...extra }
              : o
          ),
        }),

      getByBuyer: (buyerId) =>
        get().orders.filter((o) => o.buyerId === buyerId),

      getBySeller: (sellerId) =>
        get().orders.filter((o) => o.sellerId === sellerId),
    }),
    { name: "lolamarket-orders" }
  )
);
