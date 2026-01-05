"use client";

import { useState } from "react";
import { useGetTravelPlanRequests } from "@/hooks/queries/useGetTravelPlanRequests";
import { useAcceptJoinRequest } from "@/hooks/mutations/useAcceptJoinRequest";
import { useRejectJoinRequest } from "@/hooks/mutations/useRejectJoinRequest";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
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
import { Users, Check, X, Clock, Mail } from "lucide-react";
import { JoinRequest } from "@/types/join-request.types";
import { format } from "date-fns";

interface JoinRequestsManagerProps {
    travelPlanId: string;
    pendingCount?: number;
}

export function JoinRequestsManager({ travelPlanId, pendingCount = 0 }: JoinRequestsManagerProps) {
    const [selectedTab, setSelectedTab] = useState("pending");
    const [sheetOpen, setSheetOpen] = useState(false);
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

    const { data: requestsData, isLoading } = useGetTravelPlanRequests(travelPlanId, selectedTab);
    const { mutate: acceptRequest, isPending: isAccepting } = useAcceptJoinRequest();
    const { mutate: rejectRequest, isPending: isRejecting } = useRejectJoinRequest();

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

    return (
        <>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" className="relative">
                        <Users className="w-4 h-4 mr-2" />
                        Manage Requests
                        {pendingCount > 0 && (
                            <Badge className="ml-2 bg-red-500 text-white">{pendingCount}</Badge>
                        )}
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Join Requests</SheetTitle>
                        <SheetDescription>
                            Review and manage join requests for this travel plan
                        </SheetDescription>
                    </SheetHeader>

                    <div className="mt-6">
                        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="pending">Pending</TabsTrigger>
                                <TabsTrigger value="approved">Approved</TabsTrigger>
                                <TabsTrigger value="rejected">Rejected</TabsTrigger>
                            </TabsList>

                            <TabsContent value={selectedTab} className="mt-6">
                                {isLoading ? (
                                    <div className="flex justify-center py-8">
                                        <LoadingSpinner size="lg" />
                                    </div>
                                ) : requests.length === 0 ? (
                                    <EmptyState
                                        icon={Users}
                                        title={`No ${selectedTab} requests`}
                                        description={`There are no ${selectedTab} join requests for this travel plan.`}
                                    />
                                ) : (
                                    <div className="space-y-4">
                                        {requests.map((request: JoinRequest) => {
                                            const user = typeof request.user === "object" ? request.user : null;
                                            if (!user) return null;

                                            return (
                                                <Card key={request._id} className="overflow-hidden">
                                                    <CardHeader className="pb-4">
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <Avatar className="h-12 w-12">
                                                                    <AvatarImage src={user.profileImage} alt={user.fullName} />
                                                                    <AvatarFallback>
                                                                        {user.fullName.charAt(0).toUpperCase()}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <CardTitle className="text-base mb-1">
                                                                        {user.fullName}
                                                                    </CardTitle>
                                                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                                        <Mail className="w-3 h-3" />
                                                                        {user.email}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {getStatusBadge(request.status)}
                                                        </div>
                                                    </CardHeader>

                                                    <CardContent>
                                                        <p className="text-xs text-muted-foreground mb-4">
                                                            Requested on {format(new Date(request.createdAt), "MMM d, yyyy 'at' h:mm a")}
                                                        </p>

                                                        {request.status === "pending" && (
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    onClick={() => handleAccept(request._id, user.fullName)}
                                                                    disabled={isAccepting || isRejecting}
                                                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                                                >
                                                                    <Check className="w-4 h-4 mr-2" />
                                                                    Accept
                                                                </Button>
                                                                <Button
                                                                    onClick={() => handleReject(request._id, user.fullName)}
                                                                    disabled={isAccepting || isRejecting}
                                                                    variant="outline"
                                                                    className="flex-1 border-red-500 text-red-600 hover:bg-red-50"
                                                                >
                                                                    <X className="w-4 h-4 mr-2" />
                                                                    Reject
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            );
                                        })}
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </SheetContent>
            </Sheet>

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
                            {isAccepting || isRejecting ? "Processing..." : actionDialog.type === "accept" ? "Accept" : "Reject"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
