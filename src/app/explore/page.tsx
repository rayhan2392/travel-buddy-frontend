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
                    {/* Animated Header Skeleton */}
                    <div className="mb-12 text-center animate-fade-in">
                        <Skeleton className="h-14 w-80 mx-auto mb-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
                        <Skeleton className="h-6 w-[500px] max-w-full mx-auto mb-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
                        <Skeleton className="h-11 w-48 mx-auto rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
                    </div>

                    {/* Loading Indicator */}
                    <div className="flex flex-col items-center justify-center gap-4 mb-8">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 animate-spin-slow flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-b from-violet-50 to-white"></div>
                            </div>
                            <Users className="w-10 h-10 text-violet-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-semibold text-gray-900 mb-1">Loading travelers...</p>
                            <p className="text-sm text-gray-600">Finding amazing travel companions for you</p>
                        </div>
                    </div>

                    {/* Skeleton Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden animate-pulse">
                                {/* Gradient top */}
                                <div className="h-2 bg-gradient-to-r from-blue-300 via-purple-300 to-violet-300" />
                                <div className="p-6">
                                    {/* Avatar and Name */}
                                    <div className="flex flex-col items-center text-center mb-6">
                                        <Skeleton className="w-24 h-24 rounded-full mb-4" />
                                        <Skeleton className="h-6 w-40 mb-2" />
                                        <Skeleton className="h-5 w-20" />
                                    </div>
                                    {/* Info boxes */}
                                    <div className="space-y-3 mb-6">
                                        <Skeleton className="h-12 w-full rounded-lg" />
                                        <Skeleton className="h-12 w-full rounded-lg" />
                                        <Skeleton className="h-12 w-full rounded-lg" />
                                    </div>
                                    {/* Buttons */}
                                    <div className="flex gap-3">
                                        <Skeleton className="h-10 flex-1 rounded-md" />
                                        <Skeleton className="h-10 flex-1 rounded-md" />
                                    </div>
                                </div>
                            </div>
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
                                    role: traveler.role,
                                    isVerified: traveler.isVerified
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

