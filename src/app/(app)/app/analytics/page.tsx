"use client";

import { useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search, LineChart } from "lucide-react";

import { useAnalyticsDataQuery } from "@/queries/forms.analytics";
import { useAnalyticsStore } from "@/store/analyticsStore";
import {
  FormAnalyticsData,
  MainPageAnalyticsData,
} from "@/types/form_analytics";
import { FormAccess } from "@/types/enum";
import { Skeleton } from "@/components/ui/skeleton";

function Sparkline({
  values,
  width = 140,
  height = 40,
}: {
  values: number[];
  width?: number;
  height?: number;
}) {
  const path = useMemo(() => {
    if (!values.length) return "";
    const max = Math.max(...values);
    const min = Math.min(...values);
    const norm = (v: number) => (max === min ? 0.5 : (v - min) / (max - min));
    const step = width / (values.length - 1);
    return values
      .map(
        (v, i) =>
          `${i === 0 ? "M" : "L"}${i * step},${height - norm(v) * height}`
      )
      .join(" ");
  }, [values, width, height]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
    >
      <path
        d={path}
        fill="none"
        strokeWidth={2}
        stroke="currentColor"
        className="text-zinc-400"
      />
    </svg>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div>
      <div className="text-3xl font-semibold leading-tight">{value}</div>
      <div className="text-xs text-muted-foreground">{sub ?? label}</div>
    </div>
  );
}

function VisibilityBadge({ v }: { v: FormAccess }) {
  return (
    <Badge
      variant={v === "PUBLIC" ? "secondary" : "outline"}
      className="capitalize"
    >
      {v}
    </Badge>
  );
}

function FormCard({ f }: { f: FormAnalyticsData }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base font-semibold leading-tight">
              {f.title}
            </CardTitle>
            <CardDescription>Created {f.created_at}</CardDescription>
          </div>
          <VisibilityBadge v={f.type} />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4">
          <Stat label="Total Responses" value={f.response_count} />
          <Stat label="Completion Rate" value={`${f.completion_rate}%`} />
        </div>
        <div className="mt-3">
          <Sparkline values={[5, 6, 5, 7, 8, 7, 9]} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {"Updated 2 hours ago"}
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Analytics</Button>
      </CardFooter>
    </Card>
  );
}

function QuickSummaryCard({ data }: { data: MainPageAnalyticsData }) {
  return (
    <Card className="rounded-2xl sticky top-4">
      <CardHeader>
        <CardTitle className="text-base">Quick Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Stat label="Total Forms" value={data.total_forms} />
          <Stat label="Total Responses" value={data.total_responses} />
        </div>
        <div>
          <div className="text-xs text-muted-foreground">
            Avg Completion Rate
          </div>
          <div className="text-3xl font-semibold">
            {data.avg_completion_rate}%
          </div>
        </div>
        <div>
          <div className="mb-2 text-sm font-medium">Engagement Trend</div>
          <div className="rounded-lg border p-3">
            <Sparkline values={[5, 6, 5, 7, 8, 7, 9]} width={220} height={60} />
          </div>
        </div>
        <div>
          <div className="mb-2 text-sm font-medium">Top Performing Forms</div>
          <div className="space-y-2">
            {data.form_data.map((t) => (
              <div
                key={t.form_id}
                className="flex items-center justify-between text-sm"
              >
                <span className="truncate pr-2">{t.title}</span>
                <span className="font-medium">{t.completion_rate}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FiltersBar() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select defaultValue="all">
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="marketing">Marketing</SelectItem>
          <SelectItem value="survey">Survey</SelectItem>
          <SelectItem value="support">Support</SelectItem>
          <SelectItem value="events">Events</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="30d">
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Last 30 days" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7d">Last 7 days</SelectItem>
          <SelectItem value="30d">Last 30 days</SelectItem>
          <SelectItem value="90d">Last 90 days</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="all">
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="All Visibility" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Visibility</SelectItem>
          <SelectItem value="public">Public</SelectItem>
          <SelectItem value="private">Private</SelectItem>
        </SelectContent>
      </Select>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search forms…" className="pl-8 w-[240px]" />
        </div>
      </div>
    </div>
  );
}

export default function FormAnalyticsPage() {
  const { data, isLoading } = useAnalyticsDataQuery();
  const { analyticsData, setAnalyticsData } = useAnalyticsStore();

  useEffect(() => {
    if (data) setAnalyticsData(data);
  }, [data, setAnalyticsData]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 p-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
            <LineChart className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold leading-tight">
              Form Analytics
            </h1>
            <p className="text-sm text-muted-foreground">All Forms</p>
          </div>
        </div>
      </div>

      <FiltersBar />

      <Separator className="my-6" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-4">
        <div className="lg:col-span-2 xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {analyticsData &&
              analyticsData.form_data.map((f) => (
                <FormCard key={f.form_id} f={f} />
              ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          {analyticsData && <QuickSummaryCard data={analyticsData} />}
        </div>
      </div>
    </div>
  );
}
