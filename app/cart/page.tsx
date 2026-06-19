"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";

export default function CartPage() {
  const { items, removeItem, updateQty, clear, total } = useCartStore();
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h2 className="text-2xl font-semibold mb-2" style={{ fontFamily: "var(--font-cormorant)" }}>
          Savat bo'sh
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
          Katalogdan mato qo'shing
        </p>
        <Link
          href="/catalog"
          className="inline-block px-6 py-3 rounded-xl text-white text-sm font-medium"
          style={{ backgroundColor: "var(--brand)" }}
        >
          Katalogga o'tish
        </Link>
      </div>
    );
  }

  const seller = items[0].seller;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-cormorant)", color: "var(--brand)" }}>
          Savat
        </h1>
        <button
          onClick={clear}
          className="text-sm transition-opacity hover:opacity-70"
          style={{ color: "var(--muted)" }}
        >
          Tozalash
        </button>
      </div>

      <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
        Sotuvchi: <strong style={{ color: "var(--text)" }}>{seller}</strong>
      </p>

      <div className="flex flex-col gap-3 mb-6">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex gap-4 p-4 rounded-2xl border"
            style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}
          >
            <div className="relative w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
              <Image src={item.image} alt={item.productName} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm mb-0.5" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}>
                {item.productName}
              </p>
              <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>
                {item.material} · {item.width} sm · {item.metersPerRoll} m/rulon
              </p>
              <p className="text-sm font-semibold" style={{ color: "var(--brand)" }}>
                {formatPrice(item.pricePerMeter * item.metersPerRoll)} / rulon
              </p>
            </div>
            <div className="flex flex-col items-end justify-between">
              <button
                onClick={() => removeItem(item.productId)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.productId, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="w-7 h-7 rounded-full border flex items-center justify-center text-sm disabled:opacity-30"
                  style={{ borderColor: "var(--border)" }}
                >
                  −
                </button>
                <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQty(item.productId, item.quantity + 1)}
                  className="w-7 h-7 rounded-full border flex items-center justify-center text-sm"
                  style={{ borderColor: "var(--border)" }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div
        className="rounded-2xl border p-5"
        style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}
      >
        <div className="flex justify-between text-sm mb-2">
          <span style={{ color: "var(--muted)" }}>
            Jami ({items.reduce((s, i) => s + i.quantity, 0)} rulon)
          </span>
          <span>{formatPrice(total())}</span>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span style={{ color: "var(--muted)" }}>Yetkazib berish</span>
          <span style={{ color: "var(--muted)" }}>Keyingi bosqichda</span>
        </div>
        <div className="flex justify-between font-semibold mb-4">
          <span>Tovar summasi</span>
          <span style={{ color: "var(--brand)" }}>{formatPrice(total())}</span>
        </div>
        <button
          onClick={() => {
            if (!user) { router.push("/auth"); return; }
            router.push("/checkout");
          }}
          className="w-full py-3.5 rounded-xl text-white font-medium transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--brand)" }}
        >
          {user ? "Buyurtma berish" : "Kirish va buyurtma berish"}
        </button>
      </div>
    </div>
  );
}
