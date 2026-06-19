"use client";

import { useAuthStore } from "@/lib/auth-store";
import { useOrderStore } from "@/lib/order-store";
import { formatPrice } from "@/lib/utils";
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/types";
import Link from "next/link";

export default function SellerDashboard() {
  const user = useAuthStore((s) => s.user);
  const getBySeller = useOrderStore((s) => s.getBySeller);

  if (!user) return null;
  const orders = getBySeller(user.id);

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "paid").length,
    revenue: orders
      .filter((o) => o.status === "delivered")
      .reduce((s, o) => s + o.subtotal * 0.85, 0),
    commission: orders
      .filter((o) => o.status === "delivered")
      .reduce((s, o) => s + (o.commissionAmount ?? 0), 0),
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6" style={{ fontFamily: "var(--font-cormorant)", color: "var(--brand)" }}>
        Kabinet — {user.name}
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Jami buyurtma", value: stats.total },
          { label: "Kutilayotgan", value: stats.pending },
          { label: "Daromad (net)", value: formatPrice(stats.revenue) },
          { label: "Komissiya (15%)", value: formatPrice(stats.commission) },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-2xl border p-4"
            style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}
          >
            <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>{label}</p>
            <p className="text-xl font-semibold" style={{ color: "var(--brand)" }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">So'nggi buyurtmalar</h2>
          <Link href="/seller/orders" className="text-sm" style={{ color: "var(--brand)" }}>
            Barchasi
          </Link>
        </div>
        {orders.length === 0 ? (
          <p className="text-sm py-4 text-center" style={{ color: "var(--muted)" }}>
            Hali buyurtma yo'q
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {orders.slice(0, 5).map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="flex items-center justify-between py-2 border-b last:border-0 hover:opacity-70 transition-opacity"
                style={{ borderColor: "var(--border)" }}
              >
                <div>
                  <p className="text-sm font-medium">#{order.id}</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>{order.buyerName} · {order.region}</p>
                </div>
                <div className="text-right">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: STATUS_COLORS[order.status] + "20", color: STATUS_COLORS[order.status] }}
                  >
                    {STATUS_LABELS[order.status]}
                  </span>
                  <p className="text-xs mt-1 font-medium">{formatPrice(order.subtotal)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
