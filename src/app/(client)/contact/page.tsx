"use client";

import { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { sendContactMessage } from "../../../../actions/contact";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = (formData: FormData) => {
        const newErrors: Record<string, string> = {};
        const fullName = formData.get("fullName") as string;
        const email = formData.get("email") as string;
        const subject = formData.get("subject") as string;
        const message = formData.get("message") as string;

        if (!fullName?.trim() || fullName.trim().length < 2) {
            newErrors.fullName = "Name must be at least 2 characters";
        }
        if (!email?.trim()) {
            newErrors.email = "Please enter your email";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!subject?.trim() || subject.trim().length < 2) {
            newErrors.subject = "Subject must be at least 2 characters";
        }
        if (!message?.trim() || message.trim().length < 5) {
            newErrors.message = "Message must be at least 5 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        if (!validate(formData)) return;
        
        setIsSubmitting(true);
        setErrors({});

        try {
            const data = {
                fullName: formData.get("fullName") as string,
                email: formData.get("email") as string,
                subject: formData.get("subject") as string,
                message: formData.get("message") as string,
            };

            await sendContactMessage(data);
            
            toast.success("Message sent successfully! I'll get back to you soon.");
            (event.target as HTMLFormElement).reset();
        } catch (error: any) {
            toast.error(error.message || "Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="flex flex-col min-h-screen py-8 sm:py-12 px-4 sm:px-6">
            <BlurFade delay={0.1}>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8 group text-sm sm:text-base"
                >
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                    Back to Portfolio
                </Link>
            </BlurFade>

            <div className="max-w-xl mx-auto w-full space-y-6 sm:space-y-8">
                <BlurFade delay={0.2}>
                    <div className="space-y-2 text-center sm:text-left">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Get in touch</h1>
                        <p className="text-muted-foreground text-base sm:text-lg">
                            Have a project in mind or just want to say hi? Feel free to reach out!
                        </p>
                    </div>
                </BlurFade>

                <BlurFade delay={0.3}>
                    <div className="p-0.5 sm:p-1 rounded-2xl border border-border bg-muted/30 backdrop-blur-md shadow-2xl">
                        <form onSubmit={handleSubmit} noValidate className="bg-background/50 rounded-[14px] p-4 sm:p-6 space-y-4 sm:space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName" className="text-xs sm:text-sm font-medium">Full Name</Label>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        placeholder="John Doe"
                                        error={errors.fullName}
                                        className="bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200/50 dark:border-white/10 h-10 sm:h-11 rounded-lg"
                                    />
                                    {errors.fullName && <p className="text-[10px] text-destructive font-medium px-1">{errors.fullName}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-xs sm:text-sm font-medium">Email Address</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        error={errors.email}
                                        className="bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200/50 dark:border-white/10 h-10 sm:h-11 rounded-lg"
                                    />
                                    {errors.email && <p className="text-[10px] text-destructive font-medium px-1">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject" className="text-xs sm:text-sm font-medium">Subject</Label>
                                <Input
                                    id="subject"
                                    name="subject"
                                    placeholder="How can I help you?"
                                    error={errors.subject}
                                    className="bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200/50 dark:border-white/10 h-10 sm:h-11 rounded-lg"
                                />
                                {errors.subject && <p className="text-[10px] text-destructive font-medium px-1">{errors.subject}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-xs sm:text-sm font-medium">Message</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Your message here..."
                                    error={errors.message}
                                    className="min-h-[120px] sm:min-h-[150px] bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200/50 dark:border-white/10 resize-none text-sm sm:text-base p-3 sm:p-4 rounded-lg"
                                />
                                {errors.message && <p className="text-[10px] text-destructive font-medium px-1">{errors.message}</p>}
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-11 sm:h-12 text-sm sm:text-base font-bold gap-2 transition-all active:scale-[0.98] bg-foreground text-background hover:brightness-110 shadow-xl rounded-lg"
                            >
                                {isSubmitting ? (
                                    "Sending..."
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="size-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </BlurFade>

                <BlurFade delay={0.4}>
                    <div className="flex flex-col items-center gap-3 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-xs font-semibold">
                            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
                            </span>
                            Typically responds within 24 hours
                        </div>
                        <p className="text-[10px] sm:text-xs text-muted-foreground/60 max-w-[280px] leading-relaxed">
                            Your information is transmitted securely and will be delivered directly to my private inbox.
                        </p>
                    </div>
                </BlurFade>
            </div>
        </main>
    );
}
