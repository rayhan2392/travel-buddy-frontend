"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { H1 } from "@/components/ui/typography";
import { useAuth } from "@/context/AuthContext";
import { EditProfileDialog } from "@/components/modules/profile/EditProfileDialog";
import { Mail, Calendar, MapPin, Star, Shield, Pencil } from "lucide-react";

export default function ProfilePage() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                <Skeleton className="h-24 w-24 rounded-full" />
                                <div className="flex-1 space-y-3">
                                    <Skeleton className="h-8 w-64" />
                                    <Skeleton className="h-4 w-48" />
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-48 mb-2" />
                            <Skeleton className="h-4 w-64" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-16 w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardContent className="py-8">
                        <p className="text-center text-muted-foreground">Please login to view your profile</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const getUserInitials = () => {
        return user.fullName?.charAt(0).toUpperCase() || "U";
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="space-y-6 animate-fade-in">
                    {/* Profile Header Card */}
                    <Card className="elevation-lg border-2">
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={user.profileImage} alt={user.fullName} />
                                    <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                                        {getUserInitials()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <H1>{user.fullName}</H1>
                                        {user.isVerified && (
                                            <Badge variant="default" className="gap-1">
                                                <Shield className="w-3 h-3" />
                                                Verified
                                            </Badge>
                                        )}
                                        <Badge variant="secondary">{user.role}</Badge>
                                    </div>
                                    <CardDescription className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        {user.email}
                                    </CardDescription>
                                </div>
                                <EditProfileDialog user={user}>
                                    <Button>
                                        <Pencil className="w-4 h-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                </EditProfileDialog>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Profile Details Card */}
                    <Card className="elevation-md">
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Your personal details and preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Bio */}
                            {user.bio && (
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Bio</h3>
                                    <p className="text-base">{user.bio}</p>
                                </div>
                            )}

                            {/* Current Location */}
                            {user.currentLocation && (
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        Current Location
                                    </h3>
                                    <p className="text-base">{user.currentLocation}</p>
                                </div>
                            )}

                            {/* Interests */}
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                                    Interests
                                </h3>
                                {user.interests && user.interests.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {user.interests.map((interest, index) => (
                                            <Badge key={index} variant="outline">
                                                {interest}
                                            </Badge>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No interests added yet</p>
                                )}
                            </div>

                            {/* Visited Countries */}
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                                    Visited Countries
                                </h3>
                                {user.visitedCountries && user.visitedCountries.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {user.visitedCountries.map((country, index) => (
                                            <Badge key={index} variant="secondary">
                                                {country}
                                            </Badge>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No countries added yet</p>
                                )}
                            </div>

                            {/* Rating */}
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                                    <Star className="w-4 h-4" />
                                    Rating
                                </h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-5 h-5 fill-primary text-primary" />
                                        <span className="text-lg font-semibold">
                                            {user.averageRating?.toFixed(1) || "0.0"}
                                        </span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        ({user.ratingCount || 0} {user.ratingCount === 1 ? "review" : "reviews"})
                                    </span>
                                </div>
                            </div>

                            {/* Member Since */}
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Member Since
                                </h3>
                                <p className="text-base">
                                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
