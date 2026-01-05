"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGetAdminStats } from "@/hooks/queries/useGetAdminStats";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/ui/stat-card";
import { H1, BodyLarge } from "@/components/ui/typography";
import { Users, MapPin, Shield, BarChart, BadgeCheck } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const { data: statsData, isLoading: isStatsLoading } = useGetAdminStats();

    const stats = statsData?.data;

    useEffect(() => {
        if (!isLoading && (!user || user.role !== "admin")) {
            router.push("/");
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="container-wide px-4 py-8">
                    <div className="mb-8">
                        <Skeleton className="h-12 w-96 mb-2" />
                        <Skeleton className="h-6 w-64" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-32" />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[...Array(2)].map((_, i) => (
                            <Skeleton key={i} className="h-64" />
                        ))}
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (!user || user.role !== "admin") {
        return null;
    }

    return (
        <AdminLayout>
            <div className="container-wide px-4 section-padding-sm">
                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <div className="flex items-center gap-3 mb-2">
                        <Shield className="w-10 h-10 text-primary" />
                        <H1 className="text-gradient-primary">Admin Dashboard</H1>
                    </div>
                    <BodyLarge className="text-muted-foreground">
                        Manage users and travel plans
                    </BodyLarge>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up">
                    <StatCard
                        title="Verified Travelers"
                        value={isStatsLoading ? "--" : stats?.verifiedTravelers.toString() || "0"}
                        description="Users with verified status"
                        icon={BadgeCheck}
                        variant="info"
                    />
                    <StatCard
                        title="Travel Plans"
                        value={isStatsLoading ? "--" : stats?.totalTravelPlans.toString() || "0"}
                        description="Total travel plans"
                        icon={MapPin}
                        variant="success"
                    />
                    <StatCard
                        title="Reviews"
                        value={isStatsLoading ? "--" : stats?.totalReviews.toString() || "0"}
                        description="Total reviews"
                        icon={BarChart}
                        variant="warning"
                    />
                </div>

                {/* Management Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="elevation-sm hover:elevation-lg transition-all">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <Users className="w-8 h-8 text-blue-600" />
                                <div>
                                    <CardTitle className="text-2xl">User Management</CardTitle>
                                    <CardDescription>View and manage all registered users</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">
                                View user profiles, manage accounts, and monitor traveler activities.
                            </p>
                            <Link href="/admin/users">
                                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                                    <Users className="w-4 h-4 mr-2" />
                                    Manage Users
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <MapPin className="w-8 h-8 text-green-600" />
                                <div>
                                    <CardTitle className="text-2xl">Travel Plans Management</CardTitle>
                                    <CardDescription>View and manage all travel plans</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">
                                Monitor travel plans, manage content, and ensure quality standards.
                            </p>
                            <Link href="/admin/travel-plans">
                                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    Manage Travel Plans
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
