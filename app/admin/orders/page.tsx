"use client";

import { useState } from "react";
import { useOrderStore } from "@/lib/order-store";
import { formatPrice } from "@/lib/utils";
import { STATUS_LABELS, STATUS_COLORS, OrderStatus } from "@/lib/types";
import Link from "next/link";
import toast from "react-hot-toast";

const ALL_STATUSES: OrderStatus[] = ["created", "paid", "confirmed", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const { orders, updateStatus } = useOrderStore();
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  function handleRefund(orderId: string) {
    if (!confirm("Refund qilishni tasdiqlaysizmi?")) return;
    updateStatus(orderId, "cancelled");
    toast.success("Bekor qilindi. Provayder panelida qaytarish bajaring.");
  }

  function handleSettle(orderId: string) {
    updateStatus(orderId, "delivered");
    toast.success("Settlement amalga oshirildi!");
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4" style={{ fontFamily: "var(--font-cormorant)", color: "var(--brand)" }}>
        Barcha buyurtmalar
      </h1>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-4">
        <button
          onClick={() => setFilter("all")}
          className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
          style={{ backgroundColor: filter === "all" ? "var(--brand)" : "var(--border)", color: filter === "all" ? "#fff" : "var(--text)" }}
        >
          Hammasi ({orders.length})
        </button>
        {ALL_STATUSES.map((s) => {
          const count = orders.filter((o) => o.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
              style={{ backgroundColor: filter === s ? STATUS_COLORS[s] : STATUS_COLORS[s] + "20", color: filter === s ? "#fff" : STATUS_COLORS[s] }}
            >
              {STATUS_LABELS[s]} ({count})
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.length === 0 && (
          <p className="text-sm py-8 text-center" style={{ color: "var(--muted)" }}>Buyurtma yo'q</p>
        )}
        {filtered.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border p-5"
            style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <p className="font-medium">#{order.id}</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  {order.buyerName} · {order.buyerPhone} · {order.region}
                </p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  Sotuvchi: {order.sellerName} · {new Date(order.createdAt).toLocaleDateString("uz-UZ")}
                </p>
              </div>
              <span
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ backgroundColor: STATUS_COLORS[order.status] + "20", color: STATUS_COLORS[order.status] }}
              >
                {STATUS_LABELS[order.status]}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs mb-3">
              <div className="rounded-lg p-2" style={{ backgroundColor: "var(--bg)" }}>
                <p style={{ color: "var(--muted)" }}>Tovar</p>
                <p className="font-medium">{formatPrice(order.subtotal)}</p>
              </div>
              <div className="rounded-lg p-2" style={{ backgroundColor: "var(--bg)" }}>
                <p style={{ color: "var(--muted)" }}>Yetkazish</p>
                <p className="font-medium">{formatPrice(order.deliveryPrice)}</p>
              </div>
              <div className="rounded-lg p-2" style={{ backgroundColor: "var(--bg)" }}>
                <p style={{ color: "var(--muted)" }}>Komissiya 15%</p>
                <p className="font-medium" style={{ color: "var(--brand)" }}>
                  {formatPrice(order.commissionAmount ?? 0)}
                </p>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Link href={`/orders/${order.id}`} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-gray-50" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
                Ko'rish
              </Link>
              {order.status === "shipped" && (
                <button
                  onClick={() => handleSettle(order.id)}
                  className="text-xs px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#16a34a" }}
                >
                  Settlement (yetkazildi)
                </button>
              )}
              {(order.status === "paid" || order.status === "confirmed") && (
                <button
                  onClick={() => handleRefund(order.id)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                >
                  Refund / Bekor
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
