"use client";
import { Textarea } from "@/components/ui/textarea";

export default function LongTextQuestionRespondent({
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
    <Textarea
      placeholder={placeholder ?? ""}
      aria-required={required ?? false}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="min-h-32 resize-y"
    />
  );
}
