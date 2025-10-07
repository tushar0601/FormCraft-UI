// src/components/topbar.tsx
"use client";
import { User, ChevronDown } from "lucide-react";
import { useAuth } from "../context/auth-context";
import ThemeToggle from "./themeToggle";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Topbar() {
  const { user } = useAuth();
  const router = useRouter();
  const name = user?.name || user?.email || "User";
  const signOut = async () => {
    await fetch("/auth/signout", { method: "POST" });
    router.replace("/login");
  };
  return (
    <header className="fixed left-60 right-0 top-0 h-14 border-b bg-background px-4 flex items-center gap-3">
      <input
        placeholder="Search"
        className="h-9 w-full max-w-xl rounded-md border px-3 text-sm outline-none focus:ring"
      />
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger className="h-9 rounded-md border px-3 text-sm flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="truncate max-w-[12rem]">{name}</span>
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={signOut} className="text-red-600">
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
