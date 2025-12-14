"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRegister } from "@/hooks/mutations/useRegister";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Plane, Loader2, Shield, Heart, Globe } from "lucide-react";
import { AxiosError } from "axios";

const registerSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
    const { mutate: register, isPending, error } = useRegister();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: RegisterFormValues) => {
        register(data);
    };

    const errorMessage = error instanceof AxiosError
        ? error.response?.data?.message || "Registration failed. Please try again."
        : null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-violet-950 dark:to-background p-4">
            <div className="w-full max-w-5xl grid md:grid-cols-2 gap-0 elevation-xl rounded-2xl overflow-hidden bg-card">
                {/* Left Panel - Form */}
                <div className="p-8 md:p-12">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
                                <Plane className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold text-gradient-primary">Travel Buddy</span>
                        </div>
                        <h1 className="text-h2 mb-2">Create an account</h1>
                        <p className="text-muted-foreground">
                            Enter your details to start your travel journey
                        </p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John Doe"
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="john@example.com"
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="••••••••"
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
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="••••••••"
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {errorMessage && (
                                <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 p-3 rounded-lg">
                                    {errorMessage}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full elevation-sm hover:elevation-md bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
                                size="lg"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-6">
                        <Separator />
                    </div>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-muted-foreground">Already have an account? </span>
                        <Link href="/login" className="text-primary hover:underline font-semibold">
                            Sign in
                        </Link>
                    </div>
                </div>

                {/* Right Panel - Benefits */}
                <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 text-white">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-h3 mb-3">Start Your Adventure</h2>
                            <p className="text-violet-100 text-body">
                                Join our community of travelers and discover the world together.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/10 backdrop-blur">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Safe & Secure</h3>
                                    <p className="text-sm text-violet-100">Verified users and secure payments for peace of mind</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/10 backdrop-blur">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
                                    <Heart className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Build Connections</h3>
                                    <p className="text-sm text-violet-100">Make lasting friendships with travelers worldwide</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/10 backdrop-blur">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Global Community</h3>
                                    <p className="text-sm text-violet-100">Connect with travelers in 85+ countries</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
