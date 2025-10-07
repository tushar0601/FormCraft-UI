"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { BlockType } from "@/types/enum";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useCurrentFormStore } from "@/store/currentFormStore";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { DialogTitle } from "@radix-ui/react-dialog";

export function BlockPickerModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [query, setQuery] = useState("");
  const [answerType, setAnswerType] = useState<BlockType | undefined>(
    undefined
  );
  const { addQuestion } = useCurrentFormStore();
  const allOptions: {
    type: BlockType;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      type: "text",
      label: "Short answer",
      icon: <span className="inline-block w-4">—</span>,
    },
    {
      type: "long_text",
      label: "Long answer",
      icon: <span className="inline-block w-4">≡</span>,
    },
    {
      type: "multichoice",
      label: "Multiple choice",
      icon: <span className="inline-block w-4">✓</span>,
    },
    {
      type: "checkbox",
      label: "Checkboxes",
      icon: <span className="inline-block w-4">☑</span>,
    },
    {
      type: "date",
      label: "Date",
      icon: <span className="inline-block w-4">📅</span>,
    },
    {
      type: "number",
      label: "Number",
      icon: <span className="inline-block w-4">#</span>,
    },
  ];

  const filtered = allOptions.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle></DialogTitle>
      <DialogContent className="p-0 gap-0 max-w-3xl overflow-hidden">
        <div className="border-b p-3">
          <Input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Find questions, input fields and layout options…"
            className="h-12"
          />
        </div>

        <div className="grid grid-cols-[260px_1fr] min-h-[420px]">
          <div className="border-r overflow-y-auto">
            <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase">
              Questions
            </div>
            <ul className="p-1">
              {filtered.map((item, idx) => {
                const selected = idx === activeIndex;
                return (
                  <li key={item.type}>
                    <button
                      className={`w-full text-left flex items-center gap-2 rounded-md px-3 py-2 transition-colors
            ${
              selected
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            }`}
                      onClick={() => {
                        setActiveIndex(idx);
                        setAnswerType(item.type);
                      }}
                    >
                      <span className="text-muted-foreground">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
              {filtered.length === 0 && (
                <div className="px-3 py-6 text-sm text-muted-foreground">
                  No results
                </div>
              )}
            </ul>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border">
                <Plus className="h-6 w-6" />
              </div>
              <div className="font-medium">Insert anything</div>
              <div className="text-sm">
                Search for any input field or layout option. Use ↑ and ↓ to
                browse, then hit Enter to insert.
              </div>
            </div>
          </div>
        </div>

        <div className="border-t p-3 flex items-center justify-end gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              setActiveIndex(-1);
              onOpenChange(false);
              setAnswerType(undefined);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (answerType) {
                addQuestion(answerType);
                setAnswerType(undefined);
                setActiveIndex(-1);
                onOpenChange(false);
              } else {
                toast.error("No question type selected", {
                  description: "Please choose a type before inserting.",
                });
              }
            }}
          >
            Insert
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
