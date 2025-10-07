"use client";

import { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { GripVertical, Trash2, Plus } from "lucide-react";
import { useCurrentFormStore } from "@/store/currentFormStore";
import type { QuestionConfig } from "@/store/currentFormStore";

type Props = { id: string };

export default function CheckboxQuestionBlock({ id }: Props) {
  const { questions, updateQuestionText, updateConfig, deleteQuestion } =
    useCurrentFormStore();

  const block = questions.find((q) => q.id === id);

  const cfg = (
    block?.config?.type === "checkbox" ? block.config : undefined
  ) as Extract<QuestionConfig, { type: "checkbox" }> | undefined;

  useEffect(() => {
    if (!cfg) {
      updateConfig(id, { type: "checkbox", options: [""], required: false });
    }
  }, [cfg, id, updateConfig]);

  const onChangeConfig = (
    patch: Partial<Extract<QuestionConfig, { type: "checkbox" }>>
  ) => {
    const next: Extract<QuestionConfig, { type: "checkbox" }> = {
      type: "checkbox",
      options: cfg?.options ?? [""],
      required: cfg?.required ?? false,
      help: cfg?.help,
      ...patch,
    };
    updateConfig(id, next);
  };

  const addOption = () =>
    onChangeConfig({ options: [...(cfg?.options ?? []), ""] });

  const updateOption = (idx: number, value: string) => {
    const list = [...(cfg?.options ?? [])];
    list[idx] = value;
    onChangeConfig({ options: list });
  };

  const removeOption = (idx: number) => {
    const list = (cfg?.options ?? []).filter((_, i) => i !== idx);
    onChangeConfig({ options: list });
  };

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
          placeholder="How did you find out about us?"
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

      <div className="space-y-3">
        {(cfg?.options ?? []).map((opt, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <Checkbox disabled className="h-5 w-5" />

            <Input
              value={opt}
              onChange={(e) => updateOption(idx, e.target.value)}
              placeholder={`Option ${idx + 1}`}
              className="flex-1"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Remove option"
              onClick={() => removeOption(idx)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addOption}
          className="mt-1"
        >
          <Plus className="h-4 w-4 mr-1" /> Add option
        </Button>
      </div>
    </div>
  );
}
