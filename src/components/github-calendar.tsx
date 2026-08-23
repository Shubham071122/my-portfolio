"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface Props {
  username: string;
}

export default function GitHubCalendarPanel({ username }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[155px] animate-pulse bg-muted/40 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl" />
    );
  }

  return (
    <div className="w-full overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900/50 dark:to-zinc-950/50 p-5 rounded-2xl blueprint-grid shadow-sm hover:shadow-md dark:hover:shadow-black/20 relative">
      {/* Subtle crosshairs in the corners (architectural/blueprint style) */}
      <div className="absolute top-3 left-3 size-3 flex items-center justify-center pointer-events-none opacity-25 dark:opacity-40 z-10">
        <div className="absolute w-px h-full bg-zinc-400 dark:bg-zinc-600" />
        <div className="absolute w-full h-px bg-zinc-400 dark:bg-zinc-600" />
      </div>
      <div className="absolute top-3 right-3 size-3 flex items-center justify-center pointer-events-none opacity-25 dark:opacity-40 z-10">
        <div className="absolute w-px h-full bg-zinc-400 dark:bg-zinc-600" />
        <div className="absolute w-full h-px bg-zinc-400 dark:bg-zinc-600" />
      </div>
      <div className="absolute bottom-3 left-3 size-3 flex items-center justify-center pointer-events-none opacity-25 dark:opacity-40 z-10">
        <div className="absolute w-px h-full bg-zinc-400 dark:bg-zinc-600" />
        <div className="absolute w-full h-px bg-zinc-400 dark:bg-zinc-600" />
      </div>
      <div className="absolute bottom-3 right-3 size-3 flex items-center justify-center pointer-events-none opacity-25 dark:opacity-40 z-10">
        <div className="absolute w-px h-full bg-zinc-400 dark:bg-zinc-600" />
        <div className="absolute w-full h-px bg-zinc-400 dark:bg-zinc-600" />
      </div>

      <div className="relative z-20 flex flex-col gap-4 w-full">
        <div className="w-full flex items-center justify-between">
          <h3 className="text-sm font-bold capitalize tracking-normal text-muted-foreground">GitHub Contributions</h3>
        </div>
        
        <div className="w-full overflow-x-auto py-2 flex justify-center scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
          <GitHubCalendar
            username={username}
            colorScheme={resolvedTheme as "light" | "dark"}
            blockSize={11}
            blockMargin={4}
            fontSize={11}
          />
        </div>
      </div>
    </div>
  );
}
