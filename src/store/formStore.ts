import { create } from "zustand";
import type { FormsResponse, FormDTO } from "@/types/form";

type FormState = {
  currentForm: FormDTO | undefined;
  setCurrentForm: (form: FormDTO) => void;
  allForms: FormsResponse;
  setAllForms: (forms: FormsResponse) => void;
};

export const useFormStore = create<FormState>((set) => ({
  currentForm: undefined,
  setCurrentForm: (form: FormDTO) => set(() => ({ currentForm: form })),
  allForms: [],
  setAllForms: (forms: FormsResponse) => set(() => ({ allForms: forms })),
}));
