import { create } from "zustand";
import { BlockType } from "@/types/enum";
import { FormDTO } from "@/types/form";

export type QuestionConfig =
  | {
      type: "multichoice";
      options: string[];
      required?: boolean;
      help?: string;
    }
  | { type: "text"; placeholder: string; required: boolean; help?: string }
  | { type: "checkbox"; options: string[]; required?: boolean; help?: string }
  | { type: "long_text"; placeholder: string; required: boolean; help?: string }
  | { type: "date"; placeholder: string; required: boolean; help?: string }
  | { type: "number"; placeholder: string; required: boolean; help?: string };

export type QuestionBlock = {
  id: string;
  questionText: string;
  answerType?: BlockType;
  config?: QuestionConfig;
};

type CurrentFormState = {
  currentForm: FormDTO | undefined;
  setCurrentForm: (form: FormDTO) => void;
  title: string;
  setTitle: (t: string) => void;
  questions: QuestionBlock[];
  addQuestion: (type: BlockType) => void;
  setAnswerType: (id: string, type: BlockType) => void;
  updateConfig: (id: string, config: QuestionConfig) => void;
  reorderQuestions: (newList: QuestionBlock[]) => void;
  updateQuestionText: (id: string, text: string) => void;
  deleteQuestion: (id: string) => void;
};

const defaultConfig = (type: BlockType): QuestionConfig => {
  switch (type) {
    case "multichoice":
      return { type, options: [""], required: false };
    case "checkbox":
      return { type, options: [""], required: false };
    case "text":
      return { type, placeholder: "", required: false };
    case "long_text":
      return { type, placeholder: "", required: false };
    case "number":
      return { type, placeholder: "", required: false };
    case "date":
      return { type, placeholder: "", required: false };
  }
};

export const useCurrentFormStore = create<CurrentFormState>((set) => ({
  currentForm: undefined,
  setCurrentForm: (form: FormDTO) => set({ currentForm: form }),
  title: "",
  setTitle: (t) => set({ title: t }),
  questions: [],
  addQuestion: (type: BlockType) =>
    set((state) => ({
      questions: [
        ...state.questions,
        { id: crypto.randomUUID(), questionText: "", answerType: type },
      ],
    })),
  setAnswerType: (id, type) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id
          ? { ...q, answerType: type, config: defaultConfig(type) }
          : q
      ),
    })),
  updateConfig: (id, config) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, config } : q
      ),
    })),
  reorderQuestions: (newList: QuestionBlock[]) =>
    set(() => ({
      questions: newList,
    })),
  updateQuestionText: (id, text) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, questionText: text } : q
      ),
    })),
  deleteQuestion: (id) =>
    set((state) => ({ questions: state.questions.filter((q) => q.id !== id) })),
}));
