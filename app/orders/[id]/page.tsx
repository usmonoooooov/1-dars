"use client";

import { use } from "react";
import Link from "next/link";
import { useOrderStore } from "@/lib/order-store";
import { formatPrice } from "@/lib/utils";
import { STATUS_LABELS, STATUS_COLORS, OrderStatus } from "@/lib/types";

const STEPS: OrderStatus[] = ["created", "paid", "confirmed", "shipped", "delivered"];

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const orders = useOrderStore((s) => s.orders);
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
          Buyurtma topilmadi
        </p>
        <Link href="/orders" className="text-sm" style={{ color: "var(--brand)" }}>
          Orqaga
        </Link>
      </div>
    );
  }

  const currentStep = order.status === "cancelled" ? -1 : STEPS.indexOf(order.status);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/orders" className="inline-flex items-center gap-2 text-sm mb-6" style={{ color: "var(--muted)" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Buyurtmalar
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold mb-1" style={{ fontFamily: "var(--font-cormorant)", color: "var(--brand)" }}>
            #{order.id}
          </h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {new Date(order.createdAt).toLocaleDateString("uz-UZ")} · {order.sellerName}
          </p>
        </div>
        <span
          className="text-sm px-3 py-1.5 rounded-full font-medium"
          style={{ backgroundColor: STATUS_COLORS[order.status] + "20", color: STATUS_COLORS[order.status] }}
        >
          {STATUS_LABELS[order.status]}
        </span>
      </div>

      {/* Status timeline */}
      {order.status !== "cancelled" && (
        <div
          className="rounded-2xl border p-5 mb-4"
          style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}
        >
          <h2 className="font-semibold mb-4 text-sm">Buyurtma holati</h2>
          <div className="flex items-center gap-0">
            {STEPS.map((step, i) => {
              const done = i <= currentStep;
              const active = i === currentStep;
              return (
                <div key={step} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-colors text-xs font-bold"
                      style={{
                        backgroundColor: done ? "var(--brand)" : "var(--border)",
                        color: done ? "#fff" : "var(--muted)",
                        transform: active ? "scale(1.2)" : "scale(1)",
                      }}
                    >
                      {done && i < currentStep ? "✓" : i + 1}
                    </div>
                    <p className="text-[10px] mt-1 text-center w-14" style={{ color: done ? "var(--brand)" : "var(--muted)" }}>
                      {STATUS_LABELS[step]}
                    </p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className="flex-1 h-0.5 mx-1 mb-4"
                      style={{ backgroundColor: i < currentStep ? "var(--brand)" : "var(--border)" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          {order.btsTrackingNo && (
            <p className="text-xs mt-4" style={{ color: "var(--muted)" }}>
              BTS tracking: <strong style={{ color: "var(--text)" }}>{order.btsTrackingNo}</strong>
            </p>
          )}
        </div>
      )}

      {/* Items */}
      <div className="rounded-2xl border p-5 mb-4" style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}>
        <h2 className="font-semibold mb-3 text-sm">Mahsulotlar</h2>
        {order.items.map((item) => (
          <div key={item.productId} className="flex justify-between text-sm py-2 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
            <span>
              {item.productName} <span style={{ color: "var(--muted)" }}>× {item.quantity} rulon</span>
            </span>
            <span className="font-medium">
              {formatPrice(item.pricePerMeter * item.metersPerRoll * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Price breakdown */}
      <div className="rounded-2xl border p-5 mb-4" style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}>
        <div className="flex justify-between text-sm mb-2">
          <span style={{ color: "var(--muted)" }}>Tovarlar</span>
          <span>{formatPrice(order.subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span style={{ color: "var(--muted)" }}>Yetkazib berish ({order.region})</span>
          <span>{formatPrice(order.deliveryPrice)}</span>
        </div>
        <div className="flex justify-between font-semibold pt-2 border-t" style={{ borderColor: "var(--border)" }}>
          <span>Jami</span>
          <span style={{ color: "var(--brand)" }}>{formatPrice(order.total)}</span>
        </div>
      </div>

      {/* Delivery info */}
      <div className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}>
        <h2 className="font-semibold mb-2 text-sm">Yetkazib berish ma'lumotlari</h2>
        <p className="text-sm mb-1"><span style={{ color: "var(--muted)" }}>Viloyat:</span> {order.region}</p>
        <p className="text-sm mb-1"><span style={{ color: "var(--muted)" }}>Manzil:</span> {order.address}</p>
        <p className="text-sm"><span style={{ color: "var(--muted)" }}>To'lov:</span> {order.paymentMethod === "payme" ? "Payme" : "Click"}</p>
      </div>
    </div>
  );
}
