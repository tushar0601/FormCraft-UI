/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormStatus, FormAccess, BlockType } from "./enum";

export interface QuestionRequest {
  question_order: number;
  title: string;
  type?: BlockType;
  config?: Record<string, any>;
}

export interface FormCreateRequest {
  title: string;
  status?: FormStatus;
  access?: FormAccess;
  questions: QuestionRequest[];
}

export interface FormUpdateRequest {
  title: string;
  status?: FormStatus;
  access?: FormAccess;
  questions: QuestionRequest[];
  id: string;
  slug: string;
}
