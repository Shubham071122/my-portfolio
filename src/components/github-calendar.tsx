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
                `https://github-contributions-api.jogruber.de/v4/${acc.username}?y=all`
              );
              if (!res.ok) return null;
              return await res.json();
            } catch {
              return null;
            }
          })
        );

        if (!isMounted) return;

        const validResults = fetchedResults.filter(Boolean);
        if (validResults.length === 0) {
          setLoading(false);
          return;
        }

        const dateContributionMap = new Map<string, { date: string; count: number }>();
        const yearSumMap: Record<string, number> = {};

        validResults.forEach((data) => {
          if (data && Array.isArray(data.contributions)) {
            data.contributions.forEach((day: { date: string; count: number }) => {
              const existing = dateContributionMap.get(day.date);
              if (existing) {
                existing.count += day.count;
              } else {
                dateContributionMap.set(day.date, { date: day.date, count: day.count });
              }

              const yr = day.date.split("-")[0];
              yearSumMap[yr] = (yearSumMap[yr] || 0) + day.count;
            });
          }
        });

        const mergedContributions: Activity[] = Array.from(dateContributionMap.values())
          .sort((a, b) => a.date.localeCompare(b.date))
          .map((item) => ({
            date: item.date,
            count: item.count,
            level: calculateLevel(item.count),
          }));

        const availableYears = Object.keys(yearSumMap).sort((a, b) => b.localeCompare(a));
        const lifetimeTotal = Object.values(yearSumMap).reduce((a, b) => a + b, 0);

        let peakYear: { year: string; count: number } | null = null;
        Object.entries(yearSumMap).forEach(([yr, count]) => {
          if (!peakYear || count > peakYear.count) {
            peakYear = { year: yr, count };
          }
        });

        const currentYr = new Date().getFullYear().toString();
        const lastYearTotal = yearSumMap[currentYr] || 0;

        if (isMounted) {
          setDataset({
            allContributions: mergedContributions,
            yearTotals: yearSumMap,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const slice = dataset.allContributions.filter((c) => c.date.startsWith(targetYear));
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
      <div className="w-full h-[180px] animate-pulse bg-muted/20 border border-border/50 rounded-2xl" />
    );
  }

  const earliestYear =
    dataset.availableYears.length > 0
      ? dataset.availableYears[dataset.availableYears.length - 1]
      : "2022";

  return (
    <div className="w-full overflow-hidden border border-border/60 bg-muted/20 hover:bg-muted/30 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-sm hover:border-blue-500/30 transition-all">
      <div className="relative z-10 flex flex-col gap-3.5 sm:gap-4 w-full">
        {/* Top Header Row with Title on Left and Dropdown on Right */}
        <div className="flex items-center justify-between gap-3 border-b border-border/50 pb-3">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="size-8 rounded-xl bg-background/80 border border-border flex items-center justify-center text-foreground shadow-sm shrink-0">
              <Icons.github className="size-4" />
            </div>
            <h3 className="text-sm sm:text-base font-bold tracking-tight text-foreground">
              GitHub Contributions
            </h3>
          </div>

          {/* Custom Year Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-background/80 hover:bg-background border border-border text-xs font-semibold text-foreground transition-all shadow-sm focus:outline-none select-none"
              aria-expanded={isYearDropdownOpen}
            >
              <span>{selectedYear}</span>
              <ChevronDown
                className={cn(
                  "size-3.5 text-muted-foreground transition-transform duration-200",
                  isYearDropdownOpen ? "rotate-180 text-foreground" : ""
                )}
              />
            </button>

            {/* Popover Menu */}
            {isYearDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-28 py-1 rounded-xl bg-background border border-border shadow-2xl z-30 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-100">
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
                          ? "bg-muted text-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                      )}
                    >
                      <span>{yr}</span>
                      {isSelected && <Check className="size-3 text-blue-500" />}
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
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background/60 border border-border/60 text-foreground font-semibold">
              <Flame className="size-3.5 text-amber-500" />
              {dataset.lifetimeTotal.toLocaleString()} All-Time
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="size-3.5 text-muted-foreground" />
            Active since {earliestYear}
          </span>
        </div>

        {/* Horizontal Scrollable Calendar Grid */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-muted-foreground/20 [&_.react-activity-calendar__footer]:!hidden"
        >
          {loading || currentContributions.length === 0 ? (
            <div className="w-full h-[120px] flex items-center justify-center rounded-xl bg-muted/10 border border-border/50 animate-pulse">
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
