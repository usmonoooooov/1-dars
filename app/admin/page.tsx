"use client";

import { useOrderStore } from "@/lib/order-store";
import { formatPrice } from "@/lib/utils";
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/types";
import Link from "next/link";

export default function AdminDashboard() {
  const orders = useOrderStore((s) => s.orders);

  const stats = {
    total: orders.length,
    paid: orders.filter((o) => o.status === "paid").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    totalRevenue: orders.reduce((s, o) => s + o.total, 0),
    commission: orders
      .filter((o) => o.status === "delivered")
      .reduce((s, o) => s + (o.commissionAmount ?? 0), 0),
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6" style={{ fontFamily: "var(--font-cormorant)", color: "var(--brand)" }}>
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {[
          { label: "Jami buyurtma", value: stats.total },
          { label: "To'langan (kutilayotgan)", value: stats.paid },
          { label: "Yetkazilgan", value: stats.delivered },
          { label: "Jami aylanma", value: formatPrice(stats.totalRevenue) },
          { label: "Komissiya daromad", value: formatPrice(stats.commission) },
          { label: "Settlement kerak", value: stats.paid },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-2xl border p-4" style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}>
            <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>{label}</p>
            <p className="text-xl font-semibold" style={{ color: "var(--brand)" }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">So'nggi buyurtmalar</h2>
          <Link href="/admin/orders" className="text-sm" style={{ color: "var(--brand)" }}>Barchasi</Link>
        </div>
        {orders.length === 0 ? (
          <p className="text-sm py-4 text-center" style={{ color: "var(--muted)" }}>Hali buyurtma yo'q</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["#", "Xaridor", "Sotuvchi", "Viloyat", "Summa", "Status"].map((h) => (
                    <th key={h} className="text-left py-2 pr-4 text-xs font-medium" style={{ color: "var(--muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((o) => (
                  <tr key={o.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                    <td className="py-2.5 pr-4 font-mono text-xs">{o.id}</td>
                    <td className="py-2.5 pr-4">{o.buyerName}</td>
                    <td className="py-2.5 pr-4" style={{ color: "var(--muted)" }}>{o.sellerName}</td>
                    <td className="py-2.5 pr-4" style={{ color: "var(--muted)" }}>{o.region}</td>
                    <td className="py-2.5 pr-4 font-medium">{formatPrice(o.total)}</td>
                    <td className="py-2.5">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: STATUS_COLORS[o.status] + "20", color: STATUS_COLORS[o.status] }}
                      >
                        {STATUS_LABELS[o.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
