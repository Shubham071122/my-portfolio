"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    isLoading?: boolean;
    confirmText?: string;
    cancelText?: string;
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    isLoading = false,
    confirmText = "Delete",
    cancelText = "Cancel",
}: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-all duration-300">
            <div className="animate-in fade-in zoom-in duration-200 w-full max-w-md px-4">
                <Card className="border bg-card/60 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden relative">
                    {/* Subtle destructive glow */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-destructive/5 dark:bg-destructive/10 rounded-full blur-[100px] pointer-events-none" />
                    
                    <CardHeader className="relative z-10 pt-8 px-6">
                        <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                            <AlertTriangle className="h-6 w-6 text-destructive" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-center text-foreground tracking-tight">
                            {title}
                        </CardTitle>
                        <CardDescription className="text-center text-muted-foreground text-base mt-2 px-4 leading-relaxed font-medium">
                            {description}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="relative z-10 pt-4" />

                    <CardFooter className="relative z-10 flex flex-col sm:flex-row gap-3 px-8 pb-8 pt-2">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                            className="w-full sm:flex-1 h-11 rounded-lg transition-all duration-300 shadow-sm"
                        >
                            {cancelText}
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="w-full sm:flex-1 h-11 rounded-lg shadow-lg shadow-destructive/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-semibold"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                confirmText
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
