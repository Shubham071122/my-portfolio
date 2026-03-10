import { DATA } from "@/data/resume";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SocialLinks({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center gap-3", className)}>
            {Object.entries(DATA.contact.social).map(([name, social]) => (
                <Link
                    key={name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center size-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black hover:scale-110 active:scale-95 shadow-sm"
                    aria-label={name}
                >
                    <social.icon className="size-4" />
                </Link>
            ))}
        </div>
    );
}
