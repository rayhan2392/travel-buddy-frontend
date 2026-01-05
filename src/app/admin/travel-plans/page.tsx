"use client";

import { useAuth } from "@/context/AuthContext";
import { useGetTravelPlans } from "@/hooks/queries/useGetTravelPlans";
import { useDeleteTravelPlan } from "@/hooks/mutations/useDeleteTravelPlan";
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MapPin, Search, ArrowLeft, Calendar, DollarSign, Users, Trash2, Loader2 } from "lucide-react";

export default function AdminTravelPlansPage() {
    const { user, isLoading: authLoading } = useAuth();
    const { data: travelPlansResponse, isLoading: plansLoading } = useGetTravelPlans();
    const { mutate: deleteTrip, isPending: isDeleting } = useDeleteTravelPlan();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [planToDelete, setPlanToDelete] = useState<{ id: string; name: string } | null>(null);

    const travelPlans = travelPlansResponse?.data;

    useEffect(() => {
        if (!authLoading && (!user || user.role !== "admin")) {
            router.push("/");
        }
    }, [user, authLoading, router]);

    const isLoading = authLoading || plansLoading;

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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-96" />
                        ))}
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (!user || user.role !== "admin") {
        return null;
    }

    const filteredPlans = travelPlans?.filter((plan) => {
        const query = searchQuery.toLowerCase();
        return (
            plan.destination.city.toLowerCase().includes(query) ||
            plan.destination.country.toLowerCase().includes(query) ||
            plan.host.fullName.toLowerCase().includes(query) ||
            plan.description.toLowerCase().includes(query)
        );
    });

    const handleDeleteClick = (planId: string, destination: string) => {
        setPlanToDelete({ id: planId, name: destination });
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (planToDelete) {
            deleteTrip(planToDelete.id);
            setDeleteDialogOpen(false);
            setPlanToDelete(null);
        }
    };

    return (
        <AdminLayout>
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Back Button */}
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
                        <MapPin className="w-10 h-10 text-green-600" />
                        <H1 className="text-gradient-primary">
                            Travel Plans Management
                        </H1>
                    </div>
                    <BodyLarge className="text-muted-foreground">
                        View and manage all travel plans
                    </BodyLarge>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            type="text"
                            placeholder="Search by destination, host, or description..."
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
                                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                                    <MapPin className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{travelPlans?.length || 0}</p>
                                    <p className="text-sm text-muted-foreground">Total Plans</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                    <Calendar className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">
                                        {travelPlans?.filter((p) => new Date(p.endDate) >= new Date()).length || 0}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Active Plans</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                    <Users className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">
                                        {travelPlans?.reduce((acc, plan) => acc + plan.participants.length, 0) || 0}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Total Participants</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Travel Plans Grid */}
                {filteredPlans && filteredPlans.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredPlans.map((plan) => {
                            const isActive = new Date(plan.endDate) >= new Date();

                            return (
                                <Card key={plan._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className={`h-2 bg-gradient-to-r ${isActive
                                        ? "from-green-400 via-green-500 to-green-600"
                                        : "from-gray-400 via-gray-500 to-gray-600"
                                        }`} />
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-xl mb-2 flex items-center gap-2">
                                                    <MapPin className="w-5 h-5 text-green-600" />
                                                    {plan.destination.city}, {plan.destination.country}
                                                </CardTitle>
                                                <Badge variant={isActive ? "default" : "secondary"} className="mb-2">
                                                    {isActive ? "Active" : "Completed"}
                                                </Badge>
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
                                                <p className="text-sm font-medium">Hosted by {plan.host.fullName}</p>
                                                <p className="text-xs text-muted-foreground">{plan.host.email}</p>
                                            </div>
                                        </div>

                                        {/* Trip Details */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Calendar className="w-4 h-4 text-blue-600" />
                                                <div>
                                                    <p className="font-medium">Dates</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <DollarSign className="w-4 h-4 text-green-600" />
                                                <div>
                                                    <p className="font-medium">Budget</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        ${plan.budgetRange.min} - ${plan.budgetRange.max}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Categories and Participants */}
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <Badge variant="secondary">{plan.travelType}</Badge>
                                                {plan.categories.slice(0, 2).map((category, index) => (
                                                    <Badge key={index} variant="outline">{category}</Badge>
                                                ))}
                                                {plan.categories.length > 2 && (
                                                    <Badge variant="outline">+{plan.categories.length - 2} more</Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Users className="w-4 h-4" />
                                                <span>{plan.participants.length} {plan.participants.length === 1 ? 'participant' : 'participants'}</span>
                                            </div>
                                        </div>

                                        {/* Delete Button */}
                                        <Button
                                            onClick={() => handleDeleteClick(plan._id, `${plan.destination.city}, ${plan.destination.country}`)}
                                            disabled={isDeleting}
                                            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white disabled:opacity-50"
                                            title="Delete this travel plan permanently"
                                        >
                                            {isDeleting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Deleting...
                                                </>
                                            ) : (
                                                <>
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Delete Travel Plan
                                                </>
                                            )}
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>No Travel Plans Found</CardTitle>
                            <CardDescription>
                                {searchQuery ? "No travel plans match your search criteria" : "No travel plans created yet"}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                )}

                {/* Delete Confirmation Dialog */}
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Travel Plan?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete the trip to <strong>{planToDelete?.name}</strong>?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="text-sm text-muted-foreground mt-4">
                            This action cannot be undone. This will permanently:
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Remove all participant data</li>
                                <li>Delete all associated reviews</li>
                                <li>Erase the travel plan</li>
                            </ul>
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setPlanToDelete(null)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={confirmDelete}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AdminLayout>
    );
}
