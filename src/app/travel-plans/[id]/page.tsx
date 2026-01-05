"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetTravelPlanById } from "@/hooks/queries/useGetTravelPlanById";
import { useGetMyJoinRequests } from "@/hooks/queries/useGetMyJoinRequests";
import { useCreateJoinRequest } from "@/hooks/mutations/useCreateJoinRequest";
import { useLeaveTravelPlan } from "@/hooks/mutations/useLeaveTravelPlan";
import { useDeleteTravelPlan } from "@/hooks/mutations/useDeleteTravelPlan";
import { useAuth } from "@/context/AuthContext";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { H2 } from "@/components/ui/typography";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import {
    MapPin,
    Calendar,
    DollarSign,
    Users,
    Tag,
    ArrowLeft,
    Clock,
    Mail,
    UserMinus,
    UserPlus,
    Trash2
} from "lucide-react";

export default function TravelPlanDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const id = params?.id as string;
    const { data, isLoading, error } = useGetTravelPlanById(id);
    const { data: joinRequestsData } = useGetMyJoinRequests();
    const { mutate: deleteTrip, isPending: isDeleting } = useDeleteTravelPlan();
    const { mutate: sendJoinRequest, isPending: isSendingRequest } = useCreateJoinRequest();
    const { mutate: leaveTrip, isPending: isLeaving } = useLeaveTravelPlan();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900">
                <div className="container mx-auto px-4 py-8 max-w-5xl">
                    <Skeleton className="h-10 w-32 mb-6" />
                    <div className="space-y-6">
                        <Skeleton className="h-64 w-full rounded-2xl" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Skeleton className="h-96" />
                            <Skeleton className="h-96" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !data?.data) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
                <EmptyState
                    icon={MapPin}
                    title="Travel Plan Not Found"
                    description="Failed to load travel plan details. It may have been deleted or you don't have access."
                    action={{
                        label: "Back to Explore",
                        onClick: () => router.push("/explore")
                    }}
                />
            </div>
        );
    }

    const plan = data.data;

    // Check if current user has joined the trip
    const hasJoined = user ? plan.participants.includes(user._id) : false;

    // Check if current user is the host
    const isHost = user?._id === plan.host._id;

    // Check if user has already sent a join request for this plan
    const existingRequest = joinRequestsData?.data?.find(
        req => typeof req.travelPlan === "object" && req.travelPlan._id === id
    );
    const hasPendingRequest = existingRequest?.status === "pending";

    const handleJoinRequest = () => {
        if (!user) {
            router.push("/login");
            return;
        }
        sendJoinRequest(id);
    };

    const handleLeaveTrip = () => {
        leaveTrip(id);
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        deleteTrip(id, {
            onSuccess: () => {
                router.push("/admin/travel-plans");
            },
        });
        setDeleteDialogOpen(false);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    const formatShortDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const getDuration = () => {
        const start = new Date(plan.startDate);
        const end = new Date(plan.endDate);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return `${days} day${days !== 1 ? 's' : ''}`;
    };

    const getTravelTypeColor = (type: string) => {
        switch (type) {
            case "Solo":
                return "bg-blue-500";
            case "Family":
                return "bg-purple-500";
            case "Friends":
                return "bg-green-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900">
            <div className="container mx-auto px-4 py-8 max-w-5xl">
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

                    <div className="relative z-10">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <MapPin className="w-8 h-8" />
                                    <h1 className="text-4xl md:text-5xl font-bold">
                                        {plan.destination.city}
                                    </h1>
                                </div>
                                <p className="text-2xl text-violet-100">{plan.destination.country}</p>
                            </div>
                            <Badge className={`${getTravelTypeColor(plan.travelType)} text-white text-lg px-4 py-2`}>
                                {plan.travelType}
                            </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <div className="flex items-center gap-2 text-violet-100 mb-1">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">Duration</span>
                                </div>
                                <p className="text-xl font-semibold">{getDuration()}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <div className="flex items-center gap-2 text-violet-100 mb-1">
                                    <DollarSign className="w-4 h-4" />
                                    <span className="text-sm">Budget Range</span>
                                </div>
                                <p className="text-xl font-semibold">
                                    ${plan.budgetRange.min} - ${plan.budgetRange.max}
                                </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <div className="flex items-center gap-2 text-violet-100 mb-1">
                                    <Users className="w-4 h-4" />
                                    <span className="text-sm">Participants</span>
                                </div>
                                <p className="text-xl font-semibold">
                                    {plan.participants.length} joined
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description Card */}
                        <Card className="shadow-lg elevation-md">
                            <CardHeader>
                                <H2>About This Trip</H2>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">{plan.description}</p>
                            </CardContent>
                        </Card>

                        {/* Travel Dates Card */}
                        <Card className="shadow-lg elevation-md">
                            <CardHeader>
                                <H2 className="flex items-center gap-2">
                                    <Calendar className="w-6 h-6 text-violet-500" />
                                    Travel Dates
                                </H2>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-lg">
                                    <div className="flex-1">
                                        <p className="text-sm text-muted-foreground mb-1">Departure</p>
                                        <p className="text-lg font-semibold">{formatDate(plan.startDate)}</p>
                                        <p className="text-sm text-violet-600 dark:text-violet-400 mt-1">
                                            {formatShortDate(plan.startDate)}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-12 h-0.5 bg-violet-300"></div>
                                        <Clock className="w-5 h-5 text-violet-500 mx-2" />
                                        <div className="w-12 h-0.5 bg-violet-300"></div>
                                    </div>
                                    <div className="flex-1 text-right">
                                        <p className="text-sm text-muted-foreground mb-1">Return</p>
                                        <p className="text-lg font-semibold">{formatDate(plan.endDate)}</p>
                                        <p className="text-sm text-violet-600 dark:text-violet-400 mt-1">
                                            {formatShortDate(plan.endDate)}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Categories Card */}
                        {plan.categories && plan.categories.length > 0 && (
                            <Card className="shadow-lg elevation-md">
                                <CardHeader>
                                    <H2 className="flex items-center gap-2">
                                        <Tag className="w-6 h-6 text-violet-500" />
                                        Activities & Interests
                                    </H2>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {plan.categories.map((category, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className="px-4 py-2 text-sm bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
                                            >
                                                {category}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Host Card */}
                        <Card className="shadow-lg elevation-lg border-2 border-violet-200 dark:border-violet-800">
                            <CardHeader>
                                <H2>Trip Host</H2>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <Avatar className="h-24 w-24 border-4 border-violet-500">
                                        <AvatarImage src={plan.host.profileImage} alt={plan.host.fullName} />
                                        <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-3xl">
                                            {plan.host.fullName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-xl font-bold mb-1 flex items-center justify-center gap-2">
                                            {plan.host.fullName}
                                            {plan.host.isVerified && <VerifiedBadge size="sm" />}
                                        </h3>
                                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                            <Mail className="w-4 h-4" />
                                            <span>{plan.host.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Card */}
                        <Card className="shadow-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                            <CardContent className="p-6">
                                {user?.role === "admin" ? (
                                    <>
                                        <h3 className="text-xl font-bold mb-4">Admin Actions</h3>
                                        <p className="text-violet-100 mb-6 text-sm">
                                            You have administrative privileges to manage this travel plan.
                                        </p>
                                        <Button
                                            onClick={handleDeleteClick}
                                            disabled={isDeleting}
                                            className="w-full bg-white text-red-600 hover:bg-red-50 disabled:opacity-50"
                                            size="lg"
                                            title="Delete this travel plan permanently"
                                        >
                                            {isDeleting ? (
                                                <>
                                                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                                                    Deleting...
                                                </>
                                            ) : (
                                                <>
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Delete Travel Plan
                                                </>
                                            )}
                                        </Button>
                                    </>
                                ) : isHost ? (
                                    <>
                                        <h3 className="text-xl font-bold mb-4">Your Travel Plan</h3>
                                        <p className="text-violet-100 mb-6 text-sm">
                                            You&apos;re hosting this trip. Manage your participants and join requests.
                                        </p>
                                        {/* TODO: Add Manage Requests button when API is ready */}
                                    </>
                                ) : hasJoined ? (
                                    <>
                                        <h3 className="text-xl font-bold mb-4">You&apos;re going on this trip! 🎉</h3>
                                        <p className="text-violet-100 mb-6 text-sm">
                                            You&apos;ve joined this adventure. Changed your mind?
                                        </p>
                                        <Button
                                            onClick={handleLeaveTrip}
                                            disabled={isLeaving}
                                            className="w-full bg-white text-red-600 hover:bg-red-50"
                                            size="lg"
                                        >
                                            {isLeaving ? (
                                                <>
                                                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                                                    Leaving...
                                                </>
                                            ) : (
                                                <>
                                                    <UserMinus className="w-4 h-4 mr-2" />
                                                    Leave Trip
                                                </>
                                            )}
                                        </Button>
                                    </>
                                ) : hasPendingRequest ? (
                                    <>
                                        <h3 className="text-xl font-bold mb-4">Request Pending ⏳</h3>
                                        <p className="text-violet-100 mb-6 text-sm">
                                            Your join request is pending approval from the host. Check &quot;My Requests&quot; to manage it.
                                        </p>
                                        <Button
                                            onClick={() => router.push("/my-requests")}
                                            className="w-full bg-white text-violet-600 hover:bg-violet-50"
                                            size="lg"
                                        >
                                            View My Requests
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="text-xl font-bold mb-4">Interested in joining?</h3>
                                        <p className="text-violet-100 mb-6 text-sm">
                                            Send a join request to the host. They&apos;ll review and approve your request.
                                        </p>
                                        <Button
                                            onClick={handleJoinRequest}
                                            disabled={isSendingRequest}
                                            className="w-full bg-white text-violet-600 hover:bg-violet-50"
                                            size="lg"
                                        >
                                            {isSendingRequest ? (
                                                <>
                                                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <UserPlus className="w-4 h-4 mr-2" />
                                                    Request to Join
                                                </>
                                            )}
                                        </Button>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* Trip Info Card */}
                        <Card className="shadow-lg">
                            <CardHeader>
                                <h2 className="text-xl font-bold">Trip Information</h2>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b">
                                    <span className="text-sm text-muted-foreground">Created</span>
                                    <span className="text-sm font-medium">
                                        {formatShortDate(plan.createdAt)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b">
                                    <span className="text-sm text-muted-foreground">Last Updated</span>
                                    <span className="text-sm font-medium">
                                        {formatShortDate(plan.updatedAt)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-sm text-muted-foreground">Trip ID</span>
                                    <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                        {plan._id.slice(-8)}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Delete Confirmation Dialog */}
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Travel Plan?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete this travel plan?
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
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={confirmDelete}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                Yes, Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
