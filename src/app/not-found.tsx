import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import { ArrowLeft, Home } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none z-0 dark:bg-blue-500/5 animate-pulse" />
      <div className="absolute -top-24 -left-24 size-96 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none z-0" />
      
      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 py-12 text-center pointer-events-auto">
        <BlurFade delay={0.1}>
          <div className="relative inline-block mb-8">
            <h1 className="text-9xl sm:text-[12rem] font-black tracking-tighter text-zinc-900/5 dark:text-white/5 select-none leading-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center pt-8 sm:pt-12">
              <span className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-200 drop-shadow-sm">
                Lost in Code?
              </span>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.2}>
          <div className="space-y-4 max-w-md mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground/90">
              The page you are looking for has vanished into thin air.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed italic border-l-2 border-blue-500/30 pl-4 py-1 mx-auto max-w-sm font-serif">
              &quot;Not all who wander are lost, but they might be looking for a page that doesn&apos;t exist.&quot;
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
            <Link
              href="/"
              className={cn(
                "group relative inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3.5 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 rounded-xl sm:rounded-2xl font-semibold sm:font-bold transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-blue-500/20 overflow-hidden"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <ArrowLeft className="size-4 relative z-10 transition-transform group-hover:-translate-x-1" />
              <span className="relative z-10">Back to Home</span>
            </Link>
          </div>
        </BlurFade>
      </div>
    </main>
  );
}
