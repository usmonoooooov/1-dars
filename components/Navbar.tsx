"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { useAuthStore } from "@/lib/auth-store";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const rollCount = useCartStore((s) => s.rollCount());
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  function handleLogout() {
    logout();
    router.push("/catalog");
  }

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className="text-sm transition-opacity hover:opacity-70"
      style={{ color: pathname.startsWith(href) ? "var(--brand)" : "var(--muted)", fontWeight: pathname.startsWith(href) ? 500 : 400 }}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link
          href="/catalog"
          className="text-xl font-semibold tracking-widest uppercase flex-shrink-0"
          style={{ fontFamily: "var(--font-cormorant)", color: "var(--brand)" }}
        >
          LolaMarket
        </Link>

        <nav className="flex items-center gap-5">
          {navLink("/catalog", "Katalog")}
          {user?.role === "seller" && navLink("/seller", "Kabinet")}
          {user?.role === "admin" && navLink("/admin", "Admin")}
          {user && navLink("/orders", "Buyurtmalar")}
        </nav>

        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-black/5"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {rollCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white flex items-center justify-center text-[10px] font-bold"
                style={{ backgroundColor: "var(--brand)" }}
              >
                {rollCount}
              </span>
            )}
          </Link>

          {/* User */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm hidden sm:block" style={{ color: "var(--muted)" }}>
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-xs px-3 py-1.5 rounded-full border transition-colors hover:bg-black/5"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                Chiqish
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="text-sm px-4 py-2 rounded-full text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--brand)" }}
            >
              Kirish
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
