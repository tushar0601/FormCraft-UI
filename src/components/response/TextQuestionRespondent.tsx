"use client";
import { Input } from "@/components/ui/input";

export default function TextQuestionRespondent({
  value,
  onChange,
  placeholder,
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <Input
      placeholder={placeholder ?? ""}
      aria-required={required ?? false}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
