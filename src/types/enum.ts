export type UUID = string;

export type BlockType =
  | "text"
  | "long_text"
  | "multichoice"
  | "checkbox"
  | "date"
  | "number";

export type FormStatus = "Draft" | "Published" | "Archived";

export type FormAccess = "PUBLIC" | "LOGIN_REQUIRED" | "LINK_ONLY";

export type TextValidation = "email" | "url" | "none";

export enum ResponseStatusEnum {
  IN_PROGRESS = "in_progress",
  SUBMITTED = "submitted",
  SPAM = "spam",
  DELETED = "deleted",
}