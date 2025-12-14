import { EmptyState } from "@/components/ui/empty-state";
import { H1, BodyLarge } from "@/components/ui/typography";
import { Star } from "lucide-react";

export default function ReviewsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <H1 className="text-gradient-primary mb-2">Reviews</H1>
                    <BodyLarge className="text-muted-foreground">
                        View reviews from your travel companions
                    </BodyLarge>
                </div>

                <EmptyState
                    icon={Star}
                    title="Reviews Coming Soon"
                    description="This feature will allow you to view all reviews from your travel companions"
                />
            </div>
        </div>
    );
}
