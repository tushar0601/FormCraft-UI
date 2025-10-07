"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <button
      aria-label="Toggle theme"
      onClick={() =>
        mounted && setTheme(resolvedTheme === "dark" ? "light" : "dark")
      }
      className="h-9 w-9 grid place-items-center rounded-md border"
    >
      {/* render nothing on server to keep markup stable */}
      <span aria-hidden suppressHydrationWarning>
        {mounted ? (
          resolvedTheme === "dark" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )
        ) : null}
      </span>
    </button>
  );
}
