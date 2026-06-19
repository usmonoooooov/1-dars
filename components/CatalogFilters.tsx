"use client";

import { MATERIALS, COLORS, WIDTHS } from "@/lib/mock-data";

type Props = {
  material: string;
  color: string;
  width: string;
  onChange: (key: "material" | "color" | "width", value: string) => void;
  total: number;
};

export default function CatalogFilters({ material, color, width, onChange, total }: Props) {
  return (
    <aside className="w-full lg:w-56 flex-shrink-0">
      <div
        className="rounded-2xl border p-5 sticky top-24"
        style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-sm tracking-wide uppercase" style={{ color: "var(--muted)" }}>
            Filtr
          </h2>
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            {total} ta
          </span>
        </div>

        {/* Material */}
        <div className="mb-5">
          <p className="text-xs font-medium mb-2 uppercase tracking-wide" style={{ color: "var(--muted)" }}>
            Tarkib
          </p>
          <div className="flex flex-col gap-1">
            {MATERIALS.map((m) => (
              <button
                key={m}
                onClick={() => onChange("material", m)}
                className="text-left text-sm py-1.5 px-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: material === m ? "var(--brand)" : "transparent",
                  color: material === m ? "#fff" : "var(--text)",
                  fontWeight: material === m ? 500 : 400,
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="mb-5">
          <p className="text-xs font-medium mb-2 uppercase tracking-wide" style={{ color: "var(--muted)" }}>
            Rang
          </p>
          <div className="flex flex-col gap-1">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => onChange("color", c)}
                className="text-left text-sm py-1.5 px-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: color === c ? "var(--brand)" : "transparent",
                  color: color === c ? "#fff" : "var(--text)",
                  fontWeight: color === c ? 500 : 400,
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Width */}
        <div>
          <p className="text-xs font-medium mb-2 uppercase tracking-wide" style={{ color: "var(--muted)" }}>
            Eni
          </p>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => onChange("width", "")}
              className="text-left text-sm py-1.5 px-2 rounded-lg transition-colors"
              style={{
                backgroundColor: width === "" ? "var(--brand)" : "transparent",
                color: width === "" ? "#fff" : "var(--text)",
                fontWeight: width === "" ? 500 : 400,
              }}
            >
              Hammasi
            </button>
            {WIDTHS.map((w) => (
              <button
                key={w}
                onClick={() => onChange("width", String(w))}
                className="text-left text-sm py-1.5 px-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: width === String(w) ? "var(--brand)" : "transparent",
                  color: width === String(w) ? "#fff" : "var(--text)",
                  fontWeight: width === String(w) ? 500 : 400,
                }}
              >
                {w} sm
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
