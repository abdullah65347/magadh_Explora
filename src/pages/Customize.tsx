import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { calculatePrice } from "@/lib/pricing";
import { SoloIcon, CoupleIcon, FamilyIcon, SchoolIcon, CollegeIcon, CorporateIcon } from "@/assets/assets";
import {
  Users,
  Calendar,
  Hotel,
  Utensils,
  MapPin,
  Plus,
  Minus,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

import bodhGayaImg from "@/assets/bodh-gaya.jpg";
import rajgirImg from "@/assets/rajgir.jpg";
import pawapuriImg from "@/assets/pawapuri.jpg";
import nalandaImg from "@/assets/nalanda.jpg";
import { BookingModal } from "@/components/BookingModal";
import { customizeCover } from "@/assets/assets";

const destinations = [
  { id: "bodh-gaya", name: "Bodh Gaya", image: bodhGayaImg, minDays: 1, suggestedDays: 2 },
  { id: "rajgir", name: "Rajgir", image: rajgirImg, minDays: 1, suggestedDays: 2 },
  { id: "nalanda", name: "Nalanda", image: nalandaImg, minDays: 1, suggestedDays: 1 },
  { id: "pawapuri", name: "Pawapuri", image: pawapuriImg, minDays: 1, suggestedDays: 1 },
  { id: "vaishali", name: "Vaishali", image: bodhGayaImg, minDays: 1, suggestedDays: 1 },
  { id: "kesariya", name: "Kesariya", image: rajgirImg, minDays: 1, suggestedDays: 1 },
];

const travelerTypes = [
  { id: "solo", name: "Solo Traveler", icon: SoloIcon, multiplier: 1.8 },
  { id: "couple", name: "Couple", icon: CoupleIcon, multiplier: 2.0 },
  { id: "family", name: "Family", icon: FamilyIcon, multiplier: 3.5 },
  { id: "school", name: "School Group", icon: SchoolIcon, multiplier: 6.0 },
  { id: "college", name: "College Group", icon: CollegeIcon, multiplier: 6.0 },
  { id: "corporate", name: "Corporate", icon: CorporateIcon, multiplier: 4.0 },
];

const packageTypes = [
  {
    id: "essential",
    name: "Essential",
    multiplier: 1.0,
    features: ["Budget hotels (2-3 star)", "Basic transportation", "Standard guide (optional)"],
    color: "secondary"
  },
  {
    id: "premium",
    name: "Premium",
    multiplier: 2.5,
    features: ["Luxury hotels (4-5 star)", "Premium transportation", "Expert multilingual guide", "All meals included", "VIP experiences"],
    color: "primary"
  },
];

const mealOptions = [
  { id: "none", name: "No Meals", multiplier: 0 },
  { id: "breakfast", name: "Breakfast Only", multiplier: 0.15 },
  { id: "half", name: "Half Board (2 meals)", multiplier: 0.30 },
  { id: "full", name: "Full Board (3 meals)", multiplier: 0.50 },
];

const activities = [
  { id: "meditation", name: "Meditation Session", price: 1500 },
  { id: "cooking", name: "Cooking Workshop", price: 2000 },
  { id: "photography", name: "Photography Tour", price: 2500 },
  { id: "spa", name: "Spa & Wellness", price: 3500 },
  { id: "adventure", name: "Adventure Activities", price: 3000 },
  { id: "cultural", name: "Cultural Show", price: 1500 },
];

const BASE_RATE = 5000; // Per day base rate

export default function CustomizePage() {
  const [step, setStep] = useState(1);
  const [selectedDestinations, setSelectedDestinations] = useState<{ id: string; days: number }[]>([]);
  const [travelerType, setTravelerType] = useState("couple");
  const [travelerCount, setTravelerCount] = useState(2);
  const [packageType, setPackageType] = useState("essential");
  const [mealOption, setMealOption] = useState("none");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const builderRef = useRef<HTMLDivElement>(null);

  const totalDays = selectedDestinations.reduce((acc, d) => acc + d.days, 0);

  const pricing = useMemo(() => {
    return calculatePrice({
      destinations: selectedDestinations,
      travelerType,
      travelerCount,
      packageType,
      mealOption,
      activities: selectedActivities,
    });
  }, [
    selectedDestinations,
    travelerType,
    travelerCount,
    packageType,
    mealOption,
    selectedActivities,
  ]);

  const toggleDestination = (destId: string) => {
    setSelectedDestinations(prev => {
      const exists = prev.find(d => d.id === destId);
      if (exists) {
        return prev.filter(d => d.id !== destId);
      }
      const dest = destinations.find(d => d.id === destId);
      return [...prev, { id: destId, days: dest?.suggestedDays || 1 }];
    });
  };

  const updateDays = (destId: string, change: number) => {
    setSelectedDestinations(prev =>
      prev.map(d => {
        if (d.id === destId) {
          const dest = destinations.find(dest => dest.id === destId);
          const newDays = Math.max(dest?.minDays || 1, d.days + change);
          return { ...d, days: newDays };
        }
        return d;
      })
    );
  };

  const toggleActivity = (actId: string) => {
    setSelectedActivities(prev =>
      prev.includes(actId)
        ? prev.filter(a => a !== actId)
        : [...prev, actId]
    );
  };

  useEffect(() => {
    if (builderRef.current) {
      const headerOffset = 145;
      const elementPosition = builderRef.current.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [step]);

  useEffect(() => {
    if (travelerType === "solo") {
      setTravelerCount(1);
    } else if (travelerType === "couple") {
      setTravelerCount(2);
    }
  }, [travelerType]);

  const isFixedCount =
    travelerType === "solo" || travelerType === "couple";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${customizeCover})` }}
        />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center py-12"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Custom Package Builder
            </h1>
            <p className="text-white text-lg">
              Create your perfect Bihar travel experience with our dynamic package builder
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-6 border-b border-border sticky top-16 bg-background z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {[
              { num: 1, label: "Destinations" },
              { num: 2, label: "Travelers" },
              { num: 3, label: "Package" },
              { num: 4, label: "Activities" },
              { num: 5, label: "Review" },
            ].map((s) => {
              const isDisabled =
                s.num > 1 && selectedDestinations.length === 0;

              return (
                <button
                  key={s.num}
                  onClick={() => {
                    if (!isDisabled) {
                      setStep(s.num);
                    }
                  }}
                  disabled={isDisabled}
                  className={cn(
                    "flex items-center gap-2",
                    isDisabled && "cursor-not-allowed opacity-50"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                      step >= s.num
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                  </div>

                  <span
                    className={cn(
                      "hidden md:inline text-sm font-medium",
                      step >= s.num
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}

          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Builder Steps */}
          <div ref={builderRef} className="lg:col-span-2">
            {/* Step 1: Destinations */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Select Your Destinations
                </h2>
                <p className="text-muted-foreground mb-6">
                  Choose the places you want to visit and set the number of days for each
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {destinations.map((dest) => {
                    const selected = selectedDestinations.find(d => d.id === dest.id);
                    return (
                      <div
                        key={dest.id}
                        className={cn(
                          "relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer",
                          selected
                            ? "border-primary shadow-medium"
                            : "border-transparent shadow-soft hover:shadow-medium"
                        )}
                        onClick={() => toggleDestination(dest.id)}
                      >
                        <div className="relative h-32">
                          <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                          <div className="absolute bottom-3 left-3">
                            <h3 className="font-display font-semibold text-primary-foreground">{dest.name}</h3>
                          </div>
                          {selected && (
                            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                              <Check className="w-4 h-4 text-primary-foreground" />
                            </div>
                          )}
                        </div>

                        {selected && (
                          <div className="p-3 bg-card" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Days</span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateDays(dest.id, -1)}
                                  className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-semibold">{selected.days}</span>
                                <button
                                  onClick={() => updateDays(dest.id, 1)}
                                  className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Travelers */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Who's Traveling?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Select your travel group type and the number of travelers
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {travelerTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setTravelerType(type.id)}
                      className={cn(
                        "p-4 rounded-xl border-2 text-left transition-all",
                        travelerType === type.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <span className="text-3xl mb-2 block">
                        <img
                          src={type.icon}
                          alt={type.name}
                          className="w-10 h-10 object-contain"
                        />
                      </span>
                      <span className="font-semibold text-foreground">{type.name}</span>
                    </button>
                  ))}
                </div>

                <div className="bg-card p-6 rounded-xl">
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Number of Travelers
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        setTravelerCount((prev) => Math.max(1, prev - 1))
                      }
                      disabled={isFixedCount || travelerCount === 1}
                      className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-5 h-5" />
                    </button>

                    <span className="text-3xl font-bold text-foreground w-16 text-center">
                      {travelerCount}
                    </span>

                    <button
                      onClick={() =>
                        setTravelerCount((prev) => Math.min(20, prev + 1))
                      }
                      disabled={isFixedCount || travelerCount === 20}
                      className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  `

                </div>
              </motion.div>
            )}

            {/* Step 3: Package Type */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Choose Your Package
                </h2>
                <p className="text-muted-foreground mb-6">
                  Select your preferred package type and meal options
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {packageTypes.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setPackageType(pkg.id)}
                      className={cn(
                        "p-6 rounded-xl border-2 text-left transition-all",
                        packageType === pkg.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display text-xl font-bold text-foreground">{pkg.name}</h3>
                        {packageType === pkg.id && (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>

                <div className="bg-card p-6 rounded-xl">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Utensils className="w-5 h-5" />
                    Meal Options
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {mealOptions.map((meal) => (
                      <button
                        key={meal.id}
                        onClick={() => setMealOption(meal.id)}
                        className={cn(
                          "p-3 rounded-lg border-2 text-left transition-all",
                          mealOption === meal.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <span className="font-medium text-foreground">{meal.name}</span>
                        {meal.multiplier > 0 && (
                          <span className="text-xs text-muted-foreground ml-2">
                            +{meal.multiplier * 100}%
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Activities */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Add Activities
                </h2>
                <p className="text-muted-foreground mb-6">
                  Enhance your trip with special activities and experiences
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {activities.map((activity) => {
                    const isSelected = selectedActivities.includes(activity.id);
                    return (
                      <button
                        key={activity.id}
                        onClick={() => toggleActivity(activity.id)}
                        className={cn(
                          "p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between",
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div>
                          <span className="font-medium text-foreground block">{activity.name}</span>
                          <span className="text-sm text-primary font-semibold">
                            ₹{activity.price.toLocaleString()} / person
                          </span>
                        </div>
                        <div className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                          isSelected ? "bg-primary border-primary" : "border-muted-foreground"
                        )}>
                          {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 5: Review */}
            {step === 5 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Review Your Package
                </h2>
                <p className="text-muted-foreground mb-6">
                  Review your customized package before proceeding to book
                </p>

                <div className="space-y-6">
                  {/* Destinations Summary */}
                  <div className="bg-card p-6 rounded-xl">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Destinations ({totalDays} days total)
                    </h3>
                    <div className="space-y-3">
                      {selectedDestinations.map((d) => {
                        const dest = destinations.find(dest => dest.id === d.id);
                        return (
                          <div key={d.id} className="flex items-center justify-between">
                            <span className="text-foreground">{dest?.name}</span>
                            <span className="text-muted-foreground">{d.days} day(s)</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Travelers Summary */}
                  <div className="bg-card p-6 rounded-xl">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Travelers
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">
                        {travelerTypes.find(t => t.id === travelerType)?.name}
                      </span>
                      <span className="text-muted-foreground">{travelerCount} people</span>
                    </div>
                  </div>

                  {/* Package Summary */}
                  <div className="bg-card p-6 rounded-xl">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Hotel className="w-5 h-5 text-primary" />
                      Package Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">Package Type</span>
                        <span className="text-muted-foreground capitalize">{packageType}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">Meals</span>
                        <span className="text-muted-foreground">
                          {mealOptions.find(m => m.id === mealOption)?.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Activities Summary */}
                  {selectedActivities.length > 0 && (
                    <div className="bg-card p-6 rounded-xl">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Activities
                      </h3>
                      <div className="space-y-2">
                        {selectedActivities.map((actId) => {
                          const activity = activities.find(a => a.id === actId);
                          return (
                            <div key={actId} className="flex items-center justify-between">
                              <span className="text-foreground">{activity?.name}</span>
                              <span className="text-muted-foreground">
                                ₹{((activity?.price || 0) * travelerCount).toLocaleString()}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {step < 5 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 && selectedDestinations.length === 0}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  variant="hero"
                  onClick={() => setIsBookingOpen(true)}
                >
                  Proceed to Book
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

              )}
            </div>
          </div>

          {/* Price Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-36 bg-card rounded-2xl p-6 shadow-medium">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Price Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Base ({totalDays} days)</span>
                  <span className="text-foreground">₹{pricing.baseCost.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Package ({packageType})</span>
                  <span className="text-foreground">₹{(pricing.packageCost - pricing.baseCost).toLocaleString()}</span>
                </div>
                {pricing.mealCost > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Meals</span>
                    <span className="text-foreground">₹{pricing.mealCost.toLocaleString()}</span>
                  </div>
                )}
                {pricing.activitiesCost > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Activities</span>
                    <span className="text-foreground">₹{pricing.activitiesCost.toLocaleString()}</span>
                  </div>
                )}
                {pricing.discount > 0 && (
                  <div className="flex items-center justify-between text-sm text-green-600">
                    <span>Discount (10%)</span>
                    <span>-₹{pricing.discount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{pricing.total.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  For {travelerCount} traveler(s)
                </p>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Prices are indicative. Final pricing will be confirmed after reviewing your requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        packageData={{
          destinations: selectedDestinations,
          travelerType,
          travelerCount,
          packageType,
          mealOption,
          activities: selectedActivities,
          totalPrice: pricing.total,
        }}
      />
    </div>
  );
}
