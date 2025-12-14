"use client";

import { useState, useRef, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUpdateProfile } from "@/hooks/mutations/useUpdateProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserType } from "@/types/auth.types";
import { Loader2, Camera, X, User, MapPin } from "lucide-react";
import { AxiosError } from "axios";

const profileSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    bio: z.string().optional(),
    currentLocation: z.string().optional(),
    interests: z.string().optional(),
    visitedCountries: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface EditProfileDialogProps {
    user: UserType;
    children?: React.ReactNode;
}

export function EditProfileDialog({ user, children }: EditProfileDialogProps) {
    const [open, setOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { mutate: updateProfile, isPending, error } = useUpdateProfile();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: user.fullName || "",
            bio: user.bio || "",
            currentLocation: user.currentLocation || "",
            interests: user.interests?.join(", ") || "",
            visitedCountries: user.visitedCountries?.join(", ") || "",
        },
    });

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setPreviewImage(null);
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const onSubmit = (data: ProfileFormValues) => {
        console.log("Form submitted with data:", data);
        const formData = new FormData();

        formData.append("fullName", data.fullName);
        if (data.bio) formData.append("bio", data.bio);
        if (data.currentLocation) formData.append("currentLocation", data.currentLocation);

        // Convert comma-separated strings to arrays and send as JSON
        if (data.interests) {
            const interestsArray = data.interests.split(",").map((i) => i.trim()).filter(Boolean);
            if (interestsArray.length > 0) {
                formData.append("interests", JSON.stringify(interestsArray));
            }
        }

        if (data.visitedCountries) {
            const countriesArray = data.visitedCountries.split(",").map((c) => c.trim()).filter(Boolean);
            if (countriesArray.length > 0) {
                formData.append("visitedCountries", JSON.stringify(countriesArray));
            }
        }

        // Add image if selected
        if (selectedFile) {
            formData.append("file", selectedFile);
        }

        // Log FormData contents
        console.log("FormData entries:");
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        console.log("Calling updateProfile mutation...");
        updateProfile(formData, {
            onSuccess: (response) => {
                console.log("Profile updated successfully:", response);
                setOpen(false);
                setPreviewImage(null);
                setSelectedFile(null);
            },
            onError: (error) => {
                console.error("Profile update error:", error);
            },
        });
    };

    const getUserInitials = () => {
        return user.fullName?.charAt(0).toUpperCase() || "U";
    };

    const errorMessage = error instanceof AxiosError
        ? error.response?.data?.message || "Failed to update profile. Please try again."
        : null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 bg-white dark:bg-gray-950">
                {/* Colorful Header */}
                <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 p-6 rounded-t-lg">
                    <DialogHeader className="text-white">
                        <DialogTitle className="text-2xl font-bold">✨ Edit Your Profile</DialogTitle>
                        <DialogDescription className="text-violet-100">
                            Personalize your travel profile and make it stand out
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white dark:bg-gray-950">
                        {/* Profile Image Section */}
                        <div className="flex flex-col items-center gap-4 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 p-6 rounded-lg border-2 border-dashed border-violet-300 dark:border-violet-700">
                            <div className="relative group">
                                <Avatar className="h-28 w-28 cursor-pointer ring-4 ring-violet-500/20 transition-all group-hover:ring-violet-500/40 group-hover:scale-105" onClick={handleImageClick}>
                                    <AvatarImage src={previewImage || user.profileImage} alt={user.fullName} />
                                    <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-3xl">
                                        {getUserInitials()}
                                    </AvatarFallback>
                                </Avatar>
                                <div
                                    className="absolute bottom-0 right-0 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full p-2.5 cursor-pointer hover:from-violet-600 hover:to-purple-700 transition-all shadow-lg"
                                    onClick={handleImageClick}
                                >
                                    <Camera className="w-4 h-4" />
                                </div>
                                {previewImage && (
                                    <div
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 cursor-pointer hover:bg-red-600 transition-colors shadow-lg"
                                        onClick={removeImage}
                                    >
                                        <X className="w-3 h-3" />
                                    </div>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <div className="text-center">
                                <p className="text-sm font-medium text-violet-900 dark:text-violet-100">
                                    📸 Profile Picture
                                </p>
                                <p className="text-xs text-violet-700 dark:text-violet-300 mt-1">
                                    Click to upload a new photo
                                </p>
                            </div>
                        </div>

                        {/* Basic Information Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-violet-200 dark:border-violet-800">
                                <User className="w-5 h-5 text-violet-500" />
                                <h3 className="font-semibold text-lg">Basic Information</h3>
                            </div>

                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">👤 Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John Doe"
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
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">📝 Bio</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us about yourself and your travel experiences..."
                                                className="resize-none border-violet-200 focus:border-violet-500 focus:ring-violet-500"
                                                rows={3}
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="currentLocation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">📍 Current Location</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="New York, USA"
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

                        {/* Travel Preferences Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-violet-200 dark:border-violet-800">
                                <MapPin className="w-5 h-5 text-violet-500" />
                                <h3 className="font-semibold text-lg">Travel Preferences</h3>
                            </div>

                            <FormField
                                control={form.control}
                                name="interests"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">🎯 Interests</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="hiking, food tours, photography, museums..."
                                                {...field}
                                                disabled={isPending}
                                                className="border-violet-200 focus:border-violet-500 focus:ring-violet-500"
                                            />
                                        </FormControl>
                                        <p className="text-xs text-muted-foreground">Separate with commas</p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="visitedCountries"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">🌍 Visited Countries</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="France, Japan, Italy, Spain..."
                                                {...field}
                                                disabled={isPending}
                                                className="border-violet-200 focus:border-violet-500 focus:ring-violet-500"
                                            />
                                        </FormControl>
                                        <p className="text-xs text-muted-foreground">Separate with commas</p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {errorMessage && (
                            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm p-4 rounded-lg flex items-start gap-2">
                                <span className="text-lg">⚠️</span>
                                <span>{errorMessage}</span>
                            </div>
                        )}

                        <div className="flex gap-3 justify-end pt-4 border-t border-violet-100 dark:border-violet-900">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                disabled={isPending}
                                className="border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        ✨ Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
