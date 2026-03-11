import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import Image from "next/image";
import {
    Code2,
    MapPin,
    Target,
    Cpu,
    Globe,
    Zap,
    Coffee,
    Heart,
    Terminal,
    Layers,
    Sparkles,
    ArrowUpRight,
    User
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About | Shubham",
    description: `Learn more about ${DATA.name}, a ${DATA.description}. Discover my journey, values, and what drives me as a developer.`,
};

const BLUR_FADE_DELAY = 0.04;

export default function AboutPage() {
    return (
        <main className="flex flex-col min-h-screen py-8 sm:py-16 space-y-10 sm:space-y-12">
            {/* Header Section */}
            <section className="space-y-4">
                <BlurFade delay={BLUR_FADE_DELAY}>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-6xl text-center sm:text-left">
                        Behind the <span className="text-blue-500 italic font-serif">Code</span>
                    </h1>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 2}>
                    <p className="text-muted-foreground text-base sm:text-xl text-center sm:text-left max-w-2xl leading-relaxed">
                        A developer&apos;s journey is more than just syntax. It&apos;s about curiosity, building systems, and solving real-world puzzles.
                    </p>
                </BlurFade>
            </section>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

                {/* Intro Block - Large */}
                <BlurFade delay={BLUR_FADE_DELAY * 3} className="md:col-span-4 h-full">
                    <div className="h-full p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-border bg-muted/20 backdrop-blur-md flex flex-col justify-between group hover:border-blue-500/30 transition-all duration-500">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-blue-500">
                                <User className="size-5" />
                                <span className="text-xs font-bold uppercase tracking-widest">About Me</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold">I build software that makes sense.</h2>
                            <p className="text-muted-foreground leading-relaxed text-base sm:text-base italic">
                                &quot;{DATA.summary}&quot;
                            </p>
                        </div>
                        <div className="mt-8 flex items-center gap-4">
                            <div className="size-1 w-12 bg-blue-500 rounded-full" />
                            <span className="text-xs sm:text-sm font-medium text-muted-foreground">Frontend • Backend • DevOps</span>
                        </div>
                    </div>
                </BlurFade>

                {/* Profile Stats - Narrow */}
                <BlurFade delay={BLUR_FADE_DELAY * 4} className="md:col-span-2 h-full">
                    <div className="h-full p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-border bg-muted/20 backdrop-blur-md flex flex-col items-center justify-center text-center space-y-6 group hover:border-blue-500/30 transition-all duration-500">
                        <div className="relative size-28 sm:size-32 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-4 ring-background group-hover:scale-110 transition-transform duration-500">
                            <Image src={DATA.avatarUrl} alt={DATA.name} fill className="object-cover" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xl font-bold">{DATA.name}</p>
                            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
                                <MapPin className="size-3" />
                                <span>{DATA.location}</span>
                            </div>
                        </div>
                    </div>
                </BlurFade>

                {/* Values Section - Full Width but horizontally structured */}
                <BlurFade delay={BLUR_FADE_DELAY * 5} className="md:col-span-6">
                    <div className="p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-border bg-gradient-to-br from-muted/30 to-background/20 backdrop-blur-xl">
                        <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center sm:text-left">Core Values</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <ValueItem
                                icon={<Terminal className="size-5 sm:size-6" />}
                                title="Keep it Simple"
                                desc="I avoid over-engineering. The simplest solution is usually the most robust."
                            />
                            <ValueItem
                                icon={<Cpu className="size-5 sm:size-6" />}
                                title="Scale Ready"
                                desc="I build with growth in mind. Performance is not a feature; it's a requirement."
                            />
                            <ValueItem
                                icon={<Layers className="size-5 sm:size-6" />}
                                title="Quality Code"
                                desc="Clean, maintainable, and well-tested. Because code is read more than it's written."
                            />
                        </div>
                    </div>
                </BlurFade>

                {/* Philosophy Block */}
                <BlurFade delay={BLUR_FADE_DELAY * 6} className="md:col-span-3 h-full">
                    <div className="h-full p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-border bg-muted/10 group hover:bg-muted/20 transition-all duration-500">
                        <div className="flex items-center gap-2 text-green-500 mb-4">
                            <Coffee className="size-5" />
                            <span className="text-xs font-bold uppercase tracking-widest">Philosophy</span>
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            I believe the best way to grow as a developer is by building things,
                            breaking them, fixing them, and improving them step by step.
                        </p>
                    </div>
                </BlurFade>

                {/* Interests/Hobbies */}
                <BlurFade delay={BLUR_FADE_DELAY * 7} className="md:col-span-3 h-full">
                    <div className="h-full p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-border bg-muted/10 group hover:bg-muted/20 transition-all duration-500">
                        <div className="flex items-center gap-2 text-pink-500 mb-4">
                            <Heart className="size-5" />
                            <span className="text-xs font-bold uppercase tracking-widest">Beyond the IDE</span>
                        </div>
                        <ul className="space-y-3 sm:space-y-4 text-muted-foreground">
                            <li className="flex items-center gap-3 text-sm sm:text-base">
                                <div className="size-1.5 sm:size-2 rounded-full bg-pink-500" />
                                Watching Cricket Matches
                            </li>
                            <li className="flex items-center gap-3 text-sm sm:text-base">
                                <div className="size-1.5 sm:size-2 rounded-full bg-pink-500" />
                                Financial Markets & Trading
                            </li>
                            <li className="flex items-center gap-3 text-sm sm:text-base">
                                <div className="size-1.5 sm:size-2 rounded-full bg-pink-500" />
                                Bingewatching Netflix Series
                            </li>
                        </ul>
                    </div>
                </BlurFade>
            </div>

            {/* Final CTA */}
            <BlurFade delay={BLUR_FADE_DELAY * 8}>
                <div className="p-10 sm:p-16 rounded-[2.5rem] sm:rounded-[3.5rem] bg-gradient-to-br from-zinc-900 via-blue-900 to-zinc-900 text-white text-center space-y-6 sm:space-y-8 relative overflow-hidden group border border-white/10">
                    {/* Animated Decorative Elements */}
                    <div className="absolute -top-24 -right-24 size-64 bg-blue-500/20 blur-[100px] group-hover:bg-blue-500/30 transition-colors duration-700" />
                    <div className="absolute -bottom-24 -left-24 size-64 bg-indigo-500/20 blur-[100px] group-hover:bg-indigo-500/30 transition-colors duration-700" />

                    <div className="relative z-10 space-y-4">
                        <h3 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                            Ready to build the <br />
                            <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent italic font-serif">next big thing?</span>
                        </h3>
                        <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                            I&apos;m currently looking for new challenges and collaborations. Whether you have a specific idea or just want to explore possibilities, let&apos;s create something meaningful together.
                        </p>
                    </div>

                    <div className="relative z-10 flex justify-center pt-4 sm:pt-6">
                        <Link
                            href="/contact"
                            className="group/btn relative px-8 py-4 bg-white text-zinc-900 rounded-2xl font-bold hover:scale-105 transition-all shadow-2xl flex items-center gap-3 overflow-hidden"
                        >
                            <span className="relative z-10">Get in Touch</span>
                            <div className="relative z-10 size-5 rounded-full bg-blue-600 text-white flex items-center justify-center transition-transform group-hover/btn:rotate-45">
                                <ArrowUpRight className="size-3" />
                            </div>
                            {/* Button Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        </Link>
                    </div>

                    {/* Subtle Grid Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                </div>
            </BlurFade>
        </main>
    );
}

function ValueItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="space-y-2 sm:space-y-3 group/item">
            <div className="size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20 group-hover/item:bg-blue-500 group-hover/item:text-white transition-all duration-500">
                {icon}
            </div>
            <h4 className="font-bold text-base sm:text-lg">{title}</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic border-l-2 border-muted pl-3 sm:pl-4">
                {desc}
            </p>
        </div>
    );
}
