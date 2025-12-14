"use client";

import { useGetPastJoinedTravelPlans } from "@/hooks/queries/useGetPastJoinedTravelPlans";
import { useSubmitReview } from "@/hooks/mutations/useSubmitReview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { H1 } from "@/components/ui/typography";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { MapPin, Calendar, DollarSign, Users, History, ArrowLeft, Star, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PastTripsPage() {
    const router = useRouter();
    const { user, isLoading: authLoading } = useAuth();
    const { data: pastPlans, isLoading: plansLoading } = useGetPastJoinedTravelPlans();
    const submitReview = useSubmitReview();

    const [reviewDialogOpen, setReviewDialogOpen] = useState<string | null>(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const isLoading = authLoading || plansLoading;

    const handleSubmitReview = (planId: string) => {
        submitReview.mutate(
            { planId, rating, comment },
            {
                onSuccess: () => {
                    setReviewDialogOpen(null);
                    setRating(5);
                    setComment("");
                },
            }
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900">
                <div className="container-wide px-4 py-8">
                    <Skeleton className="h-10 w-32 mb-6" />
                    <div className="mb-8">
                        <Skeleton className="h-12 w-96 mb-2" />
                        <Skeleton className="h-6 w-64" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-96" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900 flex items-center justify-center">
                <EmptyState
                    icon={History}
                    title="Authentication Required"
                    description="Please login to view your past trips and submit reviews."
                    action={{
                        label: "Go to Login",
                        onClick: () => router.push("/login")
                    }}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900">
            <div className="container-wide px-4 section-padding-sm">
                {/* Back Button */}
                <Button
                    onClick={() => router.push("/explore")}
                    variant="ghost"
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Explore
                </Button>

                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <div className="flex items-center gap-3 mb-2">
                        <History className="w-10 h-10 text-primary" />
                        <H1 className="text-gradient-primary">Past Trips</H1>
                    </div>
                    <p className="text-body-lg text-muted-foreground">
                        Your completed adventures and memories
                    </p>
                </div>

                {/* Trips Content */}
                {pastPlans && pastPlans.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pastPlans.map((plan) => {
                            const tripEndDate = new Date(plan.endDate);
                            const daysAgo = Math.ceil(
                                (new Date().getTime() - tripEndDate.getTime()) / (1000 * 60 * 60 * 24)
                            );

                            return (
                                <Card key={plan._id} className="overflow-hidden hover:shadow-lg transition-shadow opacity-90">
                                    <div className="h-2 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600" />
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-xl mb-2 flex items-center gap-2">
                                                    <MapPin className="w-5 h-5 text-gray-600" />
                                                    {plan.destination.city}, {plan.destination.country}
                                                </CardTitle>
                                                <Badge variant="secondary" className="mb-2">
                                                    Completed {daysAgo} {daysAgo === 1 ? 'day' : 'days'} ago
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
                                                <Calendar className="w-4 h-4 text-gray-600" />
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

                                        {/* Action Buttons */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <Link href={`/travel-plans/${plan._id}`} className="w-full">
                                                <Button className="w-full" variant="outline">
                                                    View Details
                                                </Button>
                                            </Link>

                                            <Dialog open={reviewDialogOpen === plan._id} onOpenChange={(open) => setReviewDialogOpen(open ? plan._id : null)}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        className="w-full !bg-gradient-to-r !from-amber-500 !to-orange-600 hover:!from-amber-600 hover:!to-orange-700 !text-white border-0 !opacity-100"
                                                    >
                                                        <Star className="w-4 h-4 mr-2" />
                                                        Give Review
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-950 border-2">
                                                    <DialogHeader>
                                                        <DialogTitle>Write a Review</DialogTitle>
                                                        <DialogDescription>
                                                            Share your experience for {plan.destination.city}, {plan.destination.country}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-4 py-4">
                                                        {/* Rating */}
                                                        <div className="space-y-2">
                                                            <Label>Rating</Label>
                                                            <div className="flex items-center gap-2">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <button
                                                                        key={star}
                                                                        type="button"
                                                                        onClick={() => setRating(star)}
                                                                        className="transition-transform hover:scale-110"
                                                                    >
                                                                        <Star
                                                                            className={`w-8 h-8 ${star <= rating
                                                                                ? "fill-yellow-400 text-yellow-400"
                                                                                : "text-gray-300"
                                                                                }`}
                                                                        />
                                                                    </button>
                                                                ))}
                                                                <span className="ml-2 text-sm text-muted-foreground">
                                                                    {rating} out of 5
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Comment */}
                                                        <div className="space-y-2">
                                                            <Label htmlFor="comment">Comment</Label>
                                                            <Textarea
                                                                id="comment"
                                                                placeholder="Share your experience with this trip..."
                                                                value={comment}
                                                                onChange={(e) => setComment(e.target.value)}
                                                                rows={5}
                                                                className="resize-none"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex justify-end gap-3">
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => {
                                                                setReviewDialogOpen(null);
                                                                setRating(5);
                                                                setComment("");
                                                            }}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleSubmitReview(plan._id)}
                                                            disabled={!comment.trim() || submitReview.isPending}
                                                            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
                                                        >
                                                            {submitReview.isPending ? (
                                                                "Submitting..."
                                                            ) : (
                                                                <>
                                                                    <MessageSquare className="w-4 h-4 mr-2" />
                                                                    Submit Review
                                                                </>
                                                            )}
                                                        </Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle>Your Past Trips</CardTitle>
                            <CardDescription>Travel plans you have completed</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-12">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                        <History className="w-10 h-10 text-gray-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">No past trips yet</h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Your completed adventures will appear here
                                        </p>
                                        <Button
                                            onClick={() => router.push("/explore")}
                                            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
                                        >
                                            <MapPin className="w-4 h-4 mr-2" />
                                            Explore Travel Plans
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
