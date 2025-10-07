"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function MultiChoiceQuestionRespondent({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <RadioGroup
      value={value ?? ""}
      onValueChange={onChange}
      className="space-y-2"
    >
      {(options ?? []).map((o, idx) => {
        const id = `mcq-${idx}-${o}`;
        return (
          <div key={id} className="flex items-center gap-2">
            <RadioGroupItem value={o} id={id} />
            <Label htmlFor={id}>{o || `Option ${idx + 1}`}</Label>
          </div>
        );
      })}
    </RadioGroup>
  );
}
