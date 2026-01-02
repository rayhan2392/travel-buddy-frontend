"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import {
    Plane,
    Menu,
    X,
    User,
    LogOut,
    LayoutDashboard,
    Star,
    Compass,
    Crown
} from "lucide-react";

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const router = useRouter();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    const getUserInitials = () => {
        if (!user?.fullName) return "U";
        return user.fullName.charAt(0).toUpperCase();
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
                            <Plane className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold text-foreground">Travel Buddy</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/explore">
                            <Button variant="ghost" className="text-base">
                                <Compass className="w-4 h-4 mr-2" />
                                Explore Travelers
                            </Button>
                        </Link>
                        <Link href="/find-buddy">
                            <Button variant="ghost" className="text-base">
                                <User className="w-4 h-4 mr-2" />
                                Find My Buddy
                            </Button>
                        </Link>

                        {!isAuthenticated ? (
                            <Link href="/login">
                                <Button>
                                    Login
                                </Button>
                            </Link>
                        ) : (
                            <>
                                {!user?.isVerified && (
                                    <Link href="/pricing">
                                        <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                                            <Crown className="w-4 h-4 mr-2" />
                                            Get Verified
                                        </Button>
                                    </Link>
                                )}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={user?.profileImage} alt={user?.fullName} />
                                                <AvatarFallback className="bg-primary text-primary-foreground">
                                                    {getUserInitials()}
                                                </AvatarFallback>
                                            </Avatar>
                                            {user?.isVerified && (
                                                <div className="absolute -bottom-0.5 -right-0.5">
                                                    <VerifiedBadge size="sm" showTooltip={false} />
                                                </div>
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none flex items-center gap-1.5">
                                                    {user?.fullName}
                                                    {user?.isVerified && <VerifiedBadge size="sm" />}
                                                </p>
                                                <p className="text-xs leading-none text-muted-foreground">
                                                    {user?.email}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {user?.role === "admin" ? (
                                            <>
                                                <DropdownMenuItem asChild>
                                                    <Link href="/admin/dashboard" className="cursor-pointer">
                                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                                        <span>Admin Dashboard</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href="/admin/users" className="cursor-pointer">
                                                        <User className="mr-2 h-4 w-4" />
                                                        <span>Manage Users</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href="/admin/travel-plans" className="cursor-pointer">
                                                        <Plane className="mr-2 h-4 w-4" />
                                                        <span>Manage Travel Plans</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                            </>
                                        ) : (
                                            <>
                                                <DropdownMenuItem asChild>
                                                    <Link href="/profile" className="cursor-pointer">
                                                        <User className="mr-2 h-4 w-4" />
                                                        <span>My Profile</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href="/my-plans" className="cursor-pointer">
                                                        <Plane className="mr-2 h-4 w-4" />
                                                        <span>My Plans</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href="/upcoming-trips" className="cursor-pointer">
                                                        <Plane className="mr-2 h-4 w-4" />
                                                        <span>Upcoming Trips</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href="/past-trips" className="cursor-pointer">
                                                        <Plane className="mr-2 h-4 w-4" />
                                                        <span>Past Trips</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href="/reviews" className="cursor-pointer">
                                                        <Star className="mr-2 h-4 w-4" />
                                                        <span>Reviews</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href="/dashboard" className="cursor-pointer">
                                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                                        <span>Dashboard</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                        <DropdownMenuSeparator />
                                        {!user?.isVerified && (
                                            <>
                                                <DropdownMenuItem asChild>
                                                    <Link href="/pricing" className="cursor-pointer text-primary font-medium">
                                                        <Crown className="mr-2 h-4 w-4" />
                                                        <span>Get Verified</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                            </>
                                        )}
                                        <DropdownMenuItem
                                            className="cursor-pointer text-destructive focus:text-destructive"
                                            onClick={handleLogout}
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Logout</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-2 border-t animate-in slide-in-from-top-2 duration-200">
                        <Link href="/explore" onClick={toggleMobileMenu}>
                            <Button variant="ghost" className="w-full justify-start text-base">
                                <Compass className="w-4 h-4 mr-2" />
                                Explore Travelers
                            </Button>
                        </Link>

                        {!isAuthenticated ? (
                            <Link href="/login" onClick={toggleMobileMenu}>
                                <Button className="w-full">
                                    Login
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <div className="px-3 py-2 border-b">
                                    <p className="text-sm font-medium flex items-center gap-1.5">
                                        {user?.fullName}
                                        {user?.isVerified && <VerifiedBadge size="sm" />}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                                </div>
                                {!user?.isVerified && (
                                    <Link href="/pricing" onClick={toggleMobileMenu}>
                                        <Button variant="outline" className="w-full justify-start border-primary text-primary">
                                            <Crown className="w-4 h-4 mr-2" />
                                            Get Verified
                                        </Button>
                                    </Link>
                                )}
                                <Link href="/profile" onClick={toggleMobileMenu}>
                                    <Button variant="ghost" className="w-full justify-start text-base">
                                        <User className="w-4 h-4 mr-2" />
                                        My Profile
                                    </Button>
                                </Link>
                                <Link href="/reviews" onClick={toggleMobileMenu}>
                                    <Button variant="ghost" className="w-full justify-start text-base">
                                        <Star className="w-4 h-4 mr-2" />
                                        Reviews
                                    </Button>
                                </Link>
                                <Link href="/dashboard" onClick={toggleMobileMenu}>
                                    <Button variant="ghost" className="w-full justify-start text-base">
                                        <LayoutDashboard className="w-4 h-4 mr-2" />
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-base text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={() => {
                                        toggleMobileMenu();
                                        handleLogout();
                                    }}
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </Button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}