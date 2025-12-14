"use client";

import { useGetJoinedTravelPlans } from "@/hooks/queries/useGetJoinedTravelPlans";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { H1, BodyLarge } from "@/components/ui/typography";
import { useAuth } from "@/context/AuthContext";
import { MapPin, Calendar, DollarSign, Users, Plane, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UpcomingTripsPage() {
    const router = useRouter();
    const { user, isLoading: authLoading } = useAuth();
    const { data: joinedPlans, isLoading: plansLoading } = useGetJoinedTravelPlans();

    const isLoading = authLoading || plansLoading;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900">
                <div className="container-wide px-4 py-8">
                    <Skeleton className="h-10 w-32 mb-6" />
                    <div className="mb-8">
                        <Skeleton className="h-12 w-96 mb-2" />
                        <Skeleton className="h-6 w-64" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-96" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900 flex items-center justify-center">
                <EmptyState
                    icon={Plane}
                    title="Authentication Required"
                    description="Please login to view your upcoming trips."
                    action={{
                        label: "Go to Login",
                        onClick: () => router.push("/login")
                    }}
                />
            </div>
        );
    }

    // Filter for upcoming trips only (trips that haven't ended yet)
    const upcomingTrips = joinedPlans?.filter((plan) => {
        const endDate = new Date(plan.endDate);
        return endDate >= new Date();
    }) || [];

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900">
            <div className="container-wide px-4 section-padding-sm">
                {/* Back Button */}
                <Button
                    onClick={() => router.push("/explore")}
                    variant="ghost"
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Explore
                </Button>

                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <div className="flex items-center gap-3 mb-2">
                        <Plane className="w-10 h-10 text-primary" />
                        <H1 className="text-gradient-primary">Upcoming Trips</H1>
                    </div>
                    <BodyLarge className="text-muted-foreground">
                        Travel plans you have joined and are looking forward to
                    </BodyLarge>
                </div>

                {/* Trips Content */}
                {upcomingTrips && upcomingTrips.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
                        {upcomingTrips.map((plan) => {
                            const daysUntilTrip = Math.ceil(
                                (new Date(plan.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                            );
                            const isStartingSoon = daysUntilTrip <= 7 && daysUntilTrip >= 0;

                            return (
                                <Card key={plan._id} className="overflow-hidden elevation-sm hover:elevation-lg transition-all">
                                    <div className="h-2 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500" />
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-xl mb-2 flex items-center gap-2">
                                                    <MapPin className="w-5 h-5 text-violet-600" />
                                                    {plan.destination.city}, {plan.destination.country}
                                                </CardTitle>
                                                {isStartingSoon && (
                                                    <Badge className="bg-orange-500 text-white mb-2">
                                                        Starting in {daysUntilTrip} {daysUntilTrip === 1 ? 'day' : 'days'}!
                                                    </Badge>
                                                )}
                                                <CardDescription className="line-clamp-2">
                                                    {plan.description}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {/* Host Info */}
                                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={plan.host.profileImage} />
                                                <AvatarFallback className="bg-primary text-primary-foreground">
                                                    {plan.host.fullName.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium">Hosted by {plan.host.fullName}</p>
                                                <p className="text-xs text-muted-foreground">{plan.host.email}</p>
                                            </div>
                                        </div>

                                        {/* Trip Details */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Calendar className="w-4 h-4 text-violet-600" />
                                                <div>
                                                    <p className="font-medium">Dates</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <DollarSign className="w-4 h-4 text-green-600" />
                                                <div>
                                                    <p className="font-medium">Budget</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        ${plan.budgetRange.min} - ${plan.budgetRange.max}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Categories and Participants */}
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <Badge variant="secondary">{plan.travelType}</Badge>
                                                {plan.categories.slice(0, 2).map((category, index) => (
                                                    <Badge key={index} variant="outline">{category}</Badge>
                                                ))}
                                                {plan.categories.length > 2 && (
                                                    <Badge variant="outline">+{plan.categories.length - 2} more</Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Users className="w-4 h-4" />
                                                <span>{plan.participants.length} {plan.participants.length === 1 ? 'participant' : 'participants'}</span>
                                            </div>
                                        </div>

                                        {/* View Details Button */}
                                        <Link href={`/travel-plans/${plan._id}`}>
                                            <Button className="w-full" variant="outline">
                                                View Details
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle>Your Upcoming Trips</CardTitle>
                            <CardDescription>Travel plans you have joined</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-12">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-20 h-20 rounded-full bg-violet-100 dark:bg-violet-950 flex items-center justify-center">
                                        <Plane className="w-10 h-10 text-violet-600 dark:text-violet-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">No upcoming trips</h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Explore travel plans and join an adventure!
                                        </p>
                                        <Button
                                            onClick={() => router.push("/explore")}
                                            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
                                        >
                                            <MapPin className="w-4 h-4 mr-2" />
                                            Explore Travel Plans
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
