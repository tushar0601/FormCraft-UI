import { create } from "zustand";
import { MainPageAnalyticsData } from "@/types/form_analytics";

type AnalyticsState = {
  analyticsData: MainPageAnalyticsData | undefined;
  setAnalyticsData: (data: MainPageAnalyticsData) => void;
};

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  analyticsData: undefined,
  setAnalyticsData: (data: MainPageAnalyticsData) => set({ analyticsData: data }),
}));
