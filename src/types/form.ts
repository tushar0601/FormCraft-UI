import { FormStatus, TextValidation, FormAccess, UUID } from "./enum";

export interface TextConfig {
  required: boolean;
  placeholder?: string;
  validation?: TextValidation | string;
}

export interface LongTextConfig {
  required: boolean;
  placeholder?: string;
}

export interface MultiChoiceConfig {
  required: boolean;
  options: string[];
  max_choices?: number;
}

export interface CheckboxConfig {
  label: string;
  required?: boolean;
}

export interface DateConfig {
  required: boolean;
  min_date?: string;
  max_date?: string;
}

export interface NumberConfig {
  required: boolean;
  min?: number;
  max?: number;
  placeholder?: string;
}

export interface BaseBlock {
  id: UUID;
  form_id: UUID;
  sort_order: number;
  name: string;
  updated_at: string;
}

export interface TextBlock extends BaseBlock {
  block_type: "text";
  config: TextConfig;
}

export interface LongTextBlock extends BaseBlock {
  block_type: "long_text";
  config: LongTextConfig;
}

export interface MultiChoiceBlock extends BaseBlock {
  block_type: "multichoice";
  config: MultiChoiceConfig;
}

export interface CheckboxBlock extends BaseBlock {
  block_type: "checkbox";
  config: CheckboxConfig;
}

export interface DateBlock extends BaseBlock {
  block_type: "date";
  config: DateConfig;
}

export interface NumberBlock extends BaseBlock {
  block_type: "number";
  config: NumberConfig;
}

export type FormBlock =
  | TextBlock
  | LongTextBlock
  | MultiChoiceBlock
  | CheckboxBlock
  | DateBlock
  | NumberBlock;

export interface FormDTO {
  id: UUID;
  title: string;
  slug: string;
  status: FormStatus;
  access: FormAccess;
  created_by: UUID;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  blocks: FormBlock[];
}

export type FormsResponse = FormDTO[];
