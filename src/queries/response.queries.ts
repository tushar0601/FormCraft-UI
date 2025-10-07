import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getResponse, getResponses, createResponse } from "@/services/response.service";

export const useResponseListQuery = (skip = 0, limit = 50) =>
  useQuery({
    queryKey: ["response", skip, limit],
    queryFn: () => getResponses({ skip, limit }),
  });


export const useResponseQuery = (slug: string) =>
  useQuery({ queryKey: ["response", slug], queryFn: () => getResponse(slug), enabled: !!slug });

export const useCreateResponse = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createResponse,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["response"] }),
  });
};
