"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Folder, CheckSquare, BarChart3, Puzzle, Settings } from "lucide-react";

const NAV = [
  {
    href: "/app/forms",
    label: "Forms",
    icon: Folder,
    active: (p: string) =>
      p === "/app" ||
      /^\/app\/forms(\/(?![^/]+\/(responses|analytics)).*)?$/.test(p),
  },
  {
    href: "/app/forms/1/responses",
    label: "Responses",
    icon: CheckSquare,
    active: (p: string) => /^\/app\/forms\/[^/]+\/responses(\/|$)/.test(p),
  },
  {
    href: "/app/analytics",
    label: "Analytics",
    icon: BarChart3,
    active: (p: string) => /^\/app\/analytics(\/|$)/.test(p),
  },
  {
    href: "/app/integrations",
    label: "Integrations",
    icon: Puzzle,
    active: (p: string) => p.startsWith("/app/integrations"),
  },
  {
    href: "/app/settings",
    label: "Settings",
    icon: Settings,
    active: (p: string) => p.startsWith("/app/settings"),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 h-dvh w-60 border-r bg-background px-3 py-4">
      <div className="mb-3 px-2 text-lg font-semibold">FormCraft</div>
      <nav className="grid gap-1 text-sm">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 rounded px-2 py-2 hover:bg-accent ${
                active ? "bg-accent font-medium" : ""
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
