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
                        <Shield className="w-10 h-10 text-violet-600" />
                        <H1 className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">Admin Dashboard</H1>
                    </div>
                    <BodyLarge className="text-gray-600">
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

                {/* Stats Visualization */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card className="border-2 border-violet-100 shadow-lg hover:shadow-xl transition-all duration-300 card-hover" role="region" aria-label="User growth statistics">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold text-gray-800">User Growth</CardTitle>
                            <CardDescription>Total users overview</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-600">Total Users</span>
                                        <span className="text-lg font-bold text-violet-600">{stats?.totalUsers || 0}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-violet-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                                            style={{ width: '100%' }}
                                        ></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-600">Verified Users</span>
                                        <span className="text-lg font-bold text-blue-600">{stats?.verifiedTravelers || 0}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-violet-500 h-3 rounded-full transition-all duration-500"
                                            style={{
                                                width: stats?.totalUsers
                                                    ? `${((stats.verifiedTravelers / stats.totalUsers) * 100)}%`
                                                    : '0%'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 card-hover" role="region" aria-label="Platform activity statistics">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold text-gray-800">Platform Activity</CardTitle>
                            <CardDescription>Plans and engagement metrics</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-600">Travel Plans</span>
                                        <span className="text-lg font-bold text-blue-600">{stats?.totalTravelPlans || 0}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                                            style={{ width: '85%' }}
                                        ></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-600">Total Reviews</span>
                                        <span className="text-lg font-bold text-pink-600">{stats?.totalReviews || 0}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-pink-500 to-violet-500 h-3 rounded-full transition-all duration-500"
                                            style={{ width: '70%' }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Management Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-2 border-violet-100 shadow-lg hover:shadow-xl transition-all duration-300 card-hover" role="region" aria-label="User management section">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-violet-100 rounded-lg">
                                    <Users className="w-8 h-8 text-violet-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-semibold text-gray-800">User Management</CardTitle>
                                    <CardDescription className="text-gray-600">View and manage all registered users</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-gray-600">
                                View user profiles, manage accounts, and monitor traveler activities.
                            </p>
                            <Link href="/admin/users">
                                <Button className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                                    <Users className="w-4 h-4 mr-2" />
                                    Manage Users
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 card-hover" role="region" aria-label="Travel plans management section">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <MapPin className="w-8 h-8 text-blue-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-semibold text-gray-800">Travel Plans Management</CardTitle>
                                    <CardDescription className="text-gray-600">View and manage all travel plans</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-gray-600">
                                Monitor travel plans, manage content, and ensure quality standards.
                            </p>
                            <Link href="/admin/travel-plans">
                                <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300">
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
