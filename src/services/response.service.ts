import { http } from "./apiClient";
import { ResponseCreateRequest } from "@/types/response_request";
import { ResponseRead } from "@/types/response";


export const createResponse = async (payload: Partial<ResponseCreateRequest>) => {
  const res = await http.post<ResponseRead>("/response", payload);
  return res.data;
};

export const getResponses = async (params?: { skip?: number; limit?: number }) => {
  const res = await http.get<ResponseRead[]>("/form", { params });
  return res.data;
};

export const getResponse = async (slug: string) => {
  const res = await http.get<ResponseRead>(`/form/${slug}`);
  return res.data;
};