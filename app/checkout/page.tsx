"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { useAuthStore } from "@/lib/auth-store";
import { useOrderStore } from "@/lib/order-store";
import { formatPrice, REGIONS, DELIVERY_PRICES, genId } from "@/lib/utils";
import { Order } from "@/lib/types";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const { items, total, clear } = useCartStore();
  const addOrder = useOrderStore((s) => s.addOrder);

  const [region, setRegion] = useState(user?.region ?? "");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<"payme" | "click">("payme");
  const [loading, setLoading] = useState(false);

  if (!user) {
    router.replace("/auth");
    return null;
  }
  if (items.length === 0) {
    router.replace("/catalog");
    return null;
  }

  const deliveryPrice = DELIVERY_PRICES[region] ?? 0;
  const subtotal = total();
  const grandTotal = subtotal + deliveryPrice;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!region || !address.trim()) { toast.error("Viloyat va manzilni kiriting"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const order: Order = {
      id: genId(),
      buyerId: user!.id,
      buyerName: user!.name,
      buyerPhone: user!.phone,
      sellerId: items[0].sellerId,
      sellerName: items[0].seller,
      items: items.map((i) => ({
        productId: i.productId,
        productName: i.productName,
        material: i.material,
        quantity: i.quantity,
        pricePerMeter: i.pricePerMeter,
        metersPerRoll: i.metersPerRoll,
      })),
      subtotal,
      deliveryPrice,
      total: grandTotal,
      status: "paid",
      region,
      address: address.trim(),
      paymentMethod: payment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      commissionAmount: Math.round(subtotal * 0.15),
    };

    addOrder(order);
    clear();
    toast.success("Buyurtma muvaffaqiyatli berildi!");
    router.push(`/payment/success?orderId=${order.id}`);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1
        className="text-3xl font-semibold mb-6"
        style={{ fontFamily: "var(--font-cormorant)", color: "var(--brand)" }}
      >
        Buyurtma berish
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Delivery */}
          <div className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}>
            <h2 className="font-semibold mb-4">Yetkazib berish</h2>
            <div className="flex flex-col gap-3">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6B1020] bg-white transition-colors"
                style={{ borderColor: "var(--border)" }}
                required
              >
                <option value="">Viloyatni tanlang</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>{r} — {formatPrice(DELIVERY_PRICES[r])}</option>
                ))}
              </select>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="To'liq manzil (ko'cha, uy)"
                rows={3}
                className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6B1020] resize-none transition-colors"
                style={{ borderColor: "var(--border)" }}
                required
              />
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}>
            <h2 className="font-semibold mb-4">To'lov usuli</h2>
            <div className="flex gap-3">
              {(["payme", "click"] as const).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPayment(method)}
                  className="flex-1 py-3 rounded-xl border text-sm font-medium transition-all"
                  style={{
                    borderColor: payment === method ? "var(--brand)" : "var(--border)",
                    backgroundColor: payment === method ? "#fff5f6" : "#fff",
                    color: payment === method ? "var(--brand)" : "var(--text)",
                  }}
                >
                  {method === "payme" ? "Payme" : "Click"}
                </button>
              ))}
            </div>
            <p className="text-xs mt-3" style={{ color: "var(--muted)" }}>
              Demo rejim: to'lov simulyatsiya qilinadi
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl text-white font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: "var(--brand)" }}
          >
            {loading ? "To'lov qilinmoqda..." : `${formatPrice(grandTotal)} to'lash`}
          </button>
        </form>

        {/* Order summary */}
        <div
          className="rounded-2xl border p-5 h-fit sticky top-24"
          style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}
        >
          <h2 className="font-semibold mb-4">Buyurtma xulosasi</h2>
          <div className="flex flex-col gap-2 mb-4">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span style={{ color: "var(--muted)" }}>
                  {item.productName} × {item.quantity}
                </span>
                <span>{formatPrice(item.pricePerMeter * item.metersPerRoll * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3" style={{ borderColor: "var(--border)" }}>
            <div className="flex justify-between text-sm mb-1">
              <span style={{ color: "var(--muted)" }}>Tovarlar</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm mb-3">
              <span style={{ color: "var(--muted)" }}>Yetkazib berish</span>
              <span>{region ? formatPrice(deliveryPrice) : "—"}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Jami</span>
              <span style={{ color: "var(--brand)" }}>{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
