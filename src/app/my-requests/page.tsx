"use client";

import { useState } from "react";
import { useGetMyJoinRequests } from "@/hooks/queries/useGetMyJoinRequests";
import { useCancelJoinRequest } from "@/hooks/mutations/useCancelJoinRequest";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorDisplay } from "@/components/ui/error-display";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { MapPin, Calendar, DollarSign, XCircle } from "lucide-react";
import { format } from "date-fns";
import { JoinRequest } from "@/types/join-request.types";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyRequestsPage() {
    const router = useRouter();
    const { data, isLoading, error } = useGetMyJoinRequests();
    const { mutate: cancelRequest, isPending: isCancelling } = useCancelJoinRequest();
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-16">
                <ErrorDisplay
                    title="Failed to load your requests"
                    message="There was an error loading your join requests. Please try again later."
                />
            </div>
        );
    }

    const requests = data?.data || [];

    if (requests.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16">
                <EmptyState
                    title="No join requests yet"
                    description="You haven't sent any join requests. Start exploring travel plans and send requests to join!"
                    action={{
                        label: "Explore Plans",
                        onClick: () => router.push("/explore")
                    }}
                />
            </div>
        );
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">Pending</Badge>;
            case "approved":
                return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Approved</Badge>;
            case "rejected":
                return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Rejected</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const handleCancel = (requestId: string) => {
        setSelectedRequestId(requestId);
        setCancelDialogOpen(true);
    };

    const confirmCancel = () => {
        if (selectedRequestId) {
            cancelRequest(selectedRequestId, {
                onSuccess: () => {
                    setCancelDialogOpen(false);
                    setSelectedRequestId(null);
                },
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">My Join Requests</h1>
                <p className="text-muted-foreground">
                    View and manage your travel plan join requests
                </p>
            </div>

            <div className="grid gap-6">
                {requests.map((request: JoinRequest) => {
                    const plan = typeof request.travelPlan === "object" ? request.travelPlan : null;

                    if (!plan) return null;

                    return (
                        <Card key={request._id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <CardTitle className="text-xl">
                                                {plan.destination.city}, {plan.destination.country}
                                            </CardTitle>
                                            {getStatusBadge(request.status)}
                                        </div>
                                        <CardDescription className="line-clamp-2">
                                            {plan.description}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Host Info */}
                                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={plan.host.profileImage} alt={plan.host.fullName} />
                                        <AvatarFallback>
                                            {plan.host.fullName.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">Host</p>
                                        <p className="text-sm text-muted-foreground">{plan.host.fullName}</p>
                                    </div>
                                </div>

                                {/* Travel Details */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div className="flex items-start gap-2">
                                        <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Dates</p>
                                            <p className="text-muted-foreground">
                                                {format(new Date(plan.startDate), "MMM d")} - {format(new Date(plan.endDate), "MMM d, yyyy")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <DollarSign className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Budget</p>
                                            <p className="text-muted-foreground">
                                                ${plan.budgetRange.min} - ${plan.budgetRange.max}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Travel Type</p>
                                            <p className="text-muted-foreground">{plan.travelType}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Request Info */}
                                <div className="pt-3 border-t">
                                    <p className="text-xs text-muted-foreground">
                                        Request sent on {format(new Date(request.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                                    </p>
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col gap-3">
                                <Link href={`/travel-plans/${plan._id}`} className="w-full">
                                    <Button className="w-full elevation-sm hover:elevation-md bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white">
                                        View Plan
                                    </Button>
                                </Link>
                                {request.status === "pending" && (
                                    <Button
                                        variant="outline"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleCancel(request._id);
                                        }}
                                        disabled={isCancelling && selectedRequestId === request._id}
                                        className="w-full border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700 disabled:opacity-50"
                                    >
                                        <XCircle className="h-4 w-4 mr-2" />
                                        {isCancelling && selectedRequestId === request._id ? "Cancelling..." : "Cancel Request"}
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>

            {/* Cancel Confirmation Dialog */}
            <AlertDialog open={cancelDialogOpen} onOpenChange={(open) => {
                if (!open && !isCancelling) {
                    setCancelDialogOpen(false);
                    setSelectedRequestId(null);
                }
            }}>
                <AlertDialogContent className="bg-white dark:bg-gray-950 border shadow-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Join Request?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to cancel this join request? This action cannot be undone, but you can send a new request later.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={isCancelling}
                            onClick={() => {
                                setCancelDialogOpen(false);
                                setSelectedRequestId(null);
                            }}
                        >
                            Keep Request
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault();
                                confirmCancel();
                            }}
                            disabled={isCancelling}
                            className="bg-orange-600 text-white hover:bg-orange-700 disabled:opacity-50"
                        >
                            {isCancelling ? "Cancelling..." : "Yes, Cancel Request"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
