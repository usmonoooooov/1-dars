"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/mock-data";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

export default function AddToCartButton({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();

  function handleAdd() {
    const result = addItem({
      productId: product.id,
      productName: product.name,
      material: product.material,
      color: product.color,
      width: product.width,
      metersPerRoll: product.metersPerRoll,
      pricePerMeter: product.pricePerMeter,
      seller: product.seller,
      sellerId: product.sellerId,
      image: product.images[0],
      quantity: qty,
    });
    if (result.ok) {
      toast.success(`${qty} rulon savatga qo'shildi`);
    } else {
      toast.error(result.error ?? "Xato");
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{ borderColor: "var(--border)" }}>
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-6 h-6 flex items-center justify-center text-lg leading-none">−</button>
          <span className="w-8 text-center text-sm font-medium">{qty}</span>
          <button onClick={() => setQty((q) => Math.min(product.stockRolls, q + 1))} className="w-6 h-6 flex items-center justify-center text-lg leading-none">+</button>
        </div>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          = {formatPrice(product.pricePerMeter * product.metersPerRoll * qty)}
        </p>
      </div>
      <button
        onClick={handleAdd}
        className="w-full py-4 rounded-xl text-white font-medium transition-opacity hover:opacity-90"
        style={{ backgroundColor: "var(--brand)" }}
      >
        Savatga qo'shish
      </button>
      <button
        onClick={() => { handleAdd(); router.push("/checkout"); }}
        className="w-full py-3.5 rounded-xl border font-medium text-sm transition-colors hover:bg-gray-50"
        style={{ borderColor: "var(--border)" }}
      >
        Hoziroq buyurtma berish
      </button>
    </div>
  );
}
