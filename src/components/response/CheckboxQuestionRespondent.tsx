"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function CheckboxQuestionRespondent({
  options,
  values,
  onChange,
}: {
  options: string[];
  values: number[];
  onChange: (vals: number[]) => void;
}) {
  const toggle = (opt: number, checked: boolean | "indeterminate") => {
    const isChecked = checked === true;
    if (isChecked) onChange([...(values ?? []), opt]);
    else onChange((values ?? []).filter((x) => x !== opt));
  };

  return (
    <div className="space-y-2">
      {(options ?? []).map((o, idx) => {
        const id = `chk-${idx}-${o}`;
        const selected = values ?? [];
        return (
          <div key={id} className="flex items-center gap-2">
            <Checkbox
              id={id}
              checked={selected.includes(idx)}
              onCheckedChange={(c) => toggle(Number(idx), c)}
            />
            <Label htmlFor={id}>{o || `Option ${idx + 1}`}</Label>
          </div>
        );
      })}
    </div>
  );
}
