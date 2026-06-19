"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import { useOrderStore } from "@/lib/order-store";
import { formatPrice } from "@/lib/utils";
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/types";
import { useEffect } from "react";

export default function OrdersPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const getByBuyer = useOrderStore((s) => s.getByBuyer);

  useEffect(() => {
    if (!user) router.replace("/auth");
  }, [user, router]);

  if (!user) return null;

  const orders = getByBuyer(user.id);

  if (orders.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="text-5xl mb-4">📦</p>
        <h2 className="text-2xl font-semibold mb-2" style={{ fontFamily: "var(--font-cormorant)" }}>
          Buyurtmalar yo'q
        </h2>
        <Link href="/catalog" className="inline-block mt-4 px-6 py-3 rounded-xl text-white text-sm" style={{ backgroundColor: "var(--brand)" }}>
          Xarid qilish
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6" style={{ fontFamily: "var(--font-cormorant)", color: "var(--brand)" }}>
        Buyurtmalarim
      </h1>
      <div className="flex flex-col gap-3">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="block rounded-2xl border p-5 transition-shadow hover:shadow-md"
            style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-medium text-sm mb-0.5">#{order.id}</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  {new Date(order.createdAt).toLocaleDateString("uz-UZ")} · {order.sellerName}
                </p>
              </div>
              <span
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ backgroundColor: STATUS_COLORS[order.status] + "20", color: STATUS_COLORS[order.status] }}
              >
                {STATUS_LABELS[order.status]}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {order.items.map((i) => i.productName).join(", ")}
              </p>
              <p className="font-semibold text-sm" style={{ color: "var(--brand)" }}>
                {formatPrice(order.total)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
