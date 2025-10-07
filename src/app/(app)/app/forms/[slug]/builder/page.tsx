"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useCurrentFormStore } from "@/store/currentFormStore";
import { BlockPickerModal } from "@/components/forms/BlockPickerModal";
import TextQuestionBlock from "@/components/forms/TextQuestionBlock";
import LongTextQuestionBlock from "@/components/forms/LongQuestionBlock";
import MultiChoiceQuestionBlock from "@/components/forms/MCQBlock";
import CheckboxQuestionBlock from "@/components/forms/CheckboxQuestionBlock";
import DateQuestionBlock from "@/components/forms/DateQuestionBlock";
import { useParams } from "next/navigation";
import { useFormQuery, useUpdateForm } from "@/queries/forms.queries";
import { Spinner } from "@/components/ui/spinner";
import { FormUpdateRequest } from "@/types/form_request";
import { QuestionRequest } from "@/types/form_request";
import { useRouter } from "next/navigation";

export default function FormBuilder() {
  const params = useParams();
  const router = useRouter();
  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : (params.slug as string | undefined);

  const { title, setTitle, questions, currentForm, setCurrentForm } =
    useCurrentFormStore();
  const [showPicker, setShowPicker] = useState(false);

  const { data, isLoading } = useFormQuery(slug ?? "");
  const { mutate: updateForm, isPending } = useUpdateForm(
    currentForm?.id ? currentForm.id : ""
  );

  useEffect(() => {
    if (data) setCurrentForm(data);
  }, [data, setCurrentForm]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 p-6">
        <Spinner /> <span>Loading form…</span>
      </div>
    );
  }

  const handleCreate = () => {
    if (currentForm) {
      const question_request: QuestionRequest[] = questions.map((q, idx) => ({
        question_order: idx + 1,
        title: q.questionText,
        type: q.answerType,
        config: q.config,
      }));

      const payload: FormUpdateRequest = {
        id: currentForm.id,
        slug: currentForm.slug,
        title: title,
        status: currentForm.status,
        access: currentForm.access,
        questions: question_request,
      };
      try {
        updateForm(payload, {
          onSuccess: (data) => {
            console.log("Form Created: ", data);
            router.push(`/f/${data.slug}/thanks`);
          },
          onError: (err) => {
            console.error("Failed to create form: ", err);
          },
        });
      } catch {
        console.log("Failed");
      }
    }
  };

  const canCreate = title.trim().length > 0 && questions.length > 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="w-full border-b bg-card/40 backdrop-blur supports-[backdrop-filter]:bg-card/30">
        <div className="mx-auto w-full max-w-5xl px-4 py-6 flex items-center justify-between">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Form title"
            className="h-14 text-2xl md:text-3xl max-w-xl"
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="lg"
                className="ml-4"
                disabled={!canCreate}
                title={
                  !canCreate ? "Add a title and at least one question" : ""
                }
              >
                Create
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Create this form?</AlertDialogTitle>
                <AlertDialogDescription>
                  We’ll save “{title || "Untitled form"}” with{" "}
                  {questions.length}{" "}
                  {questions.length === 1 ? "question" : "questions"}. You can
                  edit it later.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleCreate}>
                  {isPending ? <>Creating....</> : <>Create</>}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="flex-1">
        <div className="mx-auto w-full max-w-5xl px-4 py-6">
          {questions.length === 0 ? (
            <div className="h-[60vh] border-2 border-dashed rounded-2xl flex items-center justify-center">
              <Button
                size="icon"
                variant="secondary"
                className="h-16 w-16 rounded-full"
                aria-label="Add block"
                onClick={() => setShowPicker(true)}
              >
                <Plus className="h-8 w-8" />
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {questions.map((q) => (
                  <React.Fragment key={q.id}>
                    {q.answerType === "text" && <TextQuestionBlock id={q.id} />}
                    {q.answerType === "long_text" && (
                      <LongTextQuestionBlock id={q.id} />
                    )}
                    {q.answerType === "multichoice" && (
                      <MultiChoiceQuestionBlock id={q.id} />
                    )}
                    {q.answerType === "checkbox" && (
                      <CheckboxQuestionBlock id={q.id} />
                    )}
                    {q.answerType === "date" && <DateQuestionBlock id={q.id} />}
                  </React.Fragment>
                ))}
              </div>

              <div className="sticky bottom-6 flex justify-center pt-6">
                <Button
                  size="icon"
                  className="h-12 w-12 rounded-full shadow-lg"
                  aria-label="Add block"
                  onClick={() => setShowPicker(true)}
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <BlockPickerModal open={showPicker} onOpenChange={setShowPicker} />
    </div>
  );
}
