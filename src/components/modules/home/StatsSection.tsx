interface Stat {
    number: string;
    label: string;
}

const stats: Stat[] = [
    { number: "10,000+", label: "Active Travelers" },
    { number: "85+", label: "Countries Covered" },
    { number: "5,000+", label: "Successful Matches" },
    { number: "4.8/5", label: "Average Rating" }
];

export function StatsSection() {
    return (
        <section className="section-padding-sm bg-background">
            <div className="container-wide px-4">
                <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="space-y-3 p-6 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="text-h1 text-gradient-primary">{stat.number}</div>
                            <div className="text-body text-muted-foreground font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
