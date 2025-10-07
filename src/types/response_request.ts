/* eslint-disable @typescript-eslint/no-explicit-any */

import { BlockType,ResponseStatusEnum, UUID } from "./enum";

export interface ResponseBlockCreateRequest {
  form_block_id: UUID;
  block_type: BlockType;
  value: Record<string, any>;        
  time_to_answer_ms: number;
}

export interface ResponseCreateRequest {
  form_id: UUID;
  submitted_ip: string;
  status: ResponseStatusEnum;               
  meta_data: Record<string, any>;
  question_responses: ResponseBlockCreateRequest[];
}