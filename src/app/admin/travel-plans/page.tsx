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
                    className="mb-6 hover:bg-blue-50"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Button>

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-10 h-10 text-blue-600" />
                        <H1 className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                            Travel Plans Management
                        </H1>
                    </div>
                    <BodyLarge className="text-gray-600">
                        View and manage all travel plans
                    </BodyLarge>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            type="text"
                            placeholder="Search by destination, host, or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 border-2 border-gray-200 focus:border-blue-400"
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="border-2 border-blue-100 shadow-md hover:shadow-lg transition-all">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-800">{travelPlans?.length || 0}</p>
                                    <p className="text-sm text-gray-600">Total Plans</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-violet-100 shadow-md hover:shadow-lg transition-all">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-violet-100 rounded-lg">
                                    <Calendar className="w-6 h-6 text-violet-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {travelPlans?.filter((p) => new Date(p.endDate) >= new Date()).length || 0}
                                    </p>
                                    <p className="text-sm text-gray-600">Active Plans</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-pink-100 shadow-md hover:shadow-lg transition-all">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-pink-100 rounded-lg">
                                    <Users className="w-6 h-6 text-pink-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {travelPlans?.reduce((acc, plan) => acc + plan.participants.length, 0) || 0}
                                    </p>
                                    <p className="text-sm text-gray-600">Total Participants</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Travel Plans Grid */}
                {filteredPlans && filteredPlans.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredPlans.map((plan) => {
                            const isActive = new Date(plan.endDate) >= new Date();

                            return (
                                <Card key={plan._id} className="border-2 border-gray-200 hover:border-blue-300 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                                    <div className={`h-2 bg-gradient-to-r ${isActive
                                        ? "from-blue-400 via-violet-500 to-pink-600"
                                        : "from-gray-300 via-gray-400 to-gray-500"
                                        }`} />
                                    <CardHeader className="pb-4">
                                        <div className="flex flex-col">
                                            <div className="flex-1">
                                                <div className="flex items-start gap-2 mb-2">
                                                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                                                    <CardTitle className="text-base font-semibold text-gray-800 line-clamp-2">
                                                        {plan.destination.city}, {plan.destination.country}
                                                    </CardTitle>
                                                </div>
                                                <Badge variant={isActive ? "default" : "secondary"} className="mb-2 text-xs">
                                                    {isActive ? "Active" : "Completed"}
                                                </Badge>
                                                <CardDescription className="text-xs line-clamp-2">
                                                    {plan.description}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3 flex-1 flex flex-col">
                                        {/* Host Info */}
                                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={plan.host.profileImage} />
                                                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-blue-500 text-white text-sm">
                                                    {plan.host.fullName.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium truncate">{plan.host.fullName}</p>
                                                <p className="text-xs text-gray-500 truncate">{plan.host.email}</p>
                                            </div>
                                        </div>

                                        {/* Trip Details */}
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2 text-xs">
                                                <Calendar className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-gray-700">Dates</p>
                                                    <p className="text-xs text-gray-600 break-words">
                                                        {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2 text-xs">
                                                <DollarSign className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-gray-700">Budget</p>
                                                    <p className="text-xs text-gray-600">
                                                        ${plan.budgetRange.min} - ${plan.budgetRange.max}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Categories and Participants */}
                                        <div className="space-y-2 mt-auto">
                                            <div className="flex items-center gap-1 flex-wrap">
                                                <Badge variant="secondary" className="text-xs">{plan.travelType}</Badge>
                                                {plan.categories.slice(0, 1).map((category, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">{category}</Badge>
                                                ))}
                                                {plan.categories.length > 1 && (
                                                    <Badge variant="outline" className="text-xs">+{plan.categories.length - 1}</Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                                <Users className="w-4 h-4" />
                                                <span>{plan.participants.length} {plan.participants.length === 1 ? 'participant' : 'participants'}</span>
                                            </div>
                                        </div>

                                        {/* Delete Button */}
                                        <Button
                                            onClick={() => handleDeleteClick(plan._id, `${plan.destination.city}, ${plan.destination.country}`)}
                                            disabled={isDeleting}
                                            size="sm"
                                            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white disabled:opacity-50 mt-3"
                                            title="Delete this travel plan permanently"
                                        >
                                            {isDeleting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                                    Deleting...
                                                </>
                                            ) : (
                                                <>
                                                    <Trash2 className="w-3 h-3 mr-2" />
                                                    Delete Plan
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
