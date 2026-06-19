"use client";

import { useOrderStore } from "@/lib/order-store";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

export default function SettlementPage() {
  const { orders, updateStatus } = useOrderStore();

  const readyForSettlement = orders.filter((o) => o.status === "shipped");

  const grouped = readyForSettlement.reduce<Record<string, typeof orders>>((acc, o) => {
    if (!acc[o.sellerName]) acc[o.sellerName] = [];
    acc[o.sellerName].push(o);
    return acc;
  }, {});

  function settleAll(sellerName: string) {
    const sellerOrders = grouped[sellerName];
    sellerOrders.forEach((o) => updateStatus(o.id, "delivered"));
    toast.success(`${sellerName} uchun settlement amalga oshirildi!`);
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-2" style={{ fontFamily: "var(--font-cormorant)", color: "var(--brand)" }}>
        Settlement
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
        Yetkazilgan buyurtmalar uchun sotuvchilarga to'lov (−15% komissiya)
      </p>

      {readyForSettlement.length === 0 ? (
        <div
          className="rounded-2xl border p-8 text-center"
          style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}
        >
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Settlement kerak bo'lgan buyurtma yo'q
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {Object.entries(grouped).map(([seller, sellerOrders]) => {
            const gross = sellerOrders.reduce((s, o) => s + o.subtotal, 0);
            const commission = sellerOrders.reduce((s, o) => s + (o.commissionAmount ?? 0), 0);
            const net = gross - commission;

            return (
              <div
                key={seller}
                className="rounded-2xl border p-5"
                style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-semibold">{seller}</h2>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>
                      {sellerOrders.length} ta buyurtma
                    </p>
                  </div>
                  <button
                    onClick={() => settleAll(seller)}
                    className="px-4 py-2 rounded-xl text-white text-sm font-medium transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#16a34a" }}
                  >
                    To'lov amalga oshirildi ✓
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Brutto", value: formatPrice(gross) },
                    { label: "Komissiya (15%)", value: formatPrice(commission), brand: true },
                    { label: "Sotuvchiga (net)", value: formatPrice(net) },
                  ].map(({ label, value, brand }) => (
                    <div key={label} className="rounded-xl p-3" style={{ backgroundColor: "var(--bg)" }}>
                      <p className="text-xs mb-0.5" style={{ color: "var(--muted)" }}>{label}</p>
                      <p className="font-semibold text-sm" style={{ color: brand ? "var(--brand)" : "var(--text)" }}>{value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1">
                  {sellerOrders.map((o) => (
                    <div key={o.id} className="flex justify-between text-xs py-1.5 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                      <span style={{ color: "var(--muted)" }}>#{o.id} · {o.buyerName}</span>
                      <span className="font-medium">{formatPrice(o.subtotal)}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
