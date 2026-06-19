"use client";

import { useState, useMemo } from "react";
import { products } from "@/lib/mock-data";
import ProductCard from "@/components/ProductCard";
import CatalogFilters from "@/components/CatalogFilters";

export default function CatalogClient() {
  const [material, setMaterial] = useState("Hammasi");
  const [color, setColor] = useState("Hammasi");
  const [width, setWidth] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (material !== "Hammasi" && p.material !== material) return false;
      if (color !== "Hammasi" && p.color !== color) return false;
      if (width && String(p.width) !== width) return false;
      return true;
    });
  }, [material, color, width]);

  function handleFilter(key: "material" | "color" | "width", value: string) {
    if (key === "material") setMaterial(value);
    if (key === "color") setColor(value);
    if (key === "width") setWidth(value);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-4xl font-semibold mb-2"
          style={{ fontFamily: "var(--font-cormorant)", color: "var(--brand)" }}
        >
          Mato Katalogi
        </h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Ulgurji mato — faqat rulonlab, minimum 1 rulon
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <CatalogFilters
          material={material}
          color={color}
          width={width}
          onChange={handleFilter}
          total={filtered.length}
        />

        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-lg font-medium mb-2">Mahsulot topilmadi</p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                Filterni o'zgartiring
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
