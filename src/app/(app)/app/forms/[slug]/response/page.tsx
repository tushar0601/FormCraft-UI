/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useFormStore } from "@/store/formStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useFormQuery } from "@/queries/forms.queries";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

import {
  ResponseCreateRequest,
  ResponseBlockCreateRequest,
} from "@/types/response_request";
import { ResponseStatusEnum } from "@/types/enum";
import { useCreateResponse } from "@/queries/response.queries";

import TextQuestionRespondent from "@/components/response/TextQuestionRespondent";
import LongTextQuestionRespondent from "@/components/response/LongTextQuestionRespondent";
import { MultiChoiceQuestionRespondent } from "@/components/response/MultiChoiceQuestionRespondent";
import { CheckboxQuestionRespondent } from "@/components/response/CheckboxQuestionRespondent";
import { DateQuestionRespondent } from "@/components/response/DateQuestionRespondent";

export default function ResponsePage() {
  const { currentForm, setCurrentForm } = useFormStore();
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [openConfirm, setOpenConfirm] = useState(false);

  const { mutate: createResponse, isPending } = useCreateResponse();
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useFormQuery(slug ?? "");

  useEffect(() => {
    if (data) setCurrentForm(data);
  }, [data, setCurrentForm]);

  const handleChange = (id: string, value: any) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const normalizeValue = (displayType: string, raw: any) => {
    switch (displayType) {
      case "text":
      case "long_text":
        return { text: raw ?? "" };
      case "multichoice":
        return {
          selected:
            raw === null || raw === undefined || raw === ""
              ? null
              : Number(raw),
        };
      case "checkbox":
        return Array.isArray(raw) ? { selected: raw } : { checked: !!raw };
      case "date":
        return { date: raw ?? null };
      case "number":
        return {
          number:
            raw === "" || raw === undefined || raw === null
              ? null
              : Number(raw),
        };
      default:
        return { value: raw };
    }
  };

  const isEmptyValue = (v: any) => {
    if (v == null) return true;
    if (typeof v !== "object") return v === "";
    const vals = Object.values(v);
    return (
      vals.length === 0 ||
      vals.every(
        (x) => x == null || x === "" || (Array.isArray(x) && x.length === 0)
      )
    );
  };

  useEffect(() => {
    console.log(responses);
  }, [responses]);

  const handleSubmit = () => {
    const blocks = currentForm?.blocks ?? [];

    const question_responses: ResponseBlockCreateRequest[] = blocks
      .map((q: { id: string; block_type: string }) => {
        const raw = responses[q.id];
        const value = normalizeValue(q.block_type, raw);
        if (isEmptyValue(value)) return null;
        return {
          form_block_id: q.id,
          block_type: q.block_type,
          value,
          time_to_answer_ms: 0,
        } as ResponseBlockCreateRequest;
      })
      .filter((x): x is ResponseBlockCreateRequest => x !== null);

    if (currentForm) {
      const request_body: ResponseCreateRequest = {
        form_id: currentForm.id,
        submitted_ip: "",
        status: ResponseStatusEnum.SUBMITTED,
        meta_data: {},
        question_responses,
      };

      createResponse(request_body, {
        onSuccess: () => {
          toast.success("✅ Response submitted", {
            description: "Thanks for your response!",
          });
        },
        onError: (err) => {
          console.error("Failed to submit response: ", err);
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen p-10 bg-muted/30">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-sm text-muted-foreground">Loading form…</span>
          </div>

          <Skeleton className="h-10 w-2/3 mx-auto rounded-lg" />
          <Card className="w-full">
            <CardContent className="p-6 space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-5 w-3/5" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              ))}
              <Skeleton className="h-12 w-full rounded-md" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isError || !currentForm) {
    return (
      <div className="w-full min-h-screen p-10 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <h2 className="text-xl font-semibold">Form not found</h2>
          <p className="text-sm text-muted-foreground">
            The form you’re trying to open doesn’t exist or is unavailable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-10 bg-muted/30">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          {currentForm.title}
        </h1>

        <Card className="w-full">
          <CardContent className="p-6 space-y-6">
            {currentForm.blocks.map((q: any) => (
              <div key={q.id} className="space-y-2">
                <label className="font-medium block">
                  {q.name || "(Untitled)"} {q.config?.required ? "*" : ""}
                </label>

                {q.block_type === "text" && (
                  <TextQuestionRespondent
                    placeholder={q.config?.placeholder}
                    required={!!q.config?.required}
                    value={responses[q.id] ?? ""}
                    onChange={(val) => handleChange(q.id, val)}
                  />
                )}

                {q.block_type === "long_text" && (
                  <LongTextQuestionRespondent
                    placeholder={q.config?.placeholder}
                    required={!!q.config?.required}
                    value={responses[q.id] ?? ""}
                    onChange={(val) => handleChange(q.id, val)}
                  />
                )}

                {q.block_type === "multichoice" && (
                  <MultiChoiceQuestionRespondent
                    options={q.config?.options ?? []}
                    value={responses[q.id]}
                    onChange={(idx) => handleChange(q.id, idx)}
                  />
                )}

                {q.block_type === "checkbox" && (
                  <CheckboxQuestionRespondent
                    options={q.config?.options ?? []}
                    values={responses[q.id] as number[]}
                    onChange={(vals) => handleChange(q.id, vals)}
                  />
                )}

                {q.block_type === "date" && (
                  <DateQuestionRespondent
                    placeholder={q.config?.placeholder}
                    required={!!q.config?.required}
                    value={responses[q.id] ?? null}
                    onChange={(val) => handleChange(q.id, val)}
                  />
                )}
              </div>
            ))}

            <Button
              onClick={() => setOpenConfirm(true)}
              className="w-full text-lg py-6"
              disabled={isPending}
            >
              {isPending ? "Submitting…" : "Submit"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit response?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit this form? You won’t be able to
              edit your answers later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setOpenConfirm(false);
                handleSubmit();
              }}
            >
              Yes, Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
