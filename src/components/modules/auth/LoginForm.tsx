"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useLogin } from "@/hooks/mutations/useLogin";
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
import { Plane, Loader2, Users, MapPin, Star } from "lucide-react";
import { AxiosError } from "axios";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const { mutate: login, isPending, error } = useLogin();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: LoginFormValues) => {
        login(data);
    };

    const errorMessage = error instanceof AxiosError
        ? (error.response?.data as { message?: string })?.message || "Login failed. Please try again."
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
                        <h1 className="text-h2 mb-2">Welcome Back</h1>
                        <p className="text-muted-foreground">
                            Sign in to your account to continue your journey
                        </p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                            {errorMessage && (
                                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
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
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-4 text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-primary hover:underline font-medium">
                            Register
                        </Link>
                    </div>
                </div>

                {/* Right Panel - Benefits */}
                <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 p-8 md:p-12 text-white">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

                    <div className="relative z-10 h-full flex flex-col justify-center">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold mb-4">Join 10,000+ Travelers</h2>
                            <p className="text-violet-100 text-lg">
                                Connect with like-minded adventurers and explore the world together
                            </p>
                        </div>

                        <Separator className="my-8 bg-white/20" />

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Find Travel Buddies</h3>
                                    <p className="text-violet-100">Connect with verified travelers worldwide</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">85+ Countries</h3>
                                    <p className="text-violet-100">Explore destinations around the globe</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm">
                                    <Star className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Verified Reviews</h3>
                                    <p className="text-violet-100">Read authentic experiences from real travelers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
