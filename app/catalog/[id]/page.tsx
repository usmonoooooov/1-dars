import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const totalPrice = product.pricePerMeter * product.metersPerRoll;
  const inStock = product.stockRolls > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <Link
        href="/catalog"
        className="inline-flex items-center gap-2 text-sm mb-8 transition-opacity hover:opacity-70"
        style={{ color: "var(--muted)" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Katalogga qaytish
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" priority />
        </div>

        <div className="flex flex-col">
          <p className="text-sm mb-2" style={{ color: "var(--muted)" }}>
            {product.sellerCity} · {product.seller}
          </p>
          <h1
            className="text-4xl font-semibold mb-4 leading-tight"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text)" }}
          >
            {product.name}
          </h1>
          <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--muted)" }}>
            {product.description}
          </p>

          <div
            className="rounded-xl p-4 mb-4 grid grid-cols-2 gap-3"
            style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)" }}
          >
            {[
              { label: "Tarkib", value: product.material },
              { label: "Rang", value: product.color },
              { label: "Eni", value: `${product.width} sm` },
              { label: "Rulondagi metr", value: `${product.metersPerRoll} m` },
              { label: "Omborda", value: `${product.stockRolls} rulon` },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs mb-0.5" style={{ color: "var(--muted)" }}>{label}</p>
                <p className="text-sm font-medium">{value}</p>
              </div>
            ))}
          </div>

          <div
            className="rounded-xl p-4 mb-4"
            style={{ backgroundColor: "#fff", border: "1px solid var(--border)" }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm" style={{ color: "var(--muted)" }}>Metrga</span>
              <span className="font-semibold" style={{ color: "var(--brand)" }}>{formatPrice(product.pricePerMeter)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: "var(--muted)" }}>1 rulon ({product.metersPerRoll} m)</span>
              <span className="font-bold text-lg">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <div className="mb-4">
            <span
              className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full font-medium"
              style={{ backgroundColor: inStock ? "#dcfce7" : "#fee2e2", color: inStock ? "#166534" : "#991b1b" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: inStock ? "#16a34a" : "#dc2626" }} />
              {inStock ? `${product.stockRolls} rulon mavjud` : "Tugagan"}
            </span>
          </div>

          {inStock && <AddToCartButton product={product} />}
        </div>
      </div>
    </div>
  );
}
