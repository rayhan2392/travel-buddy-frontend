"use client";

import { StatCard } from "@/components/ui/stat-card";
import { H2, BodyLarge } from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { SubscriptionBanner } from "@/components/modules/subscription/SubscriptionBanner";
import { useGetMyTravelPlans } from "@/hooks/queries/useGetMyTravelPlans";
import { useGetJoinedTravelPlans } from "@/hooks/queries/useGetJoinedTravelPlans";
import { useAuth } from "@/context/AuthContext";
import { MapPin, Users, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    const { data: myPlans, isLoading: loadingMyPlans } = useGetMyTravelPlans();
    const { data: joinedPlans, isLoading: loadingJoined } = useGetJoinedTravelPlans();
    const { user } = useAuth();

    const myPlansCount = myPlans?.length || 0;
    const joinedPlansCount = joinedPlans?.length || 0;
    const totalTrips = myPlansCount + joinedPlansCount;

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50/50 to-white dark:from-gray-950 dark:to-gray-900">
            {/* Subscription Banner for non-verified users */}
            {user && !user.isVerified && user.role !== "admin" && <SubscriptionBanner />}

            <div className="container-wide px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <H2 className="mb-2">Dashboard</H2>
                    <BodyLarge className="text-muted-foreground">
                        Welcome back! Here&apos;s your travel overview
                    </BodyLarge>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {loadingMyPlans || loadingJoined ? (
                        <>
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="h-32" />
                            ))}
                        </>
                    ) : (
                        <>
                            <StatCard
                                title="My Travel Plans"
                                value={myPlansCount}
                                description="Plans you created"
                                icon={MapPin}
                                variant="default"
                            />
                            <StatCard
                                title="Joined Trips"
                                value={joinedPlansCount}
                                description="Trips you're participating in"
                                icon={Users}
                                variant="info"
                            />
                            <StatCard
                                title="Total Trips"
                                value={totalTrips}
                                description="All your adventures"
                                icon={Calendar}
                                variant="success"
                            />
                            <StatCard
                                title="Active Status"
                                value="Online"
                                description="You're discoverable"
                                icon={TrendingUp}
                                variant="warning"
                            />
                        </>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-lg border bg-card elevation-sm hover:elevation-md transition-shadow">
                        <h3 className="text-h4 mb-2">Create New Trip</h3>
                        <p className="text-muted-foreground mb-4">
                            Start planning your next adventure and find travel buddies
                        </p>
                        <Link href="/travel-plans/add">
                            <Button className="w-full sm:w-auto">Create Travel Plan</Button>
                        </Link>
                    </div>
                    <div className="p-6 rounded-lg border bg-card elevation-sm hover:elevation-md transition-shadow">
                        <h3 className="text-h4 mb-2">Find Travel Buddies</h3>
                        <p className="text-muted-foreground mb-4">
                            Discover compatible travelers for your destinations
                        </p>
                        <Link href="/find-buddy">
                            <Button variant="outline" className="w-full sm:w-auto">Browse Travelers</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
