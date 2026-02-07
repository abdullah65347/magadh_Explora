import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Sparkles,
    Users,
    Calendar,
    MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
    {
        icon: MapPin,
        title: "Choose Destinations",
        description: "Pick from 15+ historic destinations across Bihar",
    },
    {
        icon: Calendar,
        title: "Set Your Duration",
        description: "Flexible 1 to N day trips, no fixed limits",
    },
    {
        icon: Users,
        title: "Select Traveler Type",
        description: "Solo, couple, family, school, or corporate",
    },
    {
        icon: Sparkles,
        title: "Customize Everything",
        description: "Meals, hotels, activities, special experiences",
    },
];

export function DynamicPackageBuilder() {
    return (
        <section className="py-24 px-4">
            <div className="mx-auto max-w-7xl">
                <div className="relative overflow-hidden rounded-3xl bg-espresso p-8 md:p-16 shadow-large">

                    {/* Decorative glows */}
                    <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />

                    <div className="relative">
                        {/* Header */}
                        <div className="text-center">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
                                <Sparkles className="h-3.5 w-3.5 text-primary" />
                                Dynamic Package Builder
                            </span>

                            <h2 className="mt-4 font-serif text-3xl font-bold text-white md:text-4xl lg:text-5xl text-balance">
                                Build Your Perfect Trip
                            </h2>

                            <p className="mx-auto mt-3 max-w-xl text-base text-white/80">
                                Our dynamic package builder lets you create a fully customized
                                travel experience with real-time pricing.
                            </p>
                        </div>

                        {/* Steps */}
                        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {steps.map((step, i) => (
                                <div
                                    key={step.title}
                                    className="flex flex-col items-center text-center"
                                >
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                                        <step.icon className="h-6 w-6 text-primary" />
                                    </div>

                                    <div className="mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                        {i + 1}
                                    </div>

                                    <h3 className="mt-4 font-serif text-lg font-semibold text-white">
                                        {step.title}
                                    </h3>

                                    <p className="mt-1 text-sm text-white/75">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-16 text-center">
                            <Button
                                asChild
                                size="lg"
                                className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 text-base shadow-glow"
                            >
                                <Link to="/builder">
                                    Start Building
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
