// src/data/mock.ts
export type Form = {
  id: string;
  name: string;
  createdAt: string;
  responses: number;
  status: "Draft" | "Published";
};
export type FormResponse = {
  id: string;
  formId: string;
  formName: string;
  submittedAt: string;
};
export const formsMock: Form[] = [
  {
    id: "1",
    name: "Customer Survey",
    createdAt: "2025-08-01",
    responses: 42,
    status: "Published",
  },
  {
    id: "2",
    name: "Product Feedback",
    createdAt: "2025-08-15",
    responses: 18,
    status: "Draft",
  },
  {
    id: "3",
    name: "NPS Q3",
    createdAt: "2025-08-12",
    responses: 9,
    status: "Published",
  },
  {
    id: "4",
    name: "Beta Signup",
    createdAt: "2025-08-19",
    responses: 27,
    status: "Published",
  },
  {
    id: "5",
    name: "Website Poll",
    createdAt: "2025-08-21",
    responses: 13,
    status: "Draft",
  },
  {
    id: "6",
    name: "Hiring Form",
    createdAt: "2025-08-22",
    responses: 5,
    status: "Published",
  },
];
export const responsesMock: FormResponse[] = [
  {
    id: "r1",
    formId: "1",
    formName: "Customer Survey",
    submittedAt: "2025-08-23 10:02",
  },
  {
    id: "r2",
    formId: "4",
    formName: "Beta Signup",
    submittedAt: "2025-08-23 09:44",
  },
  {
    id: "r3",
    formId: "3",
    formName: "NPS Q3",
    submittedAt: "2025-08-22 18:10",
  },
  {
    id: "r4",
    formId: "2",
    formName: "Product Feedback",
    submittedAt: "2025-08-22 17:55",
  },
];
