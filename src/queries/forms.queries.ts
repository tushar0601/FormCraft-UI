import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getForm,
  getForms,
  createForm,
  updateForm,
  deleteForm,
} from "@/services/form.service";

export const useFormListQuery = (skip = 0, limit = 50) =>
  useQuery({
    queryKey: ["forms", skip, limit],
    queryFn: () => getForms({ skip, limit }),
  });

export const useFormQuery = (slug: string) =>
  useQuery({
    queryKey: ["form", slug],
    queryFn: () => getForm(slug),
    enabled: !!slug,
  });

export const useCreateForm = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createForm,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["forms"] }),
  });
};

export const useUpdateForm = (id: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateForm,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["forms"] });
      qc.invalidateQueries({ queryKey: ["form", id] });
    },
  });
};

export const useDeleteForm = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteForm,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["forms"] }),
  });
};
