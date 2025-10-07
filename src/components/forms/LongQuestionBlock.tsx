"use client";

import { useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import { GripVertical, Trash2 } from "lucide-react";
import { useCurrentFormStore } from "@/store/currentFormStore";
import type { QuestionConfig } from "@/store/currentFormStore";

type Props = { id: string };

export default function LongTextQuestionBlock({ id }: Props) {
  const questions = useCurrentFormStore((s) => s.questions);
  const updateQuestionText = useCurrentFormStore((s) => s.updateQuestionText);
  const updateConfig = useCurrentFormStore((s) => s.updateConfig);
  const deleteQuestion = useCurrentFormStore((s) => s.deleteQuestion);

  const block = questions.find((q) => q.id === id);

  const cfg = (
    block?.config?.type === "long_text" ? block.config : undefined
  ) as Extract<QuestionConfig, { type: "long_text" }> | undefined;

  // Ensure a long_text config exists
  useEffect(() => {
    if (!cfg) {
      updateConfig(id, { type: "long_text", placeholder: "", required: false });
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
          placeholder="Tell us a bit more about yourself"
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
        <Textarea
          id={`answer-${id}`}
          placeholder={cfg?.placeholder ?? ""}
          aria-required={cfg?.required ?? false}
          className="min-h-32 resize-y"
          onChange={() => {}}
        />
      </div>
    </div>
  );
}
