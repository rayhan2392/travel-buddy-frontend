"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { useAuth } from "@/context/AuthContext";
import { EditProfileDialog } from "@/components/modules/profile/EditProfileDialog";
import { Mail, Calendar, MapPin, Star, Pencil, Crown } from "lucide-react";
import Link from "next/link";

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 to-violet-50 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-violet-300/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 py-12 max-w-5xl relative z-10">
                <div className="space-y-8 animate-fade-in">
                    {/* Profile Header Card */}
                    <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden">
                        {/* Banner gradient */}
                        <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 relative">
                            <div className="absolute inset-0 bg-white/10" />
                        </div>

                        <CardHeader className="relative -mt-16 pb-8">
                            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
                                {/* Avatar with ring */}
                                <div className="relative">
                                    <Avatar className="h-32 w-32 ring-4 ring-white shadow-2xl">
                                        <AvatarImage src={user.profileImage} alt={user.fullName} />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white text-4xl font-bold">
                                            {getUserInitials()}
                                        </AvatarFallback>
                                    </Avatar>
                                    {user.isVerified && (
                                        <div className="absolute -bottom-2 -right-2">
                                            <VerifiedBadge size="lg" />
                                        </div>
                                    )}
                                </div>

                                {/* User info */}
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
                                            {user.fullName}
                                        </h1>
                                        <Badge variant="secondary" className="capitalize px-3 py-1 font-semibold bg-gradient-to-r from-blue-100 to-violet-100 border-2 border-violet-200">
                                            {user.role}
                                        </Badge>
                                    </div>
                                    <CardDescription className="flex items-center gap-2 text-base">
                                        <Mail className="w-5 h-5 text-violet-600" />
                                        <span className="text-gray-700 font-medium">{user.email}</span>
                                    </CardDescription>
                                    {!user.isVerified && (
                                        <div className="mt-3">
                                            <Link href="/pricing">
                                                <Button size="sm" className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold shadow-md hover:shadow-lg transition-all duration-200 group">
                                                    <Crown className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                                                    Get Verified Badge
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Edit button */}
                                <EditProfileDialog user={user}>
                                    <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 group">
                                        <Pencil className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                                        Edit Profile
                                    </Button>
                                </EditProfileDialog>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Profile Details Card */}
                    <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-violet-50">
                            <CardTitle className="text-2xl font-bold text-gray-900">Profile Information</CardTitle>
                            <CardDescription className="text-base">Your personal details and preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8 p-8">
                            {/* Bio */}
                            {user.bio && (
                                <div className="group">
                                    <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        About Me
                                    </h3>
                                    <div className="p-4 bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl border-2 border-gray-200">
                                        <p className="text-base text-gray-700 leading-relaxed">{user.bio}</p>
                                    </div>
                                </div>
                            )}

                            {/* Current Location */}
                            {user.currentLocation && (
                                <div className="group">
                                    <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-violet-600" />
                                        Current Location
                                    </h3>
                                    <div className="p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border-2 border-violet-200 hover:border-violet-300 transition-colors duration-200">
                                        <p className="text-lg font-semibold text-gray-900">{user.currentLocation}</p>
                                    </div>
                                </div>
                            )}

                            {/* Interests */}
                            <div className="group">
                                <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    ✨ Interests
                                </h3>
                                {user.interests && user.interests.length > 0 ? (
                                    <div className="flex flex-wrap gap-3">
                                        {user.interests.map((interest, index) => (
                                            <Badge
                                                key={index}
                                                className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-500 to-violet-500 text-white border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                                            >
                                                {interest}
                                            </Badge>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">No interests added yet</p>
                                )}
                            </div>

                            {/* Visited Countries */}
                            <div className="group">
                                <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    🌍 Visited Countries
                                </h3>
                                {user.visitedCountries && user.visitedCountries.length > 0 ? (
                                    <div className="flex flex-wrap gap-3">
                                        {user.visitedCountries.map((country, index) => (
                                            <Badge
                                                key={index}
                                                className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-green-500 to-teal-500 text-white border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                                            >
                                                {country}
                                            </Badge>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">No countries added yet</p>
                                )}
                            </div>

                            {/* Rating */}
                            <div className="group">
                                <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-600" />
                                    Rating & Reviews
                                </h3>
                                <div className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-200">
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <Star className="w-8 h-8 fill-yellow-500 text-yellow-500" />
                                            <span className="text-4xl font-extrabold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                                                {user.averageRating?.toFixed(1) || "0.0"}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-700">
                                                {user.ratingCount || 0} {user.ratingCount === 1 ? "review" : "reviews"}
                                            </p>
                                            <p className="text-xs text-gray-600">From fellow travelers</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Member Since */}
                            <div className="group">
                                <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                    Member Since
                                </h3>
                                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-colors duration-200">
                                    <p className="text-lg font-bold text-gray-900">
                                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
