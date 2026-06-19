"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import { REGIONS } from "@/lib/utils";
import { genId } from "@/lib/utils";
import toast from "react-hot-toast";

type Step = "phone" | "otp" | "profile";

const DEV_OTP = "1234";

// Demo foydalanuvchilar (Supabase ulanganda o'chadi)
const DEMO_USERS = [
  { phone: "+998901234567", role: "buyer" as const, name: "Alisher Karimov", region: "Farg'ona" },
  { phone: "+998901234568", role: "seller" as const, name: "Toshkent Mato", region: "Toshkent shahri" },
  { phone: "+998901234569", role: "admin" as const, name: "Admin", region: "Toshkent shahri" },
];

export default function AuthPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("+998");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePhone(e: React.FormEvent) {
    e.preventDefault();
    if (phone.length < 13) { toast.error("To'liq telefon raqam kiriting"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success("SMS kod yuborildi (demo: 1234)");
    setStep("otp");
  }

  async function handleOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp !== DEV_OTP) { toast.error("Kod noto'g'ri. Demo: 1234"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);

    const demo = DEMO_USERS.find((u) => u.phone === phone);
    if (demo) {
      login({ id: genId(), phone: demo.phone, name: demo.name, region: demo.region, role: demo.role });
      toast.success(`Xush kelibsiz, ${demo.name}!`);
      if (demo.role === "seller") router.push("/seller");
      else if (demo.role === "admin") router.push("/admin");
      else router.push("/catalog");
    } else {
      setStep("profile");
    }
  }

  async function handleProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !region) { toast.error("Ism va viloyatni kiriting"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    login({ id: genId(), phone, name: name.trim(), region, role: "buyer" });
    toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
    router.push("/catalog");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div
        className="w-full max-w-sm rounded-2xl border p-8"
        style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}
      >
        <h1
          className="text-3xl font-semibold mb-1 text-center"
          style={{ fontFamily: "var(--font-cormorant)", color: "var(--brand)" }}
        >
          LolaMarket
        </h1>
        <p className="text-sm text-center mb-8" style={{ color: "var(--muted)" }}>
          {step === "phone" && "Telefon raqamingizni kiriting"}
          {step === "otp" && `${phone} ga SMS kod yuborildi`}
          {step === "profile" && "Profilingizni to'ldiring"}
        </p>

        {step === "phone" && (
          <form onSubmit={handlePhone} className="flex flex-col gap-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+998 90 123 45 67"
              className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6B1020] transition-colors"
              style={{ borderColor: "var(--border)" }}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "var(--brand)" }}
            >
              {loading ? "Yuborilmoqda..." : "SMS kod olish"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleOtp} className="flex flex-col gap-4">
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="_ _ _ _"
              className="w-full border rounded-xl px-4 py-3 text-2xl text-center tracking-[1rem] outline-none focus:border-[#6B1020] transition-colors"
              style={{ borderColor: "var(--border)" }}
            />
            <p className="text-xs text-center" style={{ color: "var(--muted)" }}>Demo rejim: kod <strong>1234</strong></p>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "var(--brand)" }}
            >
              {loading ? "Tekshirilmoqda..." : "Tasdiqlash"}
            </button>
            <button type="button" onClick={() => { setStep("phone"); setOtp(""); }} className="text-sm text-center" style={{ color: "var(--muted)" }}>
              Raqamni o'zgartirish
            </button>
          </form>
        )}

        {step === "profile" && (
          <form onSubmit={handleProfile} className="flex flex-col gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ism va familiya"
              className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6B1020] transition-colors"
              style={{ borderColor: "var(--border)" }}
            />
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6B1020] transition-colors bg-white"
              style={{ borderColor: "var(--border)" }}
            >
              <option value="">Viloyatni tanlang</option>
              {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "var(--brand)" }}
            >
              {loading ? "Saqlanmoqda..." : "Davom etish"}
            </button>
          </form>
        )}

        <div
          className="mt-6 pt-5 border-t text-xs"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          <p className="font-medium mb-1">Demo akkauntlar:</p>
          <p>Xaridor: +998901234567</p>
          <p>Sotuvchi: +998901234568</p>
          <p>Admin: +998901234569</p>
          <p className="mt-1">Kod: 1234</p>
        </div>
      </div>
    </div>
  );
}
