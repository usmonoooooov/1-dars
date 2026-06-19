"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { useOrderStore } from "@/lib/order-store";
import { formatPrice } from "@/lib/utils";
import { STATUS_LABELS, STATUS_COLORS, OrderStatus } from "@/lib/types";
import toast from "react-hot-toast";

const ACTIONS: Partial<Record<OrderStatus, { next: OrderStatus; label: string }>> = {
  paid: { next: "confirmed", label: "Tasdiqlash" },
  confirmed: { next: "shipped", label: "Jo'natildi" },
  shipped: { next: "delivered", label: "Yetkazildi" },
};

export default function SellerOrdersPage() {
  const user = useAuthStore((s) => s.user);
  const { orders, updateStatus } = useOrderStore();
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});

  if (!user) return null;

  const myOrders = orders.filter((o) => o.sellerId === user.id || user.role === "admin");

  function handleAction(orderId: string, next: OrderStatus) {
    const extra = next === "shipped" && trackingInputs[orderId]
      ? { btsTrackingNo: trackingInputs[orderId] }
      : {};
    updateStatus(orderId, next, extra);
    toast.success(`Status: ${STATUS_LABELS[next]}`);
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6" style={{ fontFamily: "var(--font-cormorant)", color: "var(--brand)" }}>
        Buyurtmalar
      </h1>
      {myOrders.length === 0 ? (
        <p className="text-sm py-8 text-center" style={{ color: "var(--muted)" }}>Buyurtma yo'q</p>
      ) : (
        <div className="flex flex-col gap-3">
          {myOrders.map((order) => {
            const action = ACTIONS[order.status];
            return (
              <div
                key={order.id}
                className="rounded-2xl border p-5"
                style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium">#{order.id}</p>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>
                      {order.buyerName} · {order.buyerPhone} · {order.region}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                      {new Date(order.createdAt).toLocaleDateString("uz-UZ")}
                    </p>
                  </div>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ backgroundColor: STATUS_COLORS[order.status] + "20", color: STATUS_COLORS[order.status] }}
                  >
                    {STATUS_LABELS[order.status]}
                  </span>
                </div>

                <div className="flex flex-col gap-1 mb-3">
                  {order.items.map((item) => (
                    <p key={item.productId} className="text-sm">
                      {item.productName} × {item.quantity} rulon —{" "}
                      <span className="font-medium">{formatPrice(item.pricePerMeter * item.metersPerRoll * item.quantity)}</span>
                    </p>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold" style={{ color: "var(--brand)" }}>
                    Jami: {formatPrice(order.total)}
                  </p>
                  {action && (
                    <div className="flex items-center gap-2">
                      {action.next === "shipped" && (
                        <input
                          type="text"
                          placeholder="BTS raqami"
                          value={trackingInputs[order.id] ?? ""}
                          onChange={(e) =>
                            setTrackingInputs((p) => ({ ...p, [order.id]: e.target.value }))
                          }
                          className="border rounded-lg px-3 py-1.5 text-xs outline-none w-32"
                          style={{ borderColor: "var(--border)" }}
                        />
                      )}
                      <button
                        onClick={() => handleAction(order.id, action.next)}
                        className="px-4 py-1.5 rounded-xl text-white text-xs font-medium transition-opacity hover:opacity-90"
                        style={{ backgroundColor: "var(--brand)" }}
                      >
                        {action.label}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
