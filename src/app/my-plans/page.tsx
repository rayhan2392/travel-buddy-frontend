"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { H1, BodyLarge } from "@/components/ui/typography";
import { useAuth } from "@/context/AuthContext";
import { useGetMyTravelPlans } from "@/hooks/queries/useGetMyTravelPlans";
import { Plus, Plane, MapPin, Calendar, DollarSign, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MyPlansPage() {
    const { user, isLoading: authLoading } = useAuth();
    const { data: myPlans, isLoading: plansLoading } = useGetMyTravelPlans();
    const router = useRouter();

    const isLoading = authLoading || plansLoading;

    if (isLoading) {
        return (
            <div className="container-wide px-4 py-8">
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
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <EmptyState
                    icon={Plane}
                    title="Authentication Required"
                    description="Please login to view and manage your travel plans."
                    action={{
                        label: "Go to Login",
                        onClick: () => router.push("/login")
                    }}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900">
            <div className="container-wide px-4 section-padding-sm">
                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <Plane className="w-10 h-10 text-primary" />
                                <H1 className="text-gradient-primary">My Travel Plans</H1>
                            </div>
                            <BodyLarge className="text-muted-foreground">
                                Manage and organize your travel adventures
                            </BodyLarge>
                        </div>
                        <Button
                            onClick={() => router.push("/travel-plans/add")}
                            size="lg"
                            className="elevation-md hover:elevation-lg transition-all"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Add Plan
                        </Button>
                    </div>
                </div>

                {/* Plans Content */}
                {myPlans && myPlans.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
                        {myPlans.map((plan) => (
                            <Card key={plan._id} className="overflow-hidden elevation-sm hover:elevation-lg transition-all">
                                <div className="h-2 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500" />
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="text-xl mb-2 flex items-center gap-2">
                                                <MapPin className="w-5 h-5 text-violet-600" />
                                                {plan.destination.city}, {plan.destination.country}
                                            </CardTitle>
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
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={Plane}
                        title="No travel plans yet"
                        description="Create your first travel plan to connect with other travelers"
                        action={{
                            label: "Create Your First Plan",
                            onClick: () => router.push("/travel-plans/add")
                        }}
                    />
                )}
            </div>
        </div>
    );
}
