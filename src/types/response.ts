/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlockType, UUID } from "./enum";


export interface BlockResponseRead {
  id: UUID;
  form_block_id: UUID;
  block_type: BlockType;
  value: Record<string, any>;
  submitted_at?: string | null; 
}

export interface ResponseRead {
  id: UUID;
  form_id: UUID;
  submitted_at?: string | null;      
  submitted_ip?: string | null;
  respondent_user_id?: UUID | null;
  meta_data: Record<string, any>;     
  blocks: BlockResponseRead[];       
}