"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { login } from "../../../../actions/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Loader2, Eye, EyeOff } from "lucide-react";

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const router = useRouter();

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        try {
            await login(formData);
            toast.success("Login successful");
            router.push("/admin");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Invalid credentials");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto p-8 rounded-3xl border border-white/[0.08] bg-black/20 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-500" />

            <CardHeader className="space-y-2 relative z-10 px-0">
                <CardTitle className="text-3xl font-bold tracking-tight text-white/95">Admin Login</CardTitle>
                <CardDescription className="text-white/40 font-medium">
                    Please authentication to access the dashboard
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit} className="relative z-10">
                <CardContent className="space-y-5 px-0 mt-8">
                    <div className="space-y-2.5">
                        <Label htmlFor="email" className="text-sm font-medium text-white/70 ml-1">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className="bg-white/[0.03] border-white/[0.08] focus:border-primary/50 focus:bg-white/[0.05] transition-all duration-300 h-11 px-4 rounded-lg"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            error={errors.email}
                        />
                        {errors.email && <p className="text-xs text-destructive ml-1 mt-1">{errors.email}</p>}
                    </div>
                    <div className="space-y-2.5">
                        <Label htmlFor="password" title="password" className="text-sm font-medium text-white/70 ml-1">Password</Label>
                        <div className="relative group/input">
                            <Input
                                id="password"
                                title="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="bg-white/[0.03] border-white/[0.08] focus:border-primary/50 focus:bg-white/[0.05] transition-all duration-300 h-11 px-4 pr-11 rounded-lg"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                error={errors.password}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors duration-200"
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                        {errors.password && <p className="text-xs text-destructive ml-1 mt-1">{errors.password}</p>}
                    </div>
                </CardContent>
                <CardFooter className="px-0 pt-6 mt-4">
                    <Button
                        type="submit"
                        className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Securing Session...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <LogIn className="h-4 w-4" />
                                <span>Sign In</span>
                            </div>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
