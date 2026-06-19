"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import { useEffect } from "react";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) router.replace("/auth");
    else if (user.role !== "seller" && user.role !== "admin") router.replace("/catalog");
  }, [user, router]);

  if (!user) return null;

  const links = [
    { href: "/seller", label: "Dashboard" },
    { href: "/seller/orders", label: "Buyurtmalar" },
    { href: "/seller/products", label: "Mahsulotlar" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
      <aside className="w-full lg:w-48 flex-shrink-0">
        <div className="rounded-2xl border p-4 sticky top-24" style={{ borderColor: "var(--border)", backgroundColor: "#fff" }}>
          <p className="text-xs font-medium mb-3 uppercase tracking-wide px-2" style={{ color: "var(--muted)" }}>
            Sotuvchi
          </p>
          <nav className="flex flex-col gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm py-2 px-3 rounded-lg transition-colors"
                style={{
                  backgroundColor: pathname === href ? "#fff5f6" : "transparent",
                  color: pathname === href ? "var(--brand)" : "var(--text)",
                  fontWeight: pathname === href ? 500 : 400,
                }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
