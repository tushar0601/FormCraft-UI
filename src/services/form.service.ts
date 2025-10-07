import { http } from "./apiClient";
import type { FormsResponse, FormDTO } from "@/types/form";
import { FormCreateRequest, FormUpdateRequest } from "@/types/form_request";
export const getForms = async (params?: { skip?: number; limit?: number }) => {
  const res = await http.get<FormsResponse>("/form", { params });
  return res.data;
};

export const getForm = async (slug: string) => {
  const res = await http.get<FormDTO>(`/form/${slug}`);
  return res.data;
};

export const createForm = async (payload: Partial<FormCreateRequest>) => {
  const res = await http.post<FormDTO>("/form", payload);
  return res.data;
};

export const updateForm = async (payload: Partial<FormUpdateRequest>) => {
  const res = await http.put<FormDTO>(`/form/`, payload);
  return res.data;
};

export const deleteForm = async (id: string) => {
  await http.delete(`/form/${id}`);
};
