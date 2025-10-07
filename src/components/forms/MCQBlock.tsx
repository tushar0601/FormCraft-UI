"use client";

import { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCurrentFormStore } from "@/store/currentFormStore";
import type { QuestionConfig } from "@/store/currentFormStore";
import { GripVertical, Trash2, Plus } from "lucide-react";

type Props = { id: string };

export default function MultiChoiceQuestionBlock({ id }: Props) {
  const { questions, updateQuestionText, updateConfig, deleteQuestion } =
    useCurrentFormStore();

  const block = questions.find((q) => q.id === id);

  const cfg = (
    block?.config?.type === "multichoice" ? block.config : undefined
  ) as Extract<QuestionConfig, { type: "multichoice" }> | undefined;

  useEffect(() => {
    if (!cfg) {
      updateConfig(id, { type: "multichoice", options: [""], required: false });
    }
  }, [cfg, id, updateConfig]);

  const onChangeConfig = (
    patch: Partial<Extract<QuestionConfig, { type: "multichoice" }>>
  ) => {
    const next: Extract<QuestionConfig, { type: "multichoice" }> = {
      type: "multichoice",
      options: cfg?.options ?? [""],
      required: cfg?.required ?? false,
      help: cfg?.help,
      ...patch,
    };
    updateConfig(id, next);
  };

  const addOption = () => {
    onChangeConfig({ options: [...(cfg?.options ?? []), ""] });
  };

  const updateOption = (idx: number, value: string) => {
    const newOpts = [...(cfg?.options ?? [])];
    newOpts[idx] = value;
    onChangeConfig({ options: newOpts });
  };

  const removeOption = (idx: number) => {
    const newOpts = (cfg?.options ?? []).filter((_, i) => i !== idx);
    onChangeConfig({ options: newOpts });
  };

  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="cursor-grab">
          <GripVertical className="h-5 w-5" />
        </Button>

        <Input
          value={block?.questionText}
          onChange={(e) => updateQuestionText(id, e.target.value)}
          placeholder="Choose your t-shirt size"
          className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-xl font-semibold px-0"
        />

        <div className="ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteQuestion(id)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        {(cfg?.options ?? []).map((opt, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 rounded-md border px-3 py-2"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded bg-muted font-semibold">
              {String.fromCharCode(65 + idx)}
            </div>
            <Input
              value={opt}
              onChange={(e) => updateOption(idx, e.target.value)}
              placeholder={`Option ${idx + 1}`}
              className="flex-1 border-0 shadow-none focus-visible:ring-0"
            />
            <Button
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
          className="mt-2"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Option
        </Button>
      </div>
    </div>
  );
}
