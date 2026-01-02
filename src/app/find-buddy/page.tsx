"use client";

import { useState } from "react";
import { useMatchTravelPlans } from "@/hooks/queries/useMatchTravelPlans";
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

    const [appliedParams, setAppliedParams] = useState({
        q: "",
        startDate: "",
        endDate: "",
        interest: "",
    });

    const { data: matchedPlans, isLoading, error } = useMatchTravelPlans(appliedParams);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Convert dates to ISO format if they exist
        const params = {
            q: searchParams.q,
            startDate: searchParams.startDate ? new Date(searchParams.startDate).toISOString() : "",
            endDate: searchParams.endDate ? new Date(searchParams.endDate).toISOString() : "",
            interest: searchParams.interest,
        };
        setAppliedParams(params);
    };

    const handleReset = () => {
        setSearchParams({
            q: "",
            startDate: "",
            endDate: "",
            interest: "",
        });
        setAppliedParams({
            q: "",
            startDate: "",
            endDate: "",
            interest: "",
        });
    };

    const hasSearched = !!(appliedParams.q || appliedParams.startDate || appliedParams.endDate || appliedParams.interest);

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
                                    <Search className="w-4 h-4 mr-2" />
                                    Search Travel Buddies
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleReset}
                                    size="lg"
                                >
                                    Reset
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Results Section */}
                {isLoading && hasSearched ? (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Filter className="w-5 h-5 animate-pulse" />
                            <p>Finding your perfect travel buddies...</p>
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
                        title="Search Error"
                        description="Failed to load matching travel plans. Please try again."
                        action={{
                            label: "Retry Search",
                            onClick: () => window.location.reload()
                        }}
                    />
                ) : hasSearched ? (
                    matchedPlans && matchedPlans.length > 0 ? (
                        <>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <Users className="w-6 h-6 text-violet-600" />
                                    Matching Travel Plans
                                    <Badge variant="secondary" className="ml-2">{matchedPlans.length} found</Badge>
                                </h2>
                                <p className="text-muted-foreground mt-2">
                                    We found {matchedPlans.length} travel {matchedPlans.length === 1 ? 'plan' : 'plans'} that match your criteria
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {matchedPlans.map((plan) => (
                                    <Card key={plan._id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                                                    <p className="text-sm font-medium flex items-center gap-1.5">
                                                        {plan.host.fullName}
                                                        {plan.host.isVerified && <VerifiedBadge size="sm" />}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">{plan.host.email}</p>
                                                </div>
                                            </div>

                                            {/* Trip Details */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Calendar className="w-4 h-4 text-violet-600" />
                                                    <span className="text-xs">
                                                        {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <DollarSign className="w-4 h-4 text-green-600" />
                                                    <span className="text-xs">
                                                        ${plan.budgetRange.min} - ${plan.budgetRange.max}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Users className="w-4 h-4 text-blue-600" />
                                                    <span className="text-xs">
                                                        {plan.participants.length} {plan.participants.length === 1 ? 'participant' : 'participants'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Categories */}
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <Badge variant="secondary">{plan.travelType}</Badge>
                                                {plan.categories.slice(0, 2).map((category, index) => (
                                                    <Badge key={index} variant="outline">{category}</Badge>
                                                ))}
                                                {plan.categories.length > 2 && (
                                                    <Badge variant="outline">+{plan.categories.length - 2}</Badge>
                                                )}
                                            </div>

                                            {/* View Details Button */}
                                            <Link href={`/travel-plans/${plan._id}`}>
                                                <Button className="w-full" variant="default">
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
                            title="No matching travel plans found"
                            description="Try adjusting your search criteria or explore all available plans"
                            action={{
                                label: "Explore All Plans",
                                onClick: () => router.push("/explore")
                            }}
                        />
                    )
                ) : (
                    <EmptyState
                        icon={Filter}
                        title="Start Your Search"
                        description="Use the filters above to find travel buddies that match your preferences"
                    />
                )}
            </div>
        </div>
    );
}
