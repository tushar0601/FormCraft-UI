import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Loader2, ChevronLeft, Bot, Download, BarChart3 } from "lucide-react";

/**
 * Customer Satisfaction Survey – Analytics Dashboard (mocked)
 * - No external chart libs; tiny SVG charts and utility bars
 * - Swap mock data with real values later
 * - Uses shadcn/ui + Tailwind
 */

// -------------------- Types --------------------
interface KPI {
  label: string;
  value: string;
  delta?: string; // e.g. +3.1% vs last month
  good?: boolean; // green up vs red down chip
}

interface BarDatum {
  label: string;
  value: number;
}

// -------------------- Mock Data --------------------
const kpis: KPI[] = [
  {
    label: "Total Responses",
    value: "2,847",
    delta: "+12.3% vs last month",
    good: true,
  },
  {
    label: "Completion Rate",
    value: "87.2%",
    delta: "+3.1% vs last month",
    good: true,
  },
  {
    label: "Avg Completion Time",
    value: "4m 32s",
    delta: "-8s vs last month",
    good: false,
  },
];

const ratingBars: BarDatum[] = [
  { label: "Poor", value: 3 },
  { label: "Fair", value: 8 },
  { label: "Good", value: 22 },
  { label: "Very Good", value: 25 },
  { label: "Excellent", value: 42 },
];

const featuresBars: BarDatum[] = [
  { label: "Dashboard", value: 60 },
  { label: "Reports", value: 48 },
  { label: "Integration", value: 34 },
  { label: "Mobile App", value: 72 },
  { label: "Analytics", value: 56 },
];

const npsBars: BarDatum[] = [
  { label: "0–6", value: 18 },
  { label: "7–8", value: 31 },
  { label: "9–10", value: 51 },
];

const keyFindings = [
  "Service satisfaction is high (87% positive)",
  "Mobile app improvements most requested",
  "NPS score improved by 8 points",
];

const recommendations = [
  "Prioritize mobile app development",
  "Address loading speed issues",
  "Expand customer support hours",
];

const attention = [
  "13% completion rate decline in Q3",
  "Pricing concerns increasing",
];

const tags = [
  "mobile app",
  "faster loading",
  "better UI",
  "customer support",
  "pricing",
];

// -------------------- Mini Chart Primitives --------------------
function TinyDelta({ up }: { up?: boolean }) {
  return (
    <span
      className={`inline-flex h-5 items-center rounded-md px-1.5 text-xs font-medium ${
        up ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"
      }`}
    >
      {up ? "▲" : "▼"}
    </span>
  );
}

function HStack({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2">{children}</div>;
}

function BarChartVertical({
  data,
  max = 60,
  height = 120,
}: {
  data: BarDatum[];
  max?: number;
  height?: number;
}) {
  const maxVal = Math.max(max, ...data.map((d) => d.value));
  return (
    <div className="grid grid-cols-5 items-end gap-3">
      {data.map((d) => (
        <div key={d.label} className="text-center">
          <div
            className="mx-auto w-8 rounded-md bg-primary/20"
            style={{ height: `${(d.value / maxVal) * height}px` }}
            title={`${d.label}: ${d.value}%`}
          />
          <div className="mt-1 text-[11px] text-muted-foreground">
            {d.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function BarChartHorizontal({
  data,
  max = 80,
}: {
  data: BarDatum[];
  max?: number;
}) {
  const maxVal = Math.max(max, ...data.map((d) => d.value));
  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div
          key={d.label}
          className="grid grid-cols-[120px_1fr_40px] items-center gap-3 text-sm"
        >
          <div className="truncate text-muted-foreground">{d.label}</div>
          <div className="h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary"
              style={{ width: `${(d.value / maxVal) * 100}%` }}
            />
          </div>
          <div className="text-right font-medium">{d.value}%</div>
        </div>
      ))}
    </div>
  );
}

function SentimentMeter({ positivePct }: { positivePct: number }) {
  return (
    <div className="relative h-2 w-full rounded-full bg-muted">
      <div
        className="absolute left-0 top-0 h-2 rounded-full bg-emerald-500"
        style={{ width: `${positivePct}%` }}
      />
      <div className="mt-2 text-xs text-muted-foreground">
        {positivePct}% Positive
      </div>
    </div>
  );
}

// -------------------- Blocks --------------------
function KPIBlock({ k }: { k: KPI }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-2">
        <CardDescription>{k.label}</CardDescription>
        <CardTitle className="text-3xl">{k.value}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {k.delta && (
          <HStack>
            <TinyDelta up={k.good} />
            <div
              className={`text-sm ${
                k.good ? "text-emerald-600" : "text-orange-600"
              }`}
            >
              {k.delta}
            </div>
          </HStack>
        )}
      </CardContent>
    </Card>
  );
}

function PanelHeader({
  title,
  meta,
  badge,
}: {
  title: string;
  meta?: string;
  badge?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div>
        <h3 className="text-sm font-semibold leading-tight">{title}</h3>
        {meta && <p className="text-xs text-muted-foreground">{meta}</p>}
      </div>
      {badge && (
        <Badge variant="outline" className="text-[10px]">
          {badge}
        </Badge>
      )}
    </div>
  );
}

function RatingCard() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <PanelHeader
          title="How would you rate our service?"
          meta="2,743 responses • 104 skips"
          badge="MCQ"
        />
      </CardHeader>
      <CardContent>
        <BarChartVertical data={ratingBars} />
        <div className="mt-3 text-xs text-muted-foreground">
          Most chosen:{" "}
          <span className="font-medium text-foreground">Excellent (42%)</span>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline" size="sm">
          Drilldown
        </Button>
        <Button variant="secondary" size="sm">
          Ask AI
        </Button>
      </CardFooter>
    </Card>
  );
}

function FeatureUsageCard() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <PanelHeader
          title="Which features do you use most?"
          meta="2,621 responses • 226 skips"
          badge="Checkbox"
        />
      </CardHeader>
      <CardContent>
        <BarChartHorizontal data={featuresBars} />
        <div className="mt-3 text-xs text-muted-foreground">
          Avg selections: <span className="font-medium">2.3 per user</span>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline" size="sm">
          Drilldown
        </Button>
        <Button variant="secondary" size="sm">
          Ask AI
        </Button>
      </CardFooter>
    </Card>
  );
}

function SuggestionsCard() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <PanelHeader
          title="What improvements would you suggest?"
          meta="1,892 responses • 955 skips"
          badge="Text"
        />
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Badge key={t} variant="secondary" className="rounded-full">
              {t}
            </Badge>
          ))}
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Sentiment</span>
            <span className="font-medium text-emerald-600">72% Positive</span>
          </div>
          <SentimentMeter positivePct={72} />
          <div>Avg length: 23 words</div>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline" size="sm">
          Drilldown
        </Button>
        <Button variant="secondary" size="sm">
          Ask AI
        </Button>
      </CardFooter>
    </Card>
  );
}

function NPSCard() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <PanelHeader
          title="How likely are you to recommend us?"
          meta="2,698 responses • 149 skips"
          badge="MCQ"
        />
      </CardHeader>
      <CardContent>
        <BarChartVertical data={npsBars} />
        <div className="mt-3 text-xs text-muted-foreground">
          NPS Score: <span className="text-emerald-600 font-medium">+34</span>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline" size="sm">
          Drilldown
        </Button>
        <Button variant="secondary" size="sm">
          Ask AI
        </Button>
      </CardFooter>
    </Card>
  );
}

function AIInsightsPanel() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4" />
          <CardTitle className="text-base">AI Insights</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md bg-blue-50 p-3">
          <div className="mb-2 text-sm font-semibold">Key Findings</div>
          <ul className="list-disc space-y-1 pl-5 text-sm text-blue-900">
            {keyFindings.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-md bg-emerald-50 p-3">
          <div className="mb-2 text-sm font-semibold">Recommendations</div>
          <ul className="list-disc space-y-1 pl-5 text-sm text-emerald-900">
            {recommendations.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-md bg-orange-50 p-3">
          <div className="mb-2 text-sm font-semibold">Attention Needed</div>
          <ul className="list-disc space-y-1 pl-5 text-sm text-orange-900">
            {attention.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-md border p-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span>Ask AI about your data…</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// -------------------- Page --------------------
export default function FormResponseAnalytics() {
  return (
    <div className="p-6 md:p-8">
      {/* Top Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold leading-tight">
              Customer Satisfaction Survey
            </h1>
            <p className="text-xs text-muted-foreground">Analytics Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-[140px] h-9 text-sm">
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {kpis.map((k) => (
          <KPIBlock key={k.label} k={k} />
        ))}
      </div>

      <Separator className="my-6" />

      {/* Body */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left – question panels */}
        <div className="space-y-6 lg:col-span-2">
          <div>
            <h2 className="mb-3 text-sm font-semibold">Question Analytics</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <RatingCard />
              <FeatureUsageCard />
              <SuggestionsCard />
              <NPSCard />
            </div>
          </div>
        </div>

        {/* Right – AI insights */}
        <div className="space-y-6">
          <AIInsightsPanel />
        </div>
      </div>
    </div>
  );
}
