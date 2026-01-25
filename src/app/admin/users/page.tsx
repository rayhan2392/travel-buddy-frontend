"use client";

import { useAuth } from "@/context/AuthContext";
import { useGetAllUsers } from "@/hooks/queries/useGetAllUsers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { H1, BodyLarge } from "@/components/ui/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Search, ArrowLeft, Mail, MapPin, Star, Shield, User as UserIcon } from "lucide-react";
import Link from "next/link";

export default function AdminUsersPage() {
    const { user, isLoading: authLoading } = useAuth();
    const { data: usersResponse, isLoading: usersLoading } = useGetAllUsers();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const users = usersResponse;

    useEffect(() => {
        if (!authLoading && (!user || user.role !== "admin")) {
            router.push("/");
        }
    }, [user, authLoading, router]);

    const isLoading = authLoading || usersLoading;

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    <Skeleton className="h-10 w-48 mb-6" />
                    <div className="mb-8">
                        <Skeleton className="h-10 w-96 mb-2" />
                        <Skeleton className="h-6 w-64" />
                    </div>
                    <Skeleton className="h-12 w-full max-w-md mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-24" />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-64" />
                        ))}
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (!user || user.role !== "admin") {
        return null;
    }

    const filteredUsers = users?.filter((u) => {
        const query = searchQuery.toLowerCase();
        return (
            u.fullName.toLowerCase().includes(query) ||
            u.email.toLowerCase().includes(query) ||
            u.currentLocation?.toLowerCase().includes(query)
        );
    });

    return (
        <AdminLayout>
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Back Button */}
                <Button
                    onClick={() => router.push("/admin/dashboard")}
                    variant="ghost"
                    className="mb-6 hover:bg-violet-50"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Button>

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="w-10 h-10 text-violet-600" />
                        <H1 className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                            User Management
                        </H1>
                    </div>
                    <BodyLarge className="text-gray-600">
                        View and manage all registered users
                    </BodyLarge>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            type="text"
                            placeholder="Search users by name, email, or location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 border-2 border-gray-200 focus:border-violet-400"
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="border-2 border-violet-100 shadow-md hover:shadow-lg transition-all">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-violet-100 rounded-lg">
                                    <Users className="w-6 h-6 text-violet-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-800">{users?.length || 0}</p>
                                    <p className="text-sm text-gray-600">Total Users</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-blue-100 shadow-md hover:shadow-lg transition-all">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <UserIcon className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-800">{users?.filter((u) => u.role === "user").length || 0}</p>
                                    <p className="text-sm text-gray-600">Travelers</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-pink-100 shadow-md hover:shadow-lg transition-all">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-pink-100 rounded-lg">
                                    <Shield className="w-6 h-6 text-pink-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-800">{users?.filter((u) => u.role === "admin").length || 0}</p>
                                    <p className="text-sm text-gray-600">Admins</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Users Grid */}
                {filteredUsers && filteredUsers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{filteredUsers.map((userData) => (
                        <Card key={userData._id} className="border-2 border-gray-200 hover:border-violet-300 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                            <CardContent className="p-6 flex-1 flex flex-col">
                                <div className="flex flex-col items-center text-center mb-4">
                                    {/* Avatar */}
                                    <Avatar className="h-20 w-20 mb-3 ring-2 ring-violet-200">
                                        <AvatarImage src={userData.profileImage} />
                                        <AvatarFallback className="bg-gradient-to-br from-violet-500 to-blue-500 text-white text-xl font-semibold">
                                            {userData.fullName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>

                                    {/* User Info */}
                                    <div className="w-full">
                                        <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
                                            <h3 className="text-lg font-semibold text-gray-800 truncate max-w-full">{userData.fullName}</h3>
                                        </div>
                                        <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
                                            <Badge variant={userData.role === "admin" ? "destructive" : "default"} className="text-xs">
                                                {userData.role}
                                            </Badge>
                                            {userData.isVerified && (
                                                <Badge className="bg-blue-100 text-blue-700 text-xs">
                                                    Verified
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Rating */}
                                        {userData.averageRating !== undefined && (
                                            <div className="flex items-center justify-center gap-1 bg-yellow-50 px-3 py-1 rounded-full mb-3 w-fit mx-auto">
                                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                <span className="font-semibold text-sm">{userData.averageRating.toFixed(1)}</span>
                                                <span className="text-xs text-gray-600">({userData.ratingCount})</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Email and Location */}
                                <div className="space-y-2 mb-4 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600 justify-center">
                                        <Mail className="w-4 h-4 flex-shrink-0" />
                                        <span className="truncate text-xs">{userData.email}</span>
                                    </div>
                                    {userData.currentLocation && (
                                        <div className="flex items-center gap-2 text-gray-600 justify-center">
                                            <MapPin className="w-4 h-4 flex-shrink-0" />
                                            <span className="truncate text-xs">{userData.currentLocation}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Bio */}
                                {userData.bio && (
                                    <p className="text-xs text-gray-600 mb-3 line-clamp-2 text-center">{userData.bio}</p>
                                )}

                                {/* Interests */}
                                <div className="flex flex-wrap gap-1 justify-center mb-4 mt-auto">
                                    {userData.interests?.slice(0, 2).map((interest, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                            {interest}
                                        </Badge>
                                    ))}
                                    {userData.interests && userData.interests.length > 2 && (
                                        <Badge variant="outline" className="text-xs">
                                            +{userData.interests.length - 2}
                                        </Badge>
                                    )}
                                </div>

                                {/* Visited Countries */}
                                {userData.visitedCountries && userData.visitedCountries.length > 0 && (
                                    <p className="text-xs text-gray-600 mb-4 text-center">
                                        <span className="font-medium">Visited:</span> {userData.visitedCountries.slice(0, 2).join(", ")}
                                        {userData.visitedCountries.length > 2 && ` +${userData.visitedCountries.length - 2}`}
                                    </p>
                                )}

                                {/* Actions */}
                                <Link href={`/profile/${userData._id}`} className="w-full mt-auto">
                                    <Button variant="outline" size="sm" className="w-full border-2 border-violet-200 hover:bg-violet-50 hover:border-violet-400 transition-all">
                                        View Profile
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                    </div>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>No Users Found</CardTitle>
                            <CardDescription>
                                {searchQuery ? "No users match your search criteria" : "No users registered yet"}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                )}
            </div>
        </AdminLayout>
    );
}
