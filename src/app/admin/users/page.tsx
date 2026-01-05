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
            <div className="container mx-auto px-4 py-8 max-w-7xl">{/* Back Button */}
                <Button
                    onClick={() => router.push("/admin/dashboard")}
                    variant="ghost"
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Button>

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="w-10 h-10 text-blue-600" />
                        <H1 className="text-gradient-primary">
                            User Management
                        </H1>
                    </div>
                    <BodyLarge className="text-muted-foreground">
                        View and manage all registered users
                    </BodyLarge>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            type="text"
                            placeholder="Search users by name, email, or location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{users?.length || 0}</p>
                                    <p className="text-sm text-muted-foreground">Total Users</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                                    <UserIcon className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{users?.filter((u) => u.role === "user").length || 0}</p>
                                    <p className="text-sm text-muted-foreground">Travelers</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                    <Shield className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{users?.filter((u) => u.role === "admin").length || 0}</p>
                                    <p className="text-sm text-muted-foreground">Admins</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Users Table */}
                {filteredUsers && filteredUsers.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredUsers.map((userData) => (
                            <Card key={userData._id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        {/* Avatar */}
                                        <Avatar className="h-16 w-16">
                                            <AvatarImage src={userData.profileImage} />
                                            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                                                {userData.fullName.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>

                                        {/* User Info */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-xl font-semibold">{userData.fullName}</h3>
                                                        <Badge variant={userData.role === "admin" ? "destructive" : "default"}>
                                                            {userData.role}
                                                        </Badge>
                                                        {userData.isVerified && (
                                                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                                                Verified
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <Mail className="w-4 h-4" />
                                                            {userData.email}
                                                        </div>
                                                        {userData.currentLocation && (
                                                            <div className="flex items-center gap-1">
                                                                <MapPin className="w-4 h-4" />
                                                                {userData.currentLocation}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Rating */}
                                                {userData.averageRating !== undefined && (
                                                    <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-full">
                                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                        <span className="font-semibold">{userData.averageRating.toFixed(1)}</span>
                                                        <span className="text-xs text-muted-foreground">({userData.ratingCount})</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Bio */}
                                            {userData.bio && (
                                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{userData.bio}</p>
                                            )}

                                            {/* Interests and Countries */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {userData.interests?.slice(0, 3).map((interest, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        {interest}
                                                    </Badge>
                                                ))}
                                                {userData.interests && userData.interests.length > 3 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{userData.interests.length - 3} more
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Visited Countries */}
                                            {userData.visitedCountries && userData.visitedCountries.length > 0 && (
                                                <p className="text-sm text-muted-foreground">
                                                    <span className="font-medium">Visited:</span> {userData.visitedCountries.slice(0, 3).join(", ")}
                                                    {userData.visitedCountries.length > 3 && ` +${userData.visitedCountries.length - 3} more`}
                                                </p>
                                            )}

                                            {/* Actions */}
                                            <div className="flex gap-2 mt-4">
                                                <Link href={`/profile/${userData._id}`}>
                                                    <Button variant="outline" size="sm">
                                                        View Profile
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
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
