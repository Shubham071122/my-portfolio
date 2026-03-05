'use client'
import { AdminTable } from "@/components/admin/admin-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "editor" | "user";
    status: "active" | "inactive";
    avatar?: string;
}

const mockUsers: User[] = [
    { id: "1", name: "Shubham", email: "shubham@example.com", role: "admin", status: "active", avatar: "/me.jpeg" },
    { id: "2", name: "Demo User", email: "demo@example.com", role: "editor", status: "active" },
    { id: "3", name: "Guest", email: "guest@example.com", role: "user", status: "inactive" },
];

export default function UserManagementPage() {
    const columns = [
        {
            key: "name",
            header: "User",
            render: (item: User) => (
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border">
                        <AvatarImage src={item.avatar} alt={item.name} />
                        <AvatarFallback>{item.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <Link
                            href={`/admin/users/${item.id}`}
                            className="font-medium hover:text-primary transition-colors"
                        >
                            {item.name}
                        </Link>
                        <span className="text-[10px] text-muted-foreground">{item.email}</span>
                    </div>
                </div>
            ),
        },
        {
            key: "role",
            header: "Role",
            render: (item: User) => (
                <Badge variant="outline" className="capitalize">
                    {item.role}
                </Badge>
            ),
        },
        {
            key: "status",
            header: "Status",
            render: (item: User) => (
                <Badge
                    className={item.status === "active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}
                    variant="secondary"
                >
                    {item.status}
                </Badge>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
                    <p className="text-muted-foreground">Manage user accounts and their roles.</p>
                </div>
            </div>

            <AdminTable
                title="Users"
                data={mockUsers}
                columns={columns}
            />
        </div>
    );
}
