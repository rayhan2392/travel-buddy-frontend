"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateTravelPlan } from "@/hooks/mutations/useCreateTravelPlan";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2, MapPin, ArrowLeft, Calendar, DollarSign } from "lucide-react";
import { AxiosError } from "axios";

const travelPlanSchema = z.object({
    country: z.string().min(2, "Country is required"),
    city: z.string().min(2, "City is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    minBudget: z.string().min(1, "Minimum budget is required"),
    maxBudget: z.string().min(1, "Maximum budget is required"),
    travelType: z.enum(["Solo", "Family", "Friends"], {
        message: "Please select a travel type",
    }),
    description: z.string().min(10, "Description must be at least 10 characters"),
    categories: z.string().optional(),
}).refine((data) => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    return end > start;
}, {
    message: "End date must be after start date",
    path: ["endDate"],
}).refine((data) => {
    const min = parseInt(data.minBudget);
    const max = parseInt(data.maxBudget);
    return max > min;
}, {
    message: "Maximum budget must be greater than minimum budget",
    path: ["maxBudget"],
});

type TravelPlanFormValues = z.infer<typeof travelPlanSchema>;

export default function AddTravelPlanPage() {
    const router = useRouter();
    const { mutate: createTravelPlan, isPending, error } = useCreateTravelPlan();

    const form = useForm<TravelPlanFormValues>({
        resolver: zodResolver(travelPlanSchema),
        defaultValues: {
            country: "",
            city: "",
            startDate: "",
            endDate: "",
            minBudget: "",
            maxBudget: "",
            travelType: undefined,
            description: "",
            categories: "",
        },
    });

    const onSubmit = (data: TravelPlanFormValues) => {
        const payload = {
            destination: {
                country: data.country,
                city: data.city,
            },
            startDate: data.startDate,
            endDate: data.endDate,
            budgetRange: {
                min: parseInt(data.minBudget),
                max: parseInt(data.maxBudget),
            },
            travelType: data.travelType,
            description: data.description,
            categories: data.categories
                ? data.categories.split(",").map((c) => c.trim()).filter(Boolean)
                : [],
        };

        createTravelPlan(payload, {
            onSuccess: () => {
                router.push("/explore");
            },
        });
    };

    const errorMessage = error instanceof AxiosError
        ? error.response?.data?.message || "Failed to create travel plan. Please try again."
        : null;

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900">
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                {/* Back Button */}
                <Button
                    onClick={() => router.push("/explore")}
                    variant="ghost"
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Explore
                </Button>

                <Card className="elevation-xl border-2 border-violet-200 dark:border-violet-800 animate-fade-in">
                    {/* Header with Gradient */}
                    <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 p-8 rounded-t-lg">
                        <CardHeader className="text-white p-0">
                            <div className="flex items-center gap-3 mb-2">
                                <MapPin className="w-8 h-8" />
                                <CardTitle className="text-3xl font-bold">Create Travel Plan</CardTitle>
                            </div>
                            <CardDescription className="text-violet-100">
                                Plan your next adventure and find travel companions
                            </CardDescription>
                        </CardHeader>
                    </div>

                    <CardContent className="p-8 bg-white dark:bg-gray-950">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {/* Destination Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 pb-2 border-b-2 border-violet-200 dark:border-violet-800">
                                        <MapPin className="w-5 h-5 text-violet-500" />
                                        <h3 className="font-bold text-lg text-violet-900 dark:text-violet-100">Destination</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="country"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Country</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="e.g., Italy"
                                                            {...field}
                                                            disabled={isPending}
                                                            className="border-violet-200 focus:border-violet-500 focus:ring-violet-500"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="e.g., Rome"
                                                            {...field}
                                                            disabled={isPending}
                                                            className="border-violet-200 focus:border-violet-500 focus:ring-violet-500"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Travel Dates Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 pb-2 border-b-2 border-violet-200 dark:border-violet-800">
                                        <Calendar className="w-5 h-5 text-violet-500" />
                                        <h3 className="font-bold text-lg text-violet-900 dark:text-violet-100">Travel Dates</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="startDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Start Date</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="date"
                                                            {...field}
                                                            disabled={isPending}
                                                            className="border-violet-200 focus:border-violet-500 focus:ring-violet-500"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="endDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>End Date</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="date"
                                                            {...field}
                                                            disabled={isPending}
                                                            className="border-violet-200 focus:border-violet-500 focus:ring-violet-500"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Budget Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 pb-2 border-b-2 border-violet-200 dark:border-violet-800">
                                        <DollarSign className="w-5 h-5 text-violet-500" />
                                        <h3 className="font-bold text-lg text-violet-900 dark:text-violet-100">Budget Range (USD)</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="minBudget"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Minimum Budget</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="300"
                                                            {...field}
                                                            disabled={isPending}
                                                            className="border-violet-200 focus:border-violet-500 focus:ring-violet-500"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="maxBudget"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Maximum Budget</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="700"
                                                            {...field}
                                                            disabled={isPending}
                                                            className="border-violet-200 focus:border-violet-500 focus:ring-violet-500"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Travel Type */}
                                <FormField
                                    control={form.control}
                                    name="travelType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Travel Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="border-violet-200 focus:border-violet-500 focus:ring-violet-500">
                                                        <SelectValue placeholder="Select travel type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Solo">Solo</SelectItem>
                                                    <SelectItem value="Family">Family</SelectItem>
                                                    <SelectItem value="Friends">Friends</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Description */}
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describe your travel plans, what you want to do, places you want to visit..."
                                                    className="resize-none border-violet-200 focus:border-violet-500 focus:ring-violet-500"
                                                    rows={4}
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Share details about your trip to help others decide if they&apos;d like to join
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Categories */}
                                <FormField
                                    control={form.control}
                                    name="categories"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Categories (Optional)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g., Hiking, Food Tours, Photography (comma separated)"
                                                    {...field}
                                                    disabled={isPending}
                                                    className="border-violet-200 focus:border-violet-500 focus:ring-violet-500"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Add categories to help travelers find your plan
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Error Message */}
                                {errorMessage && (
                                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm p-4 rounded-lg flex items-start gap-2">
                                        <span className="text-lg">⚠️</span>
                                        <span>{errorMessage}</span>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <div className="flex gap-4 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => router.push("/explore")}
                                        disabled={isPending}
                                        className="flex-1"
                                        size="lg"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isPending}
                                        className="flex-1 elevation-sm hover:elevation-md bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
                                        size="lg"
                                    >
                                        {isPending ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Creating...
                                            </>
                                        ) : (
                                            "Create Travel Plan"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
