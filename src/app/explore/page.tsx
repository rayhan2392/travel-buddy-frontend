"use client";

import { useGetAllUsers } from "@/hooks/queries/useGetAllUsers";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { H1, BodyLarge } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Users, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserCard } from "@/components/ui/user-card";
import { useState, useMemo } from "react";

export default function ExplorePage() {
    const router = useRouter();
    const { data: users, isLoading, error } = useGetAllUsers();
    const [searchQuery, setSearchQuery] = useState("");
    const [verifiedFilter, setVerifiedFilter] = useState<string>("all");
    const [locationFilter, setLocationFilter] = useState<string>("all");

    const travelers = useMemo(() => users || [], [users]);

    // Get unique locations for filter
    const uniqueLocations = useMemo(() => {
        const locations = new Set<string>();
        travelers.forEach(traveler => {
            if (traveler.currentLocation) {
                locations.add(traveler.currentLocation);
            }
        });
        return Array.from(locations).sort();
    }, [travelers]);

    // Filter travelers based on search and filters
    const filteredTravelers = useMemo(() => {
        return travelers.filter(traveler => {
            // Search filter
            const matchesSearch = searchQuery === "" ||
                traveler.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                traveler.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                traveler.currentLocation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                traveler.bio?.toLowerCase().includes(searchQuery.toLowerCase());

            // Verified filter
            const matchesVerified = verifiedFilter === "all" ||
                (verifiedFilter === "verified" && traveler.isVerified) ||
                (verifiedFilter === "unverified" && !traveler.isVerified);

            // Location filter
            const matchesLocation = locationFilter === "all" || traveler.currentLocation === locationFilter;

            return matchesSearch && matchesVerified && matchesLocation;
        });
    }, [travelers, searchQuery, verifiedFilter, locationFilter]);

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
            <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white flex items-center justify-center">
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

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
            <div className="container-wide px-4 section-padding-sm">
                {/* Header */}
                <div className="mb-8 text-center animate-fade-in">
                    <H1 className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-4">
                        Explore Travelers
                    </H1>
                    <BodyLarge className="text-gray-600 max-w-2xl mx-auto mb-6">
                        Connect with fellow travelers from around the world
                    </BodyLarge>
                    <Button
                        onClick={() => router.push("/find-buddy")}
                        size="lg"
                        className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                    >
                        <Search className="w-5 h-5 mr-2" />
                        Find My Buddy
                    </Button>
                </div>

                {/* Filters Section */}
                <div className="mb-8 space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="w-5 h-5 text-violet-600" />
                        <h2 className="text-lg font-semibold text-gray-800">Filter Travelers</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" aria-hidden="true" />
                            <Input
                                type="text"
                                placeholder="Search by name, email, or location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 border-2 border-gray-200 focus:border-violet-400"
                                aria-label="Search travelers by name, email, or location"
                            />
                        </div>

                        {/* Verified Filter */}
                        <Select value={verifiedFilter} onValueChange={setVerifiedFilter}>
                            <SelectTrigger className="border-2 border-gray-200 focus:border-violet-400" aria-label="Filter by verification status">
                                <SelectValue placeholder="Verification Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Users</SelectItem>
                                <SelectItem value="verified">Verified Only</SelectItem>
                                <SelectItem value="unverified">Unverified Only</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Location Filter */}
                        <Select value={locationFilter} onValueChange={setLocationFilter}>
                            <SelectTrigger className="border-2 border-gray-200 focus:border-violet-400" aria-label="Filter by location">
                                <SelectValue placeholder="Filter by Location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Locations</SelectItem>
                                {uniqueLocations.map(location => (
                                    <SelectItem key={location} value={location}>{location}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Results count */}
                    <div className="text-sm text-gray-600 animate-fade-in" role="status" aria-live="polite">
                        Showing {filteredTravelers.length} of {travelers.length} travelers
                    </div>
                </div>

                {/* Travelers Grid */}
                {filteredTravelers.length === 0 ? (
                    <EmptyState
                        icon={Users}
                        title="No travelers found"
                        description={searchQuery || verifiedFilter !== "all" || locationFilter !== "all"
                            ? "No travelers match your search criteria. Try adjusting your filters."
                            : "Be the first to join our community! Create your profile and start connecting with fellow travelers."}
                        action={{
                            label: searchQuery || verifiedFilter !== "all" || locationFilter !== "all" ? "Clear Filters" : "Create Your Profile",
                            onClick: () => {
                                if (searchQuery || verifiedFilter !== "all" || locationFilter !== "all") {
                                    setSearchQuery("");
                                    setVerifiedFilter("all");
                                    setLocationFilter("all");
                                } else {
                                    router.push("/profile");
                                }
                            }
                        }}
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">{filteredTravelers.map((traveler) => (
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

