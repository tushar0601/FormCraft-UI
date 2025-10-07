"use client";

import { format } from "date-fns";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { GripVertical, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { useCurrentFormStore } from "@/store/currentFormStore";
import type { QuestionConfig } from "@/store/currentFormStore";
import { useEffect, useState } from "react";

type Props = { id: string };

export default function DateQuestionBlock({ id }: Props) {
  const { questions, updateQuestionText, updateConfig, deleteQuestion } =
    useCurrentFormStore();

  const block = questions.find((q) => q.id === id);

  const cfg = (block?.config?.type === "date" ? block.config : undefined) as
    | Extract<QuestionConfig, { type: "date" }>
    | undefined;

  useEffect(() => {
    if (!cfg)
      updateConfig(id, { type: "date", placeholder: "", required: false });
  }, [cfg, id, updateConfig]);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const display = selected ? format(selected, "PPP") : cfg?.placeholder || "";
  const openCalendar = () => setOpen(true);

  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm space-y-4">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="cursor-grab"
          aria-label="Drag"
        >
          <GripVertical className="h-5 w-5" />
        </Button>

        <Input
          value={block?.questionText}
          onChange={(e) => updateQuestionText(id, e.target.value)}
          placeholder="Please fill in your birth date"
          className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-xl font-semibold px-0"
        />

        <div className="ml-auto">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Delete question"
            onClick={() => deleteQuestion(id)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label className="sr-only" htmlFor={`date-${id}`}>
          Date
        </Label>
        <div className="relative">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Input
                id={`date-${id}`}
                readOnly
                value={display}
                placeholder={cfg?.placeholder ?? "Nov 30, 1988"}
                aria-required={cfg?.required ?? false}
                className="h-10 pr-10"
                onClick={openCalendar}
              />
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0">
              <Calendar
                mode="single"
                selected={selected}
                onSelect={(d) => {
                  setSelected(d);
                  setOpen(false);
                }}
                // optional: fromYear/toYear to limit range
              />
            </PopoverContent>
          </Popover>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-8 w-8"
            onClick={openCalendar}
            aria-label="Open calendar"
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </div>
        {cfg?.help ? (
          <p className="text-sm text-muted-foreground">{cfg.help}</p>
        ) : null}
      </div>
    </div>
  );
}
