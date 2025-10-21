import { useQuery } from "@tanstack/react-query";
import { getAnalyticsData } from "@/services/form.analytics.service";

export const useAnalyticsDataQuery = () =>
  useQuery({
    queryKey: ["analytics"],
    queryFn: () => getAnalyticsData(),
  });
