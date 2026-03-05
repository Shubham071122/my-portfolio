import { StatsCard } from "@/components/admin/stats-card";
import {
    Briefcase,
    Users,
    Eye,
    Projector
} from "lucide-react";
import { DATA } from "@/data/resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BlurFade from "@/components/magicui/blur-fade";

export default function AdminDashboard() {
    const stats = [
        {
            title: "Work Experience",
            value: DATA.work.length,
            icon: <Briefcase className="h-5 w-5" />,
            trend: { value: 12, isUp: true },
            description: "Roles added to date"
        },
        {
            title: "Projects",
            value: DATA.projects.length,
            icon: <Projector className="h-5 w-5" />,
            trend: { value: 8, isUp: true },
            description: "Live projects"
        },
        {
            title: "Site Views",
            value: "1.2K",
            icon: <Eye className="h-5 w-5" />,
            trend: { value: 5, isUp: true },
            description: "Unique visitors monthly"
        },
        {
            title: "Subscribers",
            value: 48,
            icon: <Users className="h-5 w-5" />,
            trend: { value: 2, isUp: false },
            description: "Active email subscribers"
        }
    ];

    return (
        <div className="space-y-8 h-full">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
                    <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, idx) => (
                    <BlurFade key={stat.title} delay={0.05 * idx}>
                        <StatsCard {...stat} />
                    </BlurFade>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
                            <span className="text-muted-foreground">Chart placeholder for visual impact</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {DATA.work.slice(0, 3).map((work, idx) => (
                                <div key={idx} className="flex items-center">
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{work.company}</p>
                                        <p className="text-sm text-muted-foreground">{work.title}</p>
                                    </div>
                                    <div className="ml-auto text-xs font-medium text-muted-foreground">
                                        {work.start}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
