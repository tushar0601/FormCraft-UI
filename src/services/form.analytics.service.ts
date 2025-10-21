import { http } from "./apiClient";
import { MainPageAnalyticsData } from "@/types/form_analytics";

export const getAnalyticsData = async () => {
  const res = await http.get<MainPageAnalyticsData>(
    "/form-analytics/main-page"
  );
  return res.data;
};
