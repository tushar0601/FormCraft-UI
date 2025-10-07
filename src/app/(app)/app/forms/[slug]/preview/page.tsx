/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCurrentFormStore } from "@/store/currentFormStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PreviewPage() {
  const { questions, title } = useCurrentFormStore();
  return (
    <div className="mx-auto max-w-xl space-y-4">
      <h1 className="text-2xl font-semibold">Preview: {title}</h1>
      <Card>
        <CardContent className="p-4 space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="space-y-1">
              <label className="font-medium">
                {q.questionText || "(Untitled)"}
                {q.config?.type === "text" && q.config.required ? " *" : ""}
              </label>
              {q.answerType === "text" && (
                <input
                  disabled
                  className="w-full rounded border p-2"
                  placeholder={(q.config as any)?.placeholder}
                />
              )}
              {q.answerType === "multichoice" && (
                <div className="space-y-1">
                  {(q.config as any)?.options?.map((o: string) => (
                    <label key={o} className="flex gap-2">
                      <input disabled type="radio" />
                      <span>{o || "Option"}</span>
                    </label>
                  ))}
                </div>
              )}
              {q.answerType === "checkbox" && (
                <div className="space-y-1">
                  {(q.config as any)?.options?.map((o: string) => (
                    <label key={o} className="flex gap-2">
                      <input disabled type="checkbox" />
                      <span>{o || "Option"}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Button disabled className="w-full">
            Submit (disabled in preview)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
