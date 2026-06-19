"use client";

import { useState } from "react";
import { products as initialProducts } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SellerProductsPage() {
  const [prods, setProds] = useState(initialProducts);

  function handleDelete(id: string) {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    setProds((p) => p.filter((x) => x.id !== id));
    toast.success("O'chirildi");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-cormorant)", color: "var(--brand)" }}>
          Mahsulotlar
        </h1>
        <Link
          href="/seller/products/new"
          className="px-4 py-2 rounded-xl text-white text-sm font-medium"
          style={{ backgroundColor: "var(--brand)" }}
        >
          + Yangi mahsulot
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {prods.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 rounded-2xl border p-4"
            style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}
          >
            <div
              className="w-12 h-14 rounded-xl flex-shrink-0"
              style={{ backgroundColor: p.colorHex + "40" }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}>
                {p.name}
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {p.material} · {p.width} sm · {p.metersPerRoll} m/rulon
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-semibold" style={{ color: "var(--brand)" }}>
                {formatPrice(p.pricePerMeter)}/m
              </p>
              <p className="text-xs" style={{ color: p.stockRolls > 0 ? "#16a34a" : "#dc2626" }}>
                {p.stockRolls > 0 ? `${p.stockRolls} rulon` : "Tugagan"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toast("Tahrirlash tez kunda")}
                className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-gray-50"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                Tahrir
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
              >
                O'chir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
