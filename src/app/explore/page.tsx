"use client";

import { useGetAllUsers } from "@/hooks/queries/useGetAllUsers";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { H1, BodyLarge } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserCard } from "@/components/ui/user-card";

export default function ExplorePage() {
    const router = useRouter();
    const { data: users, isLoading, error } = useGetAllUsers();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900">
                <div className="container-wide px-4 py-8">
                    <div className="mb-8 text-center">
                        <Skeleton className="h-12 w-64 mx-auto mb-4" />
                        <Skeleton className="h-6 w-96 mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-96" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900 flex items-center justify-center">
                <EmptyState
                    icon={Users}
                    title="Failed to load travelers"
                    description="We couldn't fetch the travelers list. Please try again later."
                    action={{
                        label: "Retry",
                        onClick: () => window.location.reload()
                    }}
                />
            </div>
        );
    }

    const travelers = users || [];

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900">
            <div className="container-wide px-4 section-padding-sm">
                {/* Header */}
                <div className="mb-12 text-center animate-fade-in">
                    <H1 className="text-gradient-primary mb-4">
                        Explore Travelers
                    </H1>
                    <BodyLarge className="text-muted-foreground max-w-2xl mx-auto mb-6">
                        Connect with fellow travelers from around the world
                    </BodyLarge>
                    <Button
                        onClick={() => router.push("/find-buddy")}
                        size="lg"
                        className="elevation-md hover:elevation-lg transition-all"
                    >
                        <Search className="w-5 h-5 mr-2" />
                        Find My Buddy
                    </Button>
                </div>

                {/* Travelers Grid */}
                {travelers.length === 0 ? (
                    <EmptyState
                        icon={Users}
                        title="No travelers found"
                        description="Be the first to join our community! Create your profile and start connecting with fellow travelers."
                        action={{
                            label: "Create Your Profile",
                            onClick: () => router.push("/profile")
                        }}
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
                        {travelers.map((traveler) => (
                            <UserCard
                                key={traveler._id}
                                user={{
                                    id: traveler._id,
                                    name: traveler.fullName,
                                    email: traveler.email,
                                    profilePicture: traveler.profileImage,
                                    bio: traveler.bio,
                                    location: traveler.visitedCountries?.[0],
                                    rating: traveler.averageRating,
                                    role: traveler.role
                                }}
                                onViewProfile={(id) => router.push(`/profile/${id}`)}
                                variant="detailed"
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

