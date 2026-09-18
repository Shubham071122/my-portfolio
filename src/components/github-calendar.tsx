"use client";

import { ActivityCalendar, Activity } from "react-activity-calendar";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { Calendar, Flame } from "lucide-react";
import { Icons } from "@/components/icons";

export interface GitHubAccount {
  label: string;
  username: string;
}

interface Props {
  username?: string;
  accounts?: (GitHubAccount | string)[];
}

const DEFAULT_ACCOUNTS: (GitHubAccount | string)[] = [
  "Shubham071122",
  "shubham-kumar-acowale",
];

const gitHubTheme = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

function calculateLevel(count: number): number {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

export default function GitHubCalendarPanel({ username, accounts = DEFAULT_ACCOUNTS }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>("last");

  const [dataset, setDataset] = useState<{
    allContributions: Activity[];
    yearTotals: Record<string, number>;
    availableYears: string[];
    lifetimeTotal: number;
    lastYearTotal: number;
    peakYear: { year: string; count: number } | null;
  }>({
    allContributions: [],
    yearTotals: {},
    availableYears: [],
    lifetimeTotal: 0,
    lastYearTotal: 0,
    peakYear: null,
  });

  const parsedAccounts = useMemo(() => {
    if (username) return [{ label: "Profile", username }];
    return accounts.map((acc) =>
      typeof acc === "string" ? { label: acc, username: acc } : acc
    );
  }, [username, accounts]);

  const targetUsernamesKey = parsedAccounts.map((a) => a.username).join(",");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let isMounted = true;
    setLoading(true);

    const fetchAllData = async () => {
      try {
        const fetchedResults = await Promise.all(
          parsedAccounts.map(async (acc) => {
            try {
              const res = await fetch(
                `https://github-contributions-api.jogruber.de/v4/${acc.username}`
              );
              if (!res.ok) throw new Error("Failed to fetch");
              return await res.json();
            } catch (err) {
              console.error(`Failed to load GitHub activity for ${acc.username}`, err);
              return { total: {}, contributions: [] };
            }
          })
        );

        // Aggregate daily contributions across all accounts
        const dateMap = new Map<string, number>();
        const yearTotals: Record<string, number> = {};

        fetchedResults.forEach((res) => {
          if (res?.total) {
            Object.entries(res.total as Record<string, number>).forEach(([yr, count]) => {
              yearTotals[yr] = (yearTotals[yr] || 0) + (count || 0);
            });
          }

          if (Array.isArray(res?.contributions)) {
            res.contributions.forEach((item: { date: string; count: number }) => {
              const current = dateMap.get(item.date) || 0;
              dateMap.set(item.date, current + (item.count || 0));
            });
          }
        });

        const allContributions: Activity[] = Array.from(dateMap.entries())
          .map(([date, count]) => ({
            date,
            count,
            level: calculateLevel(count),
          }))
          .sort((a, b) => a.date.localeCompare(b.date));

        // Available years in descending order
        const availableYears = Object.keys(yearTotals).sort(
          (a, b) => Number(b) - Number(a)
        );

        // Calculate lifetime total & peak year
        let lifetimeTotal = 0;
        let peakYear: { year: string; count: number } | null = null;

        Object.entries(yearTotals).forEach(([yr, count]) => {
          lifetimeTotal += count;
          if (!peakYear || count > peakYear.count) {
            peakYear = { year: yr, count };
          }
        });

        // Calculate rolling last 365 days total
        const last365Slice = allContributions.slice(-365);
        const lastYearTotal = last365Slice.reduce((sum, c) => sum + c.count, 0);

        if (isMounted) {
          setDataset({
            allContributions,
            yearTotals,
            availableYears,
            lifetimeTotal,
            lastYearTotal,
            peakYear,
          });
          setLoading(false);
        }
      } catch {
        if (isMounted) setLoading(false);
      }
    };

    fetchAllData();

    return () => {
      isMounted = false;
    };
  }, [mounted, targetUsernamesKey, parsedAccounts]);

  // Compute displayed calendar slice based on selectedYear
  const { currentContributions, currentTotal } = useMemo(() => {
    if (dataset.allContributions.length === 0) {
      return { currentContributions: [], currentTotal: 0 };
    }

    if (selectedYear === "last") {
      const slice = dataset.allContributions.slice(-365);
      return {
        currentContributions: slice,
        currentTotal: dataset.lastYearTotal,
      };
    }

    const slice = dataset.allContributions.filter((c) =>
      c.date.startsWith(`${selectedYear}-`)
    );
    const total = dataset.yearTotals[selectedYear] ?? slice.reduce((sum, c) => sum + c.count, 0);

    return {
      currentContributions: slice,
      currentTotal: total,
    };
  }, [selectedYear, dataset]);

  if (!mounted) {
    return (
      <div className="w-full h-[220px] animate-pulse bg-muted/40 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl" />
    );
  }

  const earliestYear =
    dataset.availableYears.length > 0
      ? dataset.availableYears[dataset.availableYears.length - 1]
      : "2022";
  const latestYear = dataset.availableYears[0] || "2026";

  return (
    <div className="w-full overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-br from-zinc-50/90 via-zinc-100/50 to-zinc-50/90 dark:from-zinc-900/60 dark:via-zinc-950/70 dark:to-zinc-900/60 p-5 sm:p-6 rounded-2xl blueprint-grid shadow-sm hover:shadow-md dark:hover:shadow-black/30 transition-all relative">
      {/* Subtle blueprint crosshairs */}
      <div className="absolute top-3 left-3 size-3 flex items-center justify-center pointer-events-none opacity-20 dark:opacity-40 z-10">
        <div className="absolute w-px h-full bg-zinc-400 dark:bg-zinc-600" />
        <div className="absolute w-full h-px bg-zinc-400 dark:bg-zinc-600" />
      </div>
      <div className="absolute top-3 right-3 size-3 flex items-center justify-center pointer-events-none opacity-20 dark:opacity-40 z-10">
        <div className="absolute w-px h-full bg-zinc-400 dark:bg-zinc-600" />
        <div className="absolute w-full h-px bg-zinc-400 dark:bg-zinc-600" />
      </div>
      <div className="absolute bottom-3 left-3 size-3 flex items-center justify-center pointer-events-none opacity-20 dark:opacity-40 z-10">
        <div className="absolute w-px h-full bg-zinc-400 dark:bg-zinc-600" />
        <div className="absolute w-full h-px bg-zinc-400 dark:bg-zinc-600" />
      </div>
      <div className="absolute bottom-3 right-3 size-3 flex items-center justify-center pointer-events-none opacity-20 dark:opacity-40 z-10">
        <div className="absolute w-px h-full bg-zinc-400 dark:bg-zinc-600" />
        <div className="absolute w-full h-px bg-zinc-400 dark:bg-zinc-600" />
      </div>

      <div className="relative z-20 flex flex-col gap-5 w-full">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-foreground shadow-sm shrink-0">
              <Icons.github className="size-4" />
            </div>
            <h3 className="text-base font-bold tracking-tight text-foreground">
              GitHub Contributions
            </h3>
          </div>

          {/* Year Filter Segmented Control */}
          <div className="inline-flex items-center p-1 rounded-xl bg-zinc-200/50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50 backdrop-blur-sm self-start sm:self-auto overflow-x-auto max-w-full scrollbar-none shrink-0 gap-0.5">
            <button
              type="button"
              onClick={() => setSelectedYear("last")}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all whitespace-nowrap select-none ${
                selectedYear === "last"
                  ? "bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 shadow-sm font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-foreground hover:bg-white/40 dark:hover:bg-zinc-900/40"
              }`}
            >
              Last Year
            </button>
            {dataset.availableYears.map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setSelectedYear(yr)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all whitespace-nowrap select-none ${
                  selectedYear === yr
                    ? "bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 shadow-sm font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-foreground hover:bg-white/40 dark:hover:bg-zinc-900/40"
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Summary Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-medium">
            <span className="text-sm font-bold text-foreground">
              {currentTotal.toLocaleString()}
            </span>
            <span className="text-muted-foreground">
              contributions in{" "}
              {selectedYear === "last" ? "the last year" : selectedYear}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-medium text-muted-foreground">
            {dataset.lifetimeTotal > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-200/60 dark:bg-zinc-800/60 text-foreground font-semibold">
                <Flame className="size-3 text-amber-500" />
                {dataset.lifetimeTotal.toLocaleString()} All-Time
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3 text-zinc-400" />
              Active since {earliestYear}
            </span>
          </div>
        </div>

        {/* Contribution Calendar Grid */}
        <div className="w-full overflow-x-auto py-2 flex justify-center scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
          <ActivityCalendar
            data={currentContributions}
            loading={loading}
            colorScheme={resolvedTheme as "light" | "dark"}
            theme={gitHubTheme}
            blockSize={11}
            blockMargin={4}
            blockRadius={2}
            fontSize={11}
            showWeekdayLabels={true}
            showColorLegend={true}
            labels={{
              months: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              legend: {
                less: "Less",
                more: "More",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
