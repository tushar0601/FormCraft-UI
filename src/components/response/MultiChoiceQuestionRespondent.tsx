"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function MultiChoiceQuestionRespondent({
  options,
  value, 
  onChange,
}: {
  options: string[];
  value: number | string | undefined;
  onChange: (v: number) => void;
}) {
  const stringValue = typeof value === "number" ? String(value) : value ?? "";

  return (
    <RadioGroup
      value={stringValue}
      onValueChange={(v) => onChange(Number(v))}
      className="space-y-2"
    >
      {(options ?? []).map((o, idx) => {
        const id = `mcq-${idx}`;
        return (
          <div key={id} className="flex items-center gap-2">
            <RadioGroupItem value={String(idx)} id={id} />
            <Label htmlFor={id}>{o || `Option ${idx + 1}`}</Label>
          </div>
        );
      })}
    </RadioGroup>
  );
}
