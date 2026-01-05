"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetTravelPlanById } from "@/hooks/queries/useGetTravelPlanById";
import { useGetTravelPlanRequests } from "@/hooks/queries/useGetTravelPlanRequests";
import { useAcceptJoinRequest } from "@/hooks/mutations/useAcceptJoinRequest";
import { useRejectJoinRequest } from "@/hooks/mutations/useRejectJoinRequest";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Users, Check, X, Clock, Mail, MapPin } from "lucide-react";
import { JoinRequest } from "@/types/join-request.types";
import { format } from "date-fns";

export default function ManageRequestsPage() {
    const params = useParams();
    const router = useRouter();
    const travelPlanId = params?.id as string;

    const [selectedTab, setSelectedTab] = useState("pending");
    const [actionDialog, setActionDialog] = useState<{
        open: boolean;
        type: "accept" | "reject" | null;
        requestId: string | null;
        userName: string | null;
    }>({
        open: false,
        type: null,
        requestId: null,
        userName: null,
    });

    const { data: planData, isLoading: isPlanLoading } = useGetTravelPlanById(travelPlanId);

    // Map tab value to API status filter
    const getApiStatus = (tab: string) => {
        if (tab === "approved") return "accepted";
        return tab; // "pending" or "rejected"
    };

    const { data: requestsData, isLoading: isRequestsLoading } = useGetTravelPlanRequests(travelPlanId, getApiStatus(selectedTab));
    const { mutate: acceptRequest, isPending: isAccepting } = useAcceptJoinRequest();
    const { mutate: rejectRequest, isPending: isRejecting } = useRejectJoinRequest();

    const plan = planData?.data;
    const requests = requestsData?.data || [];

    const handleAccept = (requestId: string, userName: string) => {
        setActionDialog({
            open: true,
            type: "accept",
            requestId,
            userName,
        });
    };

    const handleReject = (requestId: string, userName: string) => {
        setActionDialog({
            open: true,
            type: "reject",
            requestId,
            userName,
        });
    };

    const confirmAction = () => {
        if (!actionDialog.requestId || !actionDialog.type) return;

        if (actionDialog.type === "accept") {
            acceptRequest(actionDialog.requestId, {
                onSuccess: () => {
                    setActionDialog({ open: false, type: null, requestId: null, userName: null });
                },
            });
        } else {
            rejectRequest(actionDialog.requestId, {
                onSuccess: () => {
                    setActionDialog({ open: false, type: null, requestId: null, userName: null });
                },
            });
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                    </Badge>
                );
            case "approved":
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                        <Check className="w-3 h-3 mr-1" />
                        Approved
                    </Badge>
                );
            case "rejected":
                return (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
                        <X className="w-3 h-3 mr-1" />
                        Rejected
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    if (isPlanLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Skeleton className="h-10 w-32 mb-6" />
                <Skeleton className="h-32 w-full mb-6" />
                <Skeleton className="h-96 w-full" />
            </div>
        );
    }

    if (!plan) {
        return (
            <div className="container mx-auto px-4 py-16">
                <EmptyState
                    icon={MapPin}
                    title="Travel Plan Not Found"
                    description="The travel plan you're looking for doesn't exist or you don't have access to it."
                    action={{
                        label: "Back to My Plans",
                        onClick: () => router.push("/my-plans")
                    }}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900">
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Back Button */}
                <Button
                    onClick={() => router.push("/my-plans")}
                    variant="ghost"
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to My Plans
                </Button>

                {/* Header */}
                <Card className="mb-6 overflow-hidden shadow-lg">
                    <div className="h-2 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500" />
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                                    <MapPin className="w-6 h-6 text-violet-600" />
                                    {plan.destination.city}, {plan.destination.country}
                                </CardTitle>
                                <p className="text-muted-foreground">
                                    Manage join requests for this travel plan
                                </p>
                            </div>
                            <Badge variant="secondary" className="text-base px-4 py-2">
                                {plan.travelType}
                            </Badge>
                        </div>
                    </CardHeader>
                </Card>

                {/* Tabs */}
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="pending">
                            <Clock className="w-4 h-4 mr-2" />
                            Pending
                        </TabsTrigger>
                        <TabsTrigger value="approved">
                            <Check className="w-4 h-4 mr-2" />
                            Approved
                        </TabsTrigger>
                        <TabsTrigger value="rejected">
                            <X className="w-4 h-4 mr-2" />
                            Rejected
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value={selectedTab}>
                        {isRequestsLoading ? (
                            <div className="flex justify-center py-16">
                                <LoadingSpinner />
                            </div>
                        ) : requests.length === 0 ? (
                            <EmptyState
                                icon={Users}
                                title={`No ${selectedTab} requests`}
                                description={`There are no ${selectedTab} join requests for this travel plan.`}
                            />
                        ) : (
                            <div className="grid gap-4">
                                {requests.map((request: JoinRequest) => {
                                    const user = typeof request.user === "object" ? request.user : null;
                                    if (!user) return null;

                                    return (
                                        <Card key={request._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                            <CardHeader className="pb-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <Avatar className="h-16 w-16">
                                                            <AvatarImage src={user.profileImage} alt={user.fullName} />
                                                            <AvatarFallback className="text-lg">
                                                                {user.fullName.charAt(0).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <CardTitle className="text-lg mb-1">
                                                                {user.fullName}
                                                            </CardTitle>
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <Mail className="w-4 h-4" />
                                                                {user.email}
                                                            </div>
                                                            <p className="text-xs text-muted-foreground mt-2">
                                                                Requested on {format(new Date(request.createdAt), "MMM d, yyyy 'at' h:mm a")}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {getStatusBadge(request.status)}
                                                </div>
                                            </CardHeader>

                                            {request.status === "pending" && (
                                                <CardContent>
                                                    <div className="flex gap-3">
                                                        <Button
                                                            onClick={() => handleAccept(request._id, user.fullName)}
                                                            disabled={isAccepting || isRejecting}
                                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                                            size="lg"
                                                        >
                                                            <Check className="w-4 h-4 mr-2" />
                                                            Accept Request
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleReject(request._id, user.fullName)}
                                                            disabled={isAccepting || isRejecting}
                                                            variant="outline"
                                                            className="flex-1 border-red-500 text-red-600 hover:bg-red-50"
                                                            size="lg"
                                                        >
                                                            <X className="w-4 h-4 mr-2" />
                                                            Reject Request
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            )}
                                        </Card>
                                    );
                                })}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>

            {/* Confirmation Dialog */}
            <AlertDialog open={actionDialog.open} onOpenChange={(open) => {
                if (!open && !isAccepting && !isRejecting) {
                    setActionDialog({ open: false, type: null, requestId: null, userName: null });
                }
            }}>
                <AlertDialogContent className="bg-white dark:bg-gray-950 border shadow-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {actionDialog.type === "accept" ? "Accept Join Request?" : "Reject Join Request?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {actionDialog.type === "accept"
                                ? `Are you sure you want to accept ${actionDialog.userName}'s request to join this trip? They will be added as a participant.`
                                : `Are you sure you want to reject ${actionDialog.userName}'s request? This action cannot be undone.`
                            }
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={isAccepting || isRejecting}
                            onClick={() => setActionDialog({ open: false, type: null, requestId: null, userName: null })}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault();
                                confirmAction();
                            }}
                            disabled={isAccepting || isRejecting}
                            className={
                                actionDialog.type === "accept"
                                    ? "bg-green-600 hover:bg-green-700 text-white"
                                    : "bg-red-600 hover:bg-red-700 text-white"
                            }
                        >
                            {isAccepting || isRejecting ? "Processing..." : actionDialog.type === "accept" ? "Yes, Accept" : "Yes, Reject"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
