import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon?: React.ReactNode;
    trend?: {
        value: number;
        isUp: boolean;
    };
    className?: string;
}

export function StatsCard({
    title,
    value,
    description,
    icon,
    trend,
    className,
}: StatsCardProps) {
    return (
        <Card className={cn("overflow-hidden", className)}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {title}
                </CardTitle>
                <div className="h-8 w-8 text-muted-foreground bg-muted/50 rounded-md flex items-center justify-center">
                    {icon}
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="text-2xl font-bold">{value}</div>
                {(description || trend) && (
                    <div className="mt-1 flex items-center gap-2">
                        {trend && (
                            <span className={cn(
                                "flex items-center text-xs font-medium",
                                trend.isUp ? "text-green-500" : "text-red-500"
                            )}>
                                {trend.isUp ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                                {trend.value}%
                            </span>
                        )}
                        {description && (
                            <p className="text-xs text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
