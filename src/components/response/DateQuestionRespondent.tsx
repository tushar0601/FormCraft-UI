"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export function DateQuestionRespondent({
  value,
  onChange,
  placeholder,
  required,
}: {
  value: Date | string | null;
  onChange: (v: Date | null) => void;
  placeholder?: string;
  required?: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  // Allow both Date and ISO string coming in
  const selected =
    typeof value === "string" && value
      ? new Date(value)
      : (value as Date | null) ?? null;

  const display = selected ? format(selected, "PPP") : placeholder ?? "";

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            readOnly
            value={display}
            placeholder={placeholder ?? "Nov 30, 1988"}
            aria-required={required ?? false}
            className="h-10 pr-10"
            onClick={() => setOpen(true)}
          />
        </PopoverTrigger>
        <PopoverContent align="start" className="p-0">
          <Calendar
            mode="single"
            selected={selected ?? undefined}
            onSelect={(d) => {
              onChange(d ?? null);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1 h-8 w-8"
        onClick={() => setOpen(true)}
        aria-label="Open calendar"
      >
        <CalendarIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
