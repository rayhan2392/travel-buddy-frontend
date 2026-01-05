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
    Crown,
    FileText
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
        <nav className="sticky top-0 z-50 w-full border-b border-violet-200 bg-gradient-to-r from-blue-200 via-purple-100 to-violet-200 backdrop-blur-xl shadow-xl shadow-purple-300/60">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center space-x-3 group transition-transform hover:scale-105 duration-300"
                    >
                        <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                            <Plane className="w-6 h-6 text-white transform -rotate-45" />
                            <div className="absolute inset-0 rounded-2xl bg-white/20 group-hover:bg-white/30 transition-all duration-300" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                Travel Buddy
                            </span>
                            <span className="text-xs text-gray-500 -mt-1">Find Your Adventure</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-3">
                        <Link href="/explore">
                            <Button
                                variant="outline"
                                className="text-base font-semibold border-2 border-blue-300 bg-white/80 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 group shadow-sm hover:shadow-md"
                            >
                                <Compass className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                                Explore
                            </Button>
                        </Link>
                        <Link href="/find-buddy">
                            <Button
                                variant="outline"
                                className="text-base font-semibold border-2 border-violet-300 bg-white/80 hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all duration-200 group shadow-sm hover:shadow-md"
                            >
                                <User className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                                Find Buddy
                            </Button>
                        </Link>

                        {!isAuthenticated ? (
                            <Link href="/login">
                                <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 px-6">
                                    Login
                                </Button>
                            </Link>
                        ) : (
                            <>
                                {!user?.isVerified && user?.role !== "admin" && (
                                    <Link href="/pricing">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-600 font-semibold transition-all duration-200 group"
                                        >
                                            <Crown className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                                            Get Verified
                                        </Button>
                                    </Link>
                                )}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="relative h-12 w-12 rounded-full hover:ring-2 hover:ring-blue-400 hover:ring-offset-2 transition-all duration-200"
                                        >
                                            <Avatar className="h-12 w-12 ring-2 ring-white shadow-md">
                                                <AvatarImage src={user?.profileImage} alt={user?.fullName} />
                                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white font-semibold">
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
                                    <DropdownMenuContent className="w-72 bg-white/95 backdrop-blur-xl border-2 border-gray-200 shadow-2xl rounded-2xl p-2" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal p-0 mb-2">
                                            <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl border border-gray-200">
                                                <Avatar className="h-14 w-14 ring-2 ring-white shadow-md">
                                                    <AvatarImage src={user?.profileImage} alt={user?.fullName} />
                                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white font-bold text-lg">
                                                        {getUserInitials()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-bold text-gray-900 flex items-center gap-1.5 truncate">
                                                        {user?.fullName}
                                                        {user?.isVerified && <VerifiedBadge size="sm" />}
                                                    </div>
                                                    <p className="text-xs text-gray-600 truncate">
                                                        {user?.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-gray-200 my-2" />
                                        {user?.role === "admin" ? (
                                            <>
                                                <DropdownMenuItem asChild className="rounded-lg p-3 cursor-pointer hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group">
                                                    <Link href="/admin/dashboard">
                                                        <LayoutDashboard className="mr-3 h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                                                        <span className="font-medium">Admin Dashboard</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild className="rounded-lg p-3 cursor-pointer hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 group">
                                                    <Link href="/admin/users">
                                                        <User className="mr-3 h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform duration-200" />
                                                        <span className="font-medium">Manage Users</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild className="rounded-lg p-3 cursor-pointer hover:bg-violet-50 hover:text-violet-700 transition-all duration-200 group">
                                                    <Link href="/admin/travel-plans">
                                                        <Plane className="mr-3 h-5 w-5 text-violet-600 group-hover:scale-110 transition-transform duration-200" />
                                                        <span className="font-medium">Manage Travel Plans</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                            </>
                                        ) : (
                                            <>
                                                <DropdownMenuItem asChild className="rounded-lg p-3 cursor-pointer hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group">
                                                    <Link href="/profile">
                                                        <User className="mr-3 h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                                                        <span className="font-medium">My Profile</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild className="rounded-lg p-3 cursor-pointer hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 group">
                                                    <Link href="/my-plans">
                                                        <Plane className="mr-3 h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform duration-200" />
                                                        <span className="font-medium">My Plans</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild className="rounded-lg p-3 cursor-pointer hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 group">
                                                    <Link href="/my-requests">
                                                        <FileText className="mr-3 h-5 w-5 text-indigo-600 group-hover:scale-110 transition-transform duration-200" />
                                                        <span className="font-medium">My Requests</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild className="rounded-lg p-3 cursor-pointer hover:bg-green-50 hover:text-green-700 transition-all duration-200 group">
                                                    <Link href="/upcoming-trips">
                                                        <Plane className="mr-3 h-5 w-5 text-green-600 group-hover:scale-110 transition-transform duration-200" />
                                                        <span className="font-medium">Upcoming Trips</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild className="rounded-lg p-3 cursor-pointer hover:bg-orange-50 hover:text-orange-700 transition-all duration-200 group">
                                                    <Link href="/past-trips">
                                                        <Plane className="mr-3 h-5 w-5 text-orange-600 group-hover:scale-110 transition-transform duration-200" />
                                                        <span className="font-medium">Past Trips</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild className="rounded-lg p-3 cursor-pointer hover:bg-yellow-50 hover:text-yellow-700 transition-all duration-200 group">
                                                    <Link href="/reviews">
                                                        <Star className="mr-3 h-5 w-5 text-yellow-600 group-hover:scale-110 transition-transform duration-200" />
                                                        <span className="font-medium">Reviews</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild className="rounded-lg p-3 cursor-pointer hover:bg-violet-50 hover:text-violet-700 transition-all duration-200 group">
                                                    <Link href="/dashboard">
                                                        <LayoutDashboard className="mr-3 h-5 w-5 text-violet-600 group-hover:scale-110 transition-transform duration-200" />
                                                        <span className="font-medium">Dashboard</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                        <DropdownMenuSeparator className="bg-gray-200 my-2" />
                                        {!user?.isVerified && user?.role !== "admin" && (
                                            <>
                                                <DropdownMenuItem asChild className="rounded-lg p-3 cursor-pointer bg-gradient-to-r from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 border-2 border-yellow-300 transition-all duration-200 group mb-2">
                                                    <Link href="/pricing">
                                                        <Crown className="mr-3 h-5 w-5 text-yellow-600 group-hover:scale-110 transition-transform duration-200" />
                                                        <span className="font-bold text-yellow-700">Get Verified</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                        <DropdownMenuItem
                                            className="rounded-lg p-3 cursor-pointer hover:bg-red-50 text-red-600 hover:text-red-700 font-medium transition-all duration-200 group"
                                            onClick={handleLogout}
                                        >
                                            <LogOut className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
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
                        className="md:hidden p-2.5 rounded-xl hover:bg-blue-50 transition-all duration-200 group"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6 text-gray-700 group-hover:text-blue-600 group-hover:rotate-90 transition-all duration-300" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors duration-200" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-6 space-y-3 border-t bg-white/95 animate-in slide-in-from-top-2 duration-300 rounded-b-2xl shadow-lg">
                        <Link href="/explore" onClick={toggleMobileMenu}>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-base font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                            >
                                <Compass className="w-5 h-5 mr-3" />
                                Explore
                            </Button>
                        </Link>
                        <Link href="/find-buddy" onClick={toggleMobileMenu}>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-base font-medium hover:bg-violet-50 hover:text-violet-600 transition-all duration-200"
                            >
                                <User className="w-5 h-5 mr-3" />
                                Find Buddy
                            </Button>
                        </Link>

                        {!isAuthenticated ? (
                            <Link href="/login" onClick={toggleMobileMenu}>
                                <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                                    Login
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl mx-3">
                                    <div className="text-sm font-semibold flex items-center gap-2 text-gray-900">
                                        {user?.fullName}
                                        {user?.isVerified && <VerifiedBadge size="sm" />}
                                    </div>
                                    <p className="text-xs text-gray-600 mt-0.5">{user?.email}</p>
                                </div>
                                {!user?.isVerified && (
                                    <Link href="/pricing" onClick={toggleMobileMenu}>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-semibold"
                                        >
                                            <Crown className="w-5 h-5 mr-3" />
                                            Get Verified
                                        </Button>
                                    </Link>
                                )}
                                <Link href="/profile" onClick={toggleMobileMenu}>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start text-base font-medium hover:bg-gray-100 transition-all duration-200"
                                    >
                                        <User className="w-5 h-5 mr-3" />
                                        My Profile
                                    </Button>
                                </Link>
                                <Link href="/reviews" onClick={toggleMobileMenu}>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start text-base font-medium hover:bg-gray-100 transition-all duration-200"
                                    >
                                        <Star className="w-5 h-5 mr-3" />
                                        Reviews
                                    </Button>
                                </Link>
                                <Link href="/dashboard" onClick={toggleMobileMenu}>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start text-base font-medium hover:bg-gray-100 transition-all duration-200"
                                    >
                                        <LayoutDashboard className="w-5 h-5 mr-3" />
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
                                    onClick={() => {
                                        toggleMobileMenu();
                                        handleLogout();
                                    }}
                                >
                                    <LogOut className="w-5 h-5 mr-3" />
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