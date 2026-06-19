"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MATERIALS, COLORS, WIDTHS } from "@/lib/mock-data";
import toast from "react-hot-toast";

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    material: "Atlas",
    color: "Oq",
    width: 150,
    metersPerRoll: 50,
    pricePerMeter: 0,
    stockRolls: 0,
    description: "",
  });
  const [loading, setLoading] = useState(false);

  function set(key: string, value: string | number) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || form.pricePerMeter <= 0) { toast.error("Nom va narxni kiriting"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Mahsulot qo'shildi!");
    router.push("/seller/products");
  }

  const inputCls = "w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6B1020] transition-colors bg-white";
  const style = { borderColor: "var(--border)" };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6" style={{ fontFamily: "var(--font-cormorant)", color: "var(--brand)" }}>
        Yangi mahsulot
      </h1>
      <form onSubmit={handleSubmit} className="max-w-xl flex flex-col gap-4">
        <div className="rounded-2xl border p-5 flex flex-col gap-4" style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--muted)" }}>Nom</label>
            <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Premium Atlas" className={inputCls} style={style} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--muted)" }}>Tarkib</label>
              <select value={form.material} onChange={(e) => set("material", e.target.value)} className={inputCls} style={style}>
                {MATERIALS.filter((m) => m !== "Hammasi").map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--muted)" }}>Rang</label>
              <select value={form.color} onChange={(e) => set("color", e.target.value)} className={inputCls} style={style}>
                {COLORS.filter((c) => c !== "Hammasi").map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--muted)" }}>Eni (sm)</label>
              <select value={form.width} onChange={(e) => set("width", Number(e.target.value))} className={inputCls} style={style}>
                {WIDTHS.map((w) => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--muted)" }}>Rulondagi m</label>
              <input type="number" min={1} value={form.metersPerRoll} onChange={(e) => set("metersPerRoll", Number(e.target.value))} className={inputCls} style={style} />
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--muted)" }}>Ombor (rulon)</label>
              <input type="number" min={0} value={form.stockRolls} onChange={(e) => set("stockRolls", Number(e.target.value))} className={inputCls} style={style} />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--muted)" }}>Narx (so'm/metr)</label>
            <input type="number" min={0} value={form.pricePerMeter || ""} onChange={(e) => set("pricePerMeter", Number(e.target.value))} placeholder="25000" className={inputCls} style={style} required />
          </div>

          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--muted)" }}>Tavsif</label>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} placeholder="Mato haqida qisqacha..." className={inputCls + " resize-none"} style={style} />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 py-3 rounded-xl border text-sm font-medium transition-colors hover:bg-gray-50"
            style={{ borderColor: "var(--border)" }}
          >
            Bekor
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 rounded-xl text-white text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: "var(--brand)" }}
          >
            {loading ? "Saqlanmoqda..." : "Saqlash"}
          </button>
        </div>
      </form>
    </div>
  );
}
