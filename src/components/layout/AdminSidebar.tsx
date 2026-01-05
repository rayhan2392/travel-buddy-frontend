"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    LayoutDashboard,
    Users,
    MapPin,
    LogOut,
    Shield,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const menuItems = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: "/admin/dashboard",
        },
        {
            label: "Users",
            icon: Users,
            href: "/admin/users",
        },
        {
            label: "Travel Plans",
            icon: MapPin,
            href: "/admin/travel-plans",
        },
    ];

    const isActive = (href: string) => pathname === href;

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-white">
            {/* Header */}
            <div className="flex h-16 items-center gap-2 border-b px-6">
                <Shield className="h-6 w-6 text-blue-600" />
                <div>
                    <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                    <p className="text-xs text-gray-600">Management Console</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                        <Button
                            key={item.href}
                            onClick={() => router.push(item.href)}
                            variant="ghost"
                            className={cn(
                                "w-full justify-start gap-3 text-gray-700 hover:bg-gray-100",
                                active &&
                                "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            {item.label}
                        </Button>
                    );
                })}
            </nav>

            <Separator className="bg-gray-200" />

            {/* User Profile Section */}
            <div className="p-4">
                <div className="flex items-center gap-3 rounded-lg bg-gray-100 p-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.profileImage} />
                        <AvatarFallback className="bg-blue-600 text-white">
                            {user?.fullName
                                ?.split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .toUpperCase() || "A"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {user?.fullName}
                        </p>
                        <p className="text-xs text-gray-600 truncate">
                            Administrator
                        </p>
                    </div>
                </div>

                <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="mt-2 w-full justify-start gap-2 text-gray-700 hover:bg-gray-100"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
