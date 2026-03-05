import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Mail, Shield, Calendar, MapPin } from "lucide-react";
import Link from "next/link";

export default function UserDetailPage({ params }: { params: { id: string } }) {
    // Mock fetching logic
    const user = {
        id: params.id,
        name: "Shubham",
        email: "shubham@example.com",
        role: "admin",
        status: "active",
        avatar: "/me.jpeg",
        joinedDate: "Mar 2024",
        location: "New Delhi, India"
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/admin/users">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h2 className="text-3xl font-bold tracking-tight">User Details</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-1">
                    <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                        <Avatar className="h-24 w-24 border-2">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h3 className="font-bold text-xl">{user.name}</h3>
                            <Badge variant="secondary" className="capitalize">{user.role}</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground">Email Address</span>
                                    <span className="text-sm font-medium">{user.email}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Shield className="h-4 w-4 text-muted-foreground" />
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground">Access Role</span>
                                    <span className="text-sm font-medium capitalize">{user.role}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground">Member Since</span>
                                    <span className="text-sm font-medium">{user.joinedDate}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground">Location</span>
                                    <span className="text-sm font-medium">{user.location}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
