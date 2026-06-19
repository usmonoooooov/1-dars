"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ backgroundColor: "#dcfce7" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h1 className="text-3xl font-semibold mb-2" style={{ fontFamily: "var(--font-cormorant)", color: "var(--brand)" }}>
        To'lov qabul qilindi!
      </h1>
      <p className="text-sm mb-1" style={{ color: "var(--muted)" }}>
        Buyurtma raqami: <strong style={{ color: "var(--text)" }}>#{orderId}</strong>
      </p>
      <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
        Sotuvchi tez orada tasdiqlaydi va Telegram orqali xabar yuboriladi.
      </p>
      <div className="flex flex-col gap-3">
        <Link
          href="/orders"
          className="block w-full py-3.5 rounded-xl text-white font-medium text-center"
          style={{ backgroundColor: "var(--brand)" }}
        >
          Buyurtmalarimni ko'rish
        </Link>
        <Link
          href="/catalog"
          className="block w-full py-3.5 rounded-xl border font-medium text-sm text-center"
          style={{ borderColor: "var(--border)" }}
        >
          Katalogga qaytish
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
