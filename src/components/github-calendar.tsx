"use client";

import { ActivityCalendar, Activity } from "react-activity-calendar";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState, useRef } from "react";
import { Calendar, Flame, Loader2, ChevronDown, Check } from "lucide-react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

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
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [selectedYear, setSelectedYear] = useState<string>(() =>
    new Date().getFullYear().toString()
  );

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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsYearDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
          if (availableYears.length > 0 && !availableYears.includes(selectedYear)) {
            setSelectedYear(availableYears[0]);
          }
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
  }, [mounted, targetUsernamesKey]);

  // Compute displayed calendar slice based on selectedYear
  const { currentContributions, currentTotal } = useMemo(() => {
    if (dataset.allContributions.length === 0) {
      return { currentContributions: [], currentTotal: 0 };
    }

    const targetYear =
      selectedYear === "last" || !dataset.availableYears.includes(selectedYear)
        ? dataset.availableYears[0] || new Date().getFullYear().toString()
        : selectedYear;

    const slice = dataset.allContributions.filter((c) =>
      c.date.startsWith(`${targetYear}-`)
    );
    const total =
      dataset.yearTotals[targetYear] ?? slice.reduce((sum, c) => sum + c.count, 0);

    return {
      currentContributions: slice,
      currentTotal: total,
    };
  }, [selectedYear, dataset]);

  // Auto scroll to latest activity (right side) on load and when year changes
  useEffect(() => {
    if (scrollContainerRef.current && currentContributions.length > 0) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [selectedYear, currentContributions]);

  if (!mounted) {
    return (
      <div className="w-full h-[220px] animate-pulse bg-muted/40 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl" />
    );
  }

  const earliestYear =
    dataset.availableYears.length > 0
      ? dataset.availableYears[dataset.availableYears.length - 1]
      : "2022";

  return (
    <div className="w-full overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-br from-zinc-50/90 via-zinc-100/50 to-zinc-50/90 dark:from-zinc-900/60 dark:via-zinc-950/70 dark:to-zinc-900/60 p-4 sm:p-6 rounded-2xl blueprint-grid shadow-sm hover:shadow-md dark:hover:shadow-black/30 transition-all relative">
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

      <div className="relative z-20 flex flex-col gap-3.5 sm:gap-4 w-full">
        {/* Top Header Row with Title on Left and shadcn-styled Dropdown on Right */}
        <div className="flex items-center justify-between gap-3 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-3">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="size-8 sm:size-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-foreground shadow-sm shrink-0">
              <Icons.github className="size-4" />
            </div>
            <h3 className="text-sm sm:text-base font-bold tracking-tight text-foreground">
              GitHub Contributions
            </h3>
          </div>

          {/* Custom shadcn-styled Year Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-100 hover:text-white transition-all shadow-sm focus:outline-none select-none"
              aria-expanded={isYearDropdownOpen}
            >
              <span>{selectedYear}</span>
              <ChevronDown
                className={cn(
                  "size-3.5 text-zinc-400 transition-transform duration-200",
                  isYearDropdownOpen ? "rotate-180 text-white" : ""
                )}
              />
            </button>

            {/* Popover Menu */}
            {isYearDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-28 py-1 rounded-xl bg-zinc-950 border border-zinc-800 shadow-2xl z-30 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-100">
                {dataset.availableYears.map((yr) => {
                  const isSelected = selectedYear === yr;
                  return (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => {
                        setSelectedYear(yr);
                        setIsYearDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full px-3 py-1.5 text-left text-xs font-medium flex items-center justify-between transition-colors",
                        isSelected
                          ? "bg-zinc-900 text-white font-semibold"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
                      )}
                    >
                      <span>{yr}</span>
                      {isSelected && <Check className="size-3 text-blue-400" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Top Badges (All-Time & Active Since) */}
        <div className="flex items-center gap-3 text-[11px] sm:text-xs font-medium text-muted-foreground">
          {dataset.lifetimeTotal > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-200/60 dark:bg-zinc-800/60 text-foreground font-semibold">
              <Flame className="size-3.5 text-amber-500" />
              {dataset.lifetimeTotal.toLocaleString()} All-Time
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 text-zinc-400">
            <Calendar className="size-3.5 text-zinc-400" />
            Active since {earliestYear}
          </span>
        </div>

        {/* Horizontal Scrollable Calendar Grid */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-800 [&_.react-activity-calendar__footer]:!hidden"
        >
          {loading || currentContributions.length === 0 ? (
            <div className="w-full h-[120px] flex items-center justify-center rounded-xl bg-zinc-100/40 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50 animate-pulse">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="size-4 animate-spin text-blue-500" />
                <span>Loading contributions activity...</span>
              </div>
            </div>
          ) : (
            <div className="min-w-fit">
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
                showColorLegend={false}
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
                }}
              />
            </div>
          )}
        </div>

        {/* Static, Non-Scrolling Bottom Bar */}
        <div className="flex items-center justify-between text-xs text-muted-foreground select-none pt-1">
          <span className="text-xs text-muted-foreground">
            {currentTotal.toLocaleString()} activities in {selectedYear}
          </span>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex items-center gap-1">
              {(resolvedTheme === "light" ? gitHubTheme.light : gitHubTheme.dark).map((color, idx) => (
                <span
                  key={idx}
                  className="size-[11px] rounded-[2px]"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
