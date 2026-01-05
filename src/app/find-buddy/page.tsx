"use client";

import { useState, useMemo } from "react";
import { useGetTravelPlans } from "@/hooks/queries/useGetTravelPlans";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { H1, BodyLarge } from "@/components/ui/typography";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { Search, MapPin, Calendar, DollarSign, Users, Heart, ArrowLeft, Filter } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FindBuddyPage() {
    const router = useRouter();
    const [searchParams, setSearchParams] = useState({
        q: "",
        startDate: "",
        endDate: "",
        interest: "",
    });

    const { data: allPlans, isLoading, error } = useGetTravelPlans();

    // Filter plans based on search criteria
    const filteredPlans = useMemo(() => {
        if (!allPlans?.data) return [];

        let plans = allPlans.data;

        // Filter by destination (q)
        if (searchParams.q.trim()) {
            const query = searchParams.q.toLowerCase();
            plans = plans.filter(plan =>
                plan.destination.city.toLowerCase().includes(query) ||
                plan.destination.country.toLowerCase().includes(query)
            );
        }

        // Filter by interest
        if (searchParams.interest.trim()) {
            const interest = searchParams.interest.toLowerCase();
            plans = plans.filter(plan =>
                plan.categories.some(cat => cat.toLowerCase().includes(interest)) ||
                plan.travelType.toLowerCase().includes(interest)
            );
        }

        // Filter by start date
        if (searchParams.startDate) {
            const searchStart = new Date(searchParams.startDate);
            plans = plans.filter(plan => new Date(plan.startDate) >= searchStart);
        }

        // Filter by end date
        if (searchParams.endDate) {
            const searchEnd = new Date(searchParams.endDate);
            plans = plans.filter(plan => new Date(plan.endDate) <= searchEnd);
        }

        return plans;
    }, [allPlans, searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Filtering is done automatically via useMemo
    };

    const handleReset = () => {
        setSearchParams({
            q: "",
            startDate: "",
            endDate: "",
            interest: "",
        });
    };

    const hasActiveFilters = !!(searchParams.q || searchParams.startDate || searchParams.endDate || searchParams.interest);

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
                <div className="mb-8 text-center animate-fade-in">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Heart className="w-12 h-12 text-primary" />
                        <H1 className="text-gradient-primary">
                            Find Your Travel Buddy
                        </H1>
                    </div>
                    <BodyLarge className="text-muted-foreground max-w-2xl mx-auto">
                        Discover compatible travelers based on destination, dates, and shared interests
                    </BodyLarge>
                </div>

                {/* Search Filters */}
                <Card className="elevation-lg border-2 mb-8">
                    <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 p-6 rounded-t-lg">
                        <CardHeader className="text-white p-0">
                            <div className="flex items-center gap-3">
                                <Search className="w-6 h-6" />
                                <CardTitle className="text-2xl font-bold">Search Criteria</CardTitle>
                            </div>
                            <CardDescription className="text-violet-100 mt-2">
                                Use filters to find your perfect travel companion
                            </CardDescription>
                        </CardHeader>
                    </div>

                    <CardContent className="p-6">
                        <form onSubmit={handleSearch} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Destination */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-violet-600" />
                                        Destination
                                    </label>
                                    <Input
                                        placeholder="e.g., Kathmandu, Paris, Tokyo..."
                                        value={searchParams.q}
                                        onChange={(e) => setSearchParams({ ...searchParams, q: e.target.value })}
                                        className="border-violet-200 focus:border-violet-500 focus:ring-violet-500"
                                    />
                                </div>

                                {/* Interest */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <Heart className="w-4 h-4 text-violet-600" />
                                        Interest
                                    </label>
                                    <Input
                                        placeholder="e.g., hiking, photography, food..."
                                        value={searchParams.interest}
                                        onChange={(e) => setSearchParams({ ...searchParams, interest: e.target.value })}
                                        className="border-violet-200 focus:border-violet-500 focus:ring-violet-500"
                                    />
                                </div>

                                {/* Start Date */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-violet-600" />
                                        Start Date
                                    </label>
                                    <Input
                                        type="date"
                                        value={searchParams.startDate}
                                        onChange={(e) => setSearchParams({ ...searchParams, startDate: e.target.value })}
                                        className="border-violet-200 focus:border-violet-500 focus:ring-violet-500"
                                    />
                                </div>

                                {/* End Date */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-violet-600" />
                                        End Date
                                    </label>
                                    <Input
                                        type="date"
                                        value={searchParams.endDate}
                                        onChange={(e) => setSearchParams({ ...searchParams, endDate: e.target.value })}
                                        className="border-violet-200 focus:border-violet-500 focus:ring-violet-500"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                <Button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
                                    size="lg"
                                >
                                    <Filter className="w-4 h-4 mr-2" />
                                    Apply Filters
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleReset}
                                    size="lg"
                                >
                                    Clear
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Results Section */}
                {isLoading ? (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Filter className="w-5 h-5 animate-pulse" />
                            <p>Loading travel plans...</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <Skeleton key={i} className="h-96" />
                            ))}
                        </div>
                    </div>
                ) : error ? (
                    <EmptyState
                        icon={Search}
                        title="Error Loading Plans"
                        description="Failed to load travel plans. Please try again."
                        action={{
                            label: "Retry",
                            onClick: () => window.location.reload()
                        }}
                    />
                ) : filteredPlans.length > 0 ? (
                    <>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Users className="w-6 h-6 text-violet-600" />
                                {hasActiveFilters ? "Filtered Travel Plans" : "All Travel Plans"}
                                <Badge variant="secondary" className="ml-2">{filteredPlans.length} found</Badge>
                            </h2>
                            <p className="text-muted-foreground mt-2">
                                {hasActiveFilters
                                    ? `Found ${filteredPlans.length} travel ${filteredPlans.length === 1 ? 'plan' : 'plans'} matching your criteria`
                                    : `Showing all ${filteredPlans.length} available travel ${filteredPlans.length === 1 ? 'plan' : 'plans'}`
                                }
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
                            {filteredPlans.map((plan) => (
                                <Card key={plan._id} className="group bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-violet-300 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden">
                                    {/* Gradient top border */}
                                    <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 group-hover:h-3 transition-all duration-300" />

                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <CardTitle className="text-xl font-extrabold text-gray-900 mb-2 flex items-center gap-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-violet-600 group-hover:bg-clip-text transition-all duration-300">
                                                    <MapPin className="w-5 h-5 text-violet-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                                    <span className="truncate">{plan.destination.city}, {plan.destination.country}</span>
                                                </CardTitle>
                                                <CardDescription className="line-clamp-2 text-sm leading-relaxed">
                                                    {plan.description}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-4 pt-0">
                                        {/* Host Info */}
                                        <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl border border-violet-200 group-hover:border-violet-300 transition-colors duration-300">
                                            <Avatar className="h-12 w-12 ring-2 ring-white shadow-md group-hover:ring-violet-300 transition-all duration-300 group-hover:scale-110">
                                                <AvatarImage src={plan.host.profileImage} />
                                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white font-bold">
                                                    {plan.host.fullName.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-bold text-gray-900 flex items-center gap-1.5 truncate">
                                                    {plan.host.fullName}
                                                    {plan.host.isVerified && <VerifiedBadge size="sm" />}
                                                </div>
                                                <p className="text-xs text-gray-600 truncate">{plan.host.email}</p>
                                            </div>
                                        </div>

                                        {/* Trip Details */}
                                        <div className="space-y-2.5">
                                            <div className="flex items-center gap-3 p-2.5 bg-violet-50 rounded-lg border border-violet-200">
                                                <Calendar className="w-5 h-5 text-violet-600 flex-shrink-0" />
                                                <span className="text-sm font-medium text-gray-900 truncate">
                                                    {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 p-2.5 bg-green-50 rounded-lg border border-green-200">
                                                <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0" />
                                                <span className="text-sm font-bold text-gray-900">
                                                    ${plan.budgetRange.min} - ${plan.budgetRange.max}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 p-2.5 bg-blue-50 rounded-lg border border-blue-200">
                                                <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                                <span className="text-sm font-medium text-gray-900">
                                                    {plan.participants.length} {plan.participants.length === 1 ? 'participant' : 'participants'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Categories */}
                                        <div className="flex items-center gap-2 flex-wrap pt-2">
                                            <Badge className="bg-gradient-to-r from-blue-500 to-violet-500 text-white border-0 font-semibold px-3 py-1">
                                                {plan.travelType}
                                            </Badge>
                                            {plan.categories.slice(0, 2).map((category, index) => (
                                                <Badge key={index} variant="outline" className="border-2 border-violet-200 text-violet-700 hover:bg-violet-50 font-medium">
                                                    {category}
                                                </Badge>
                                            ))}
                                            {plan.categories.length > 2 && (
                                                <Badge variant="outline" className="border-2 border-gray-300 text-gray-700 font-medium">
                                                    +{plan.categories.length - 2} more
                                                </Badge>
                                            )}
                                        </div>

                                        {/* View Details Button */}
                                        <Link href={`/travel-plans/${plan._id}`} className="block pt-2">
                                            <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-bold shadow-md hover:shadow-xl transition-all duration-300 group/btn">
                                                <Heart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
                                                View Details
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </>
                ) : (
                    <EmptyState
                        icon={Search}
                        title={hasActiveFilters ? "No matching travel plans found" : "No travel plans available"}
                        description={hasActiveFilters ? "Try adjusting your filters to see more results" : "Be the first to create a travel plan!"}
                        action={hasActiveFilters ? {
                            label: "Clear Filters",
                            onClick: handleReset
                        } : {
                            label: "Create Travel Plan",
                            onClick: () => router.push("/travel-plans/add")
                        }}
                    />
                )}
            </div>
        </div>
    );
}
