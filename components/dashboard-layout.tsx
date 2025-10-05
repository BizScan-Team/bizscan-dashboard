"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Megaphone,
  MessageSquare,
  BarChart3,
  QrCode,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: Package },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone },
  { name: "Responses", href: "/responses", icon: MessageSquare },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "QR Codes", href: "/qr-codes", icon: QrCode },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b border-border px-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">BizScan</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/" // exact match for home
                  : pathname.startsWith(item.href); // normal match for others

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                LIV
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Marissa</p>
                <p className="text-xs text-muted-foreground truncate">
                  Pro Plan
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="pl-64">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
