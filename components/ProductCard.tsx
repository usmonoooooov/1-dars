"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/mock-data";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const totalPrice = product.pricePerMeter * product.metersPerRoll;
  const inStock = product.stockRolls > 0;

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
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
      quantity: 1,
    });
    if (result.ok) toast.success("Savatga qo'shildi");
    else toast.error(result.error ?? "Xato");
  }

  return (
    <Link href={`/catalog/${product.id}`} className="group block">
      <div
        className="rounded-2xl overflow-hidden border transition-shadow hover:shadow-lg"
        style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <span
              className="text-xs px-2 py-1 rounded-full font-medium"
              style={{ backgroundColor: inStock ? "#dcfce7" : "#fee2e2", color: inStock ? "#166534" : "#991b1b" }}
            >
              {inStock ? `${product.stockRolls} rulon` : "Tugagan"}
            </span>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>
            {product.material} · {product.width} sm · {product.seller}
          </p>
          <h3
            className="font-medium mb-3 leading-snug"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem" }}
          >
            {product.name}
          </h3>

          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-xs mb-0.5" style={{ color: "var(--muted)" }}>Metrga</p>
              <p className="font-semibold text-sm" style={{ color: "var(--brand)" }}>
                {formatPrice(product.pricePerMeter)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs mb-0.5" style={{ color: "var(--muted)" }}>1 rulon ({product.metersPerRoll}m)</p>
              <p className="font-semibold text-sm">{formatPrice(totalPrice)}</p>
            </div>
          </div>

          {inStock && (
            <button
              onClick={handleAdd}
              className="w-full py-2 rounded-xl text-white text-sm font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--brand)" }}
            >
              Savatga
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
