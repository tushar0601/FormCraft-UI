import { FormAccess } from "./enum";

export interface FormAnalyticsData {
  form_id: string;
  title: string;
  response_count: number;
  completion_rate: number;
  type: FormAccess;
  created_at: string;
}

export interface MainPageAnalyticsData {
  form_data: FormAnalyticsData[];
  total_forms: number;
  total_responses: number;
  avg_completion_rate: number;
}
