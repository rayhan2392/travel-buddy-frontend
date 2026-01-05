import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { MapPin, Mail, Star, Eye, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserCardProps {
    user: {
        id: string;
        name: string;
        email: string;
        profilePicture?: string;
        bio?: string;
        location?: string;
        rating?: number;
        role?: string;
        isVerified?: boolean;
    };
    onViewProfile?: (id: string) => void;
    onSendMessage?: (id: string) => void;
    className?: string;
    variant?: "default" | "compact" | "detailed";
}

export function UserCard({
    user,
    onViewProfile,
    onSendMessage,
    className,
    variant = "default",
}: UserCardProps) {
    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    if (variant === "compact") {
        return (
            <Card className={cn("group bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-violet-300 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1", className)}>
                <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Avatar className="w-14 h-14 ring-2 ring-white shadow-md group-hover:ring-violet-400 transition-all duration-300">
                                <AvatarImage src={user.profilePicture} alt={user.name} />
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white font-bold text-lg">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            {user.isVerified && (
                                <div className="absolute -bottom-1 -right-1">
                                    <VerifiedBadge size="sm" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 truncate group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-violet-600 group-hover:bg-clip-text transition-all duration-300">
                                {user.name}
                            </h4>
                            <p className="text-sm text-gray-600 truncate">{user.email}</p>
                        </div>
                        {onViewProfile && (
                            <Button
                                size="sm"
                                variant="ghost"
                                className="hover:bg-violet-50 hover:text-violet-700 font-semibold"
                                onClick={() => onViewProfile(user.id)}
                            >
                                View
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={cn("group bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-violet-300 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden", className)}>
            {/* Gradient top border */}
            <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 group-hover:h-3 transition-all duration-300" />

            <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="relative mb-4">
                        <Avatar className="w-24 h-24 ring-4 ring-white shadow-xl group-hover:ring-violet-300 transition-all duration-300 group-hover:scale-110">
                            <AvatarImage src={user.profilePicture} alt={user.name} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white text-2xl font-bold">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        {user.isVerified && (
                            <div className="absolute -bottom-2 -right-2">
                                <VerifiedBadge size="md" />
                            </div>
                        )}
                    </div>

                    <div className="space-y-2 mb-4 w-full">
                        <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-violet-600 group-hover:bg-clip-text transition-all duration-300">
                            {user.name}
                        </h3>
                        {user.role && (
                            <Badge
                                className={cn(
                                    "capitalize font-semibold px-3 py-1",
                                    user.role === "admin"
                                        ? "bg-gradient-to-r from-red-500 to-pink-500 text-white border-0"
                                        : "bg-gradient-to-r from-blue-100 to-violet-100 text-violet-700 border-2 border-violet-200"
                                )}
                            >
                                {user.role}
                            </Badge>
                        )}
                    </div>

                    {user.bio && variant === "detailed" && (
                        <div className="w-full mb-4">
                            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed italic bg-gradient-to-br from-gray-50 to-violet-50 p-3 rounded-lg border border-gray-200">
                                &ldquo;{user.bio}&rdquo;
                            </p>
                        </div>
                    )}
                </div>

                <div className="space-y-3 mb-6">
                    {user.location && (
                        <div className="flex items-center gap-3 text-sm bg-violet-50 p-3 rounded-lg border border-violet-200">
                            <MapPin className="w-5 h-5 text-violet-600 flex-shrink-0" />
                            <span className="font-medium text-gray-900">{user.location}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-3 text-sm bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="truncate font-medium text-gray-900">{user.email}</span>
                    </div>
                    {user.rating && (
                        <div className="flex items-center gap-3 text-sm bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                            <Star className="w-5 h-5 fill-yellow-500 text-yellow-500 flex-shrink-0" />
                            <span className="font-bold text-gray-900">{user.rating.toFixed(1)} / 5.0</span>
                        </div>
                    )}
                </div>

                <div className="flex gap-3">
                    {onViewProfile && (
                        <Button
                            variant="outline"
                            className="flex-1 border-2 border-violet-300 text-violet-700 hover:bg-violet-600 hover:text-white hover:border-violet-600 font-bold transition-all duration-200 group/btn"
                            onClick={() => onViewProfile(user.id)}
                        >
                            <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
                            View Profile
                        </Button>
                    )}
                    {onSendMessage && (
                        <Button
                            className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-bold shadow-md hover:shadow-lg transition-all duration-200 group/btn"
                            onClick={() => onSendMessage(user.id)}
                        >
                            <MessageCircle className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
                            Message
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
