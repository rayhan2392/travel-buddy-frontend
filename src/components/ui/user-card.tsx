import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Star } from "lucide-react";
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
            <Card className={cn("hover:elevation-md transition-shadow", className)}>
                <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                            <AvatarImage src={user.profilePicture} alt={user.name} />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold truncate">{user.name}</h4>
                            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                        </div>
                        {onViewProfile && (
                            <Button size="sm" variant="ghost" onClick={() => onViewProfile(user.id)}>
                                View
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={cn("hover:elevation-md transition-shadow", className)}>
            <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-4">
                    <Avatar className="w-20 h-20 mb-3">
                        <AvatarImage src={user.profilePicture} alt={user.name} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 mb-3">
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        {user.role && (
                            <Badge variant={user.role === "admin" ? "default" : "secondary"} className="capitalize">
                                {user.role}
                            </Badge>
                        )}
                    </div>
                    {user.bio && variant === "detailed" && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{user.bio}</p>
                    )}
                </div>

                <div className="space-y-2 mb-4">
                    {user.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{user.location}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{user.email}</span>
                    </div>
                    {user.rating && (
                        <div className="flex items-center gap-2 text-sm">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="font-medium">{user.rating.toFixed(1)}</span>
                        </div>
                    )}
                </div>

                <div className="flex gap-2">
                    {onViewProfile && (
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => onViewProfile(user.id)}
                        >
                            View Profile
                        </Button>
                    )}
                    {onSendMessage && (
                        <Button
                            className="flex-1"
                            onClick={() => onSendMessage(user.id)}
                        >
                            <Mail className="w-4 h-4 mr-2" />
                            Message
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
