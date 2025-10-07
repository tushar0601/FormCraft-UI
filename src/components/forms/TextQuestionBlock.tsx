"use client";

import { useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useCurrentFormStore } from "@/store/currentFormStore";
import type { QuestionConfig } from "@/store/currentFormStore";
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  id: string;
};

export default function TextQuestionRow({ id }: Props) {
  const questions = useCurrentFormStore((s) => s.questions);
  const updateQuestionText = useCurrentFormStore((s) => s.updateQuestionText);
  const updateConfig = useCurrentFormStore((s) => s.updateConfig);
  const deleteQuestion = useCurrentFormStore((s) => s.deleteQuestion);

  const block = questions.find((q) => q.id === id);

  const cfg = (block?.config?.type === "text" ? block.config : undefined) as
    | Extract<QuestionConfig, { type: "text" }>
    | undefined;

  useEffect(() => {
    if (!cfg) {
      updateConfig(id, { type: "text", placeholder: "", required: false });
    }
  }, [cfg, id, updateConfig]);

  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="cursor-grab"
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-5 w-5" />
        </Button>

        <Input
          value={block?.questionText}
          onChange={(e) => updateQuestionText(id, e.target.value)}
          placeholder="Enter the question"
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

      <div className="mt-3 space-y-2">
        <Label className="sr-only" htmlFor={`answer-${id}`}>
          Answer
        </Label>
        <Input
          id={`answer-${id}`}
          placeholder={cfg?.placeholder ?? ""}
          aria-required={cfg?.required ?? false}
          className="h-10"
          onChange={(e) => {
            updateConfig(id, {
              type: "text",
              placeholder: e.target.value,
              required: false,
            });
          }}
        />
      </div>
    </div>
  );
}
