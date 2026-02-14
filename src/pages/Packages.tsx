import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Star,
  Clock,
  Users,
  MapPin,
  ArrowRight,
  X,
  SlidersHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

import bodhGayaImg from "@/assets/bodh-gaya.jpg";
import rajgirImg from "@/assets/rajgir.jpg";
import pawapuriImg from "@/assets/pawapuri.jpg";
import nalandaImg from "@/assets/nalanda.jpg";
import kesariyaImg from "@/assets/kesariya.jpg";
import heroImg from "@/assets/hero-nalanda.jpg";
import { explorePackCover } from "@/assets/assets";

const allPackages = [
  {
    id: 1,
    title: "Buddhist Circuit Premium",
    description: "A transformative spiritual journey through the sacred Buddhist sites of Bihar. Experience meditation, dharma talks, and monastery stays.",
    image: bodhGayaImg,
    duration: "7 Days",
    groupSize: "2-15",
    rating: 4.9,
    reviews: 234,
    price: 45000,
    originalPrice: 55000,
    type: "Buddhist",
    category: "Premium",
    destinations: ["Bodh Gaya", "Rajgir", "Nalanda", "Vaishali"],
  },
  {
    id: 2,
    title: "Blissful Bihar Package",
    description: "Immerse yourself in authentic Bihar culture, heritage sites, and delicious local cuisine across 4-8 days",
    image: nalandaImg,
    duration: "5 Days",
    groupSize: "2-20",
    rating: 4.9,
    reviews: 312,
    price: 32000,
    originalPrice: 40000,
    type: "Heritage",
    category: "Spiritual",
    destinations: ["Rajgir", "Gaya", "Nalanda", "Sasaram", "Patna"],
  },
  {
    id: 3,
    title: "Jain Pilgrimage Tour",
    description: "Visit the holiest Jain tirths including Pawapuri Jal Mandir and Kundalpur, the birthplace of Lord Mahavira.",
    image: pawapuriImg,
    duration: "5 Days",
    groupSize: "2-20",
    rating: 4.8,
    reviews: 156,
    price: 35000,
    originalPrice: 42000,
    type: "Jain",
    category: "Spiritual",
    destinations: ["Pawapuri", "Kundalpur", "Rajgir", "Vaishali"],
  },
  {
    id: 4,
    title: "Adventure & Heritage",
    description: "Explore ancient forts, natural hot springs, and scenic landscapes. Perfect for adventure seekers and history buffs.",
    image: rajgirImg,
    duration: "4 Days",
    groupSize: "2-12",
    rating: 4.7,
    reviews: 189,
    price: 28000,
    originalPrice: 32000,
    type: "Adventure",
    category: "Essential",
    destinations: ["Rajgir", "Rohtasgarh", "Sasaram", "Gaya"],
  },
  {
    id: 5,
    title: "Nalanda Scholar's Trail",
    description: "Walk through the ancient corridors of the world's first university. Perfect for history enthusiasts and academics.",
    image: nalandaImg,
    duration: "3 Days",
    groupSize: "2-10",
    rating: 4.9,
    reviews: 112,
    price: 22000,
    originalPrice: 26000,
    type: "Heritage",
    category: "Essential",
    destinations: ["Nalanda", "Rajgir", "Vikramshila"],
  },
  {
    id: 6,
    title: "Complete Bihar Explorer",
    description: "The ultimate Bihar experience covering Buddhist, Jain, and heritage sites with premium accommodations throughout.",
    image: heroImg,
    duration: "12 Days",
    groupSize: "2-8",
    rating: 5.0,
    reviews: 89,
    price: 85000,
    originalPrice: 100000,
    type: "Mixed",
    category: "Premium",
    destinations: ["All Major Sites"],
  },
  {
    id: 7,
    title: "Kesariya Stupa Expedition",
    description: "Visit the world's tallest Buddhist stupa along with other lesser-known gems of Bihar's Buddhist heritage.",
    image: kesariyaImg,
    duration: "2 Days",
    groupSize: "2-15",
    rating: 4.6,
    reviews: 78,
    price: 15000,
    originalPrice: 18000,
    type: "Buddhist",
    category: "Essential",
    destinations: ["Kesariya", "Vaishali", "Patna"],
  },
  // {
  //   id: 8,
  //   title: "Kesariya Stupa Expedition",
  //   description: "Visit the world's tallest Buddhist stupa along with other lesser-known gems of Bihar's Buddhist heritage.",
  //   image: kesariyaImg,
  //   duration: "2 Days",
  //   groupSize: "2-15",
  //   rating: 4.6,
  //   reviews: 78,
  //   price: 15000,
  //   originalPrice: 18000,
  //   type: "Buddhist",
  //   category: "Essential",
  //   destinations: ["Kesariya", "Vaishali", "Patna"],
  // },
];

const types = ["All", "Buddhist", "Jain", "Heritage", "Adventure", "Mixed"];
const categories = ["All", "Essential", "Premium", "Spiritual"];
const durations = ["All", "1-3 Days", "4-7 Days", "8+ Days"];

export default function PackagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredPackages = useMemo(() => {
    return allPackages.filter((pkg) => {
      const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === "All" || pkg.type === selectedType;
      const matchesCategory = selectedCategory === "All" || pkg.category === selectedCategory;

      let matchesDuration = true;
      if (selectedDuration !== "All") {
        const days = parseInt(pkg.duration);
        if (selectedDuration === "1-3 Days") matchesDuration = days <= 3;
        else if (selectedDuration === "4-7 Days") matchesDuration = days >= 4 && days <= 7;
        else if (selectedDuration === "8+ Days") matchesDuration = days >= 8;
      }

      return matchesSearch && matchesType && matchesCategory && matchesDuration;
    });
  }, [searchQuery, selectedType, selectedCategory, selectedDuration]);

  const clearFilters = () => {
    setSelectedType("All");
    setSelectedCategory("All");
    setSelectedDuration("All");
    setSearchQuery("");
  };

  const hasActiveFilters = selectedType !== "All" || selectedCategory !== "All" || selectedDuration !== "All" || searchQuery !== "";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${explorePackCover})` }}
        />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center py-12"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Explore Our Packages
            </h1>
            <p className="text-white text-lg">
              Find the perfect travel experience tailored to your interests,
              duration, and budget
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 border-b border-border sticky top-16 bg-background/95 backdrop-blur-md z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Type Filter */}
              <div className="flex items-center gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      selectedType === type
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* More Filters Dropdown */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(showFilters && "bg-primary text-primary-foreground")}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                More Filters
              </Button>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {[selectedType, selectedCategory, selectedDuration].filter(f => f !== "All").length}
                </span>
              )}
            </Button>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-border"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Type (Mobile) */}
                <div className="lg:hidden">
                  <p className="text-sm font-medium text-foreground mb-2">Type</p>
                  <div className="flex flex-wrap gap-2">
                    {types.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-sm transition-all",
                          selectedType === type
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-sm transition-all",
                          selectedCategory === cat
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Duration</p>
                  <div className="flex flex-wrap gap-2">
                    {durations.map((dur) => (
                      <button
                        key={dur}
                        onClick={() => setSelectedDuration(dur)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-sm transition-all",
                          selectedDuration === dur
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {dur}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Results Count */}
          <div className="mb-8 flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredPackages.length}</span> packages
            </p>
            <Link to="/customize">
              <Button variant="outline">
                Build Custom Package
              </Button>
            </Link>
          </div>

          {/* Grid */}
          {filteredPackages.length > 0 ? (
            <div className="grid md:grid-cols-2 xl2:grid-cols-3 gap-8">
              {filteredPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

                      {/* Tags */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-semibold",
                          pkg.category === "Premium" ? "bg-gradient-gold text-primary-foreground" :
                            pkg.category === "Spiritual" ? "bg-gradient-spiritual text-primary-foreground" :
                              "bg-secondary text-secondary-foreground"
                        )}>
                          {pkg.category}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-background/90 text-foreground text-xs font-medium">
                          {pkg.type}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-background/90 backdrop-blur-sm">
                        <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                        <span className="text-xs font-semibold text-foreground">{pkg.rating}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {pkg.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {pkg.description}
                      </p>

                      {/* Destinations */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {pkg.destinations.slice(0, 3).map((place) => (
                          <span
                            key={place}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground"
                          >
                            <MapPin className="w-3 h-3" />
                            {place}
                          </span>
                        ))}
                        {pkg.destinations.length > 3 && (
                          <span className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground">
                            +{pkg.destinations.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {pkg.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4" />
                          {pkg.groupSize}
                        </span>
                        <span className="text-muted-foreground/60">
                          {pkg.reviews} reviews
                        </span>
                      </div>

                      {/* Price & CTA */}
                      <div className="mt-auto flex items-end justify-between pt-4 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">Starting from</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-primary">
                              ₹{pkg.price.toLocaleString()}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{pkg.originalPrice.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <Link to="/customize">
                          <Button size="sm" className="group/btn">
                            View Details
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No packages found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search query
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
