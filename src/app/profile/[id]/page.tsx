"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetUserById } from "@/hooks/queries/useGetUserById";
import { useGetUserReviews } from "@/hooks/queries/useGetUserReviews";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    User as UserIcon,
    Mail,
    Calendar,
    MapPin,
    Star,
    Shield,
    Heart,
    ArrowLeft,
    Globe,
    MessageSquare
} from "lucide-react";

export default function UserProfilePage() {
    const params = useParams();
    const router = useRouter();
    const userId = params?.id as string;
    const { data: user, isLoading, error } = useGetUserById(userId);
    const { data: reviews, isLoading: reviewsLoading } = useGetUserReviews(userId);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <Skeleton className="h-10 w-48 mb-6" />
                    <Skeleton className="h-64 w-full rounded-2xl mb-8" />
                    <div className="space-y-6">
                        <Skeleton className="h-96" />
                        <Skeleton className="h-64" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
                <EmptyState
                    icon={UserIcon}
                    title="User Not Found"
                    description="Failed to load user profile. The user may not exist or you don't have access."
                    action={{
                        label: "Back to Explore",
                        onClick: () => router.push("/explore")
                    }}
                />
            </div>
        );
    }

    const getUserInitials = () => {
        return user.fullName?.charAt(0).toUpperCase() || "U";
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Back Button */}
                <Button
                    onClick={() => router.push("/explore")}
                    variant="ghost"
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Explore
                </Button>

                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 p-8 md:p-12 text-white mb-8 shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                        <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                            <AvatarImage src={user.profileImage} alt={user.fullName} />
                            <AvatarFallback className="bg-white text-violet-600 text-4xl font-bold">
                                {getUserInitials()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                                <h1 className="text-4xl font-bold">{user.fullName}</h1>
                                {user.isVerified && (
                                    <Badge className="bg-blue-500 text-white gap-1">
                                        <Shield className="w-3 h-3" />
                                        Verified
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-violet-100 mb-4 justify-center md:justify-start">
                                <Mail className="w-4 h-4" />
                                <span>{user.email}</span>
                            </div>
                            <Badge variant="secondary" className="text-sm px-4 py-1">
                                {user.role}
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Rating Card */}
                    <Card className="elevation-lg border-2 border-violet-200 dark:border-violet-800 animate-fade-in">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-500" />
                                Rating & Reviews
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3 p-6 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-xl">
                                    <Star className="w-12 h-12 fill-yellow-400 text-yellow-400" />
                                    <div>
                                        <p className="text-4xl font-bold">
                                            {user.averageRating?.toFixed(1) || "0.0"}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {user.ratingCount || 0} {user.ratingCount === 1 ? "review" : "reviews"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bio Card */}
                    {user.bio && (
                        <Card className="elevation-md animate-fade-in">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <UserIcon className="w-5 h-5 text-violet-600" />
                                    About
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Location Card */}
                    {user.currentLocation && (
                        <Card className="elevation-md animate-fade-in">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-violet-600" />
                                    Current Location
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 text-lg">
                                    <Globe className="w-5 h-5 text-violet-500" />
                                    <span className="font-medium">{user.currentLocation}</span>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Interests Card */}
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Heart className="w-5 h-5 text-violet-600" />
                                Interests
                            </CardTitle>
                            <CardDescription>Things they love to do while traveling</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {user.interests && user.interests.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {user.interests.map((interest: string, index: number) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="px-4 py-2 bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
                                        >
                                            {interest}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No interests added yet</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Visited Countries Card */}
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-violet-600" />
                                Visited Countries
                            </CardTitle>
                            <CardDescription>Places they have explored</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {user.visitedCountries && user.visitedCountries.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {user.visitedCountries.map((country: string, index: number) => (
                                        <Badge
                                            key={index}
                                            variant="outline"
                                            className="px-4 py-2"
                                        >
                                            {country}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No countries added yet</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Member Info Card */}
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-violet-600" />
                                Member Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-sm text-muted-foreground">Member Since</span>
                                <span className="text-sm font-medium">
                                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-muted-foreground">Last Updated</span>
                                <span className="text-sm font-medium">
                                    {new Date(user.updatedAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Reviews Card */}
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-violet-600" />
                                Reviews
                            </CardTitle>
                            <CardDescription>What other travelers say about them</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {reviewsLoading ? (
                                <div className="space-y-4">
                                    {[...Array(3)].map((_, i) => (
                                        <Skeleton key={i} className="h-32" />
                                    ))}
                                </div>
                            ) : reviews && reviews.length > 0 ? (
                                <div className="space-y-4">
                                    {reviews.map((review) => (
                                        <div
                                            key={review._id}
                                            className="p-4 border rounded-lg bg-gradient-to-r from-violet-50/50 to-purple-50/50 dark:from-violet-950/10 dark:to-purple-950/10"
                                        >
                                            <div className="flex items-start gap-4">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={review.reviewer.profileImage} />
                                                    <AvatarFallback className="bg-violet-500 text-white">
                                                        {review.reviewer.fullName.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div>
                                                            <p className="font-semibold">{review.reviewer.fullName}</p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {new Date(review.createdAt).toLocaleDateString("en-US", {
                                                                    month: "long",
                                                                    day: "numeric",
                                                                    year: "numeric",
                                                                })}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-4 h-4 ${i < review.rating
                                                                        ? "fill-yellow-400 text-yellow-400"
                                                                        : "text-gray-300"
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-950 flex items-center justify-center mx-auto mb-4">
                                        <MessageSquare className="w-8 h-8 text-violet-600 dark:text-violet-400" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">No reviews yet</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        This traveler has not received any reviews
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
