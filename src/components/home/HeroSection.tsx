import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Star, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import heroImage from "@/assets/hero-nalanda.jpg";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  onGetQuote?: () => void;
}

export function HeroSection({ onGetQuote }: HeroSectionProps) {
  const { t } = useLanguage();

  const heroSlides = [
    {
      image: "/images/hero-bihar.jpg",
      title: "Discover the\nAncient Wonders\nof Bihar",
      subtitle: "3000 years of history, spirituality & adventure await",
    },
    {
      image: "/images/bodh-gaya.jpg",
      title: "Walk the Path\nof Enlightenment",
      subtitle: "Explore sacred Buddhist sites across the Magadh region",
    },
    {
      image: "/images/rajgir.jpg",
      title: "Where Empires\nWere Born",
      subtitle: "Experience the grandeur of the ancient Magadh Empire",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  const stats = [
    { icon: Star, value: "4.9", label: t.hero.stats.destinations },
    { icon: Users, value: "10K+", label: t.hero.stats.happyTravelers },
    { icon: MapPin, value: "50+", label: t.hero.stats.yearsExperience },
  ];
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Ancient Nalanda ruins at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
      </div>

      {/* Heritage Pattern Overlay */}
      <div className="absolute inset-0 pattern-heritage opacity-30" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {t.hero.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6"
            >
              {t.hero.title}
              <span className="block text-gradient-gold">{t.hero.titleHighlight}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/packages">
                  {t.hero.explorePackages}
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" onClick={onGetQuote}>
                <MessageCircle className="w-5 h-5 mr-1" />
                {t.nav.getQuote}
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-8 pb-4"
            >
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center backdrop-blur-sm">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary-foreground">{stat.value}</p>
                    <p className="text-sm text-primary-foreground/60">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Featured Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />

              <div className="relative glass rounded-3xl p-6 shadow-large">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Featured Tour
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <span className="text-sm font-semibold text-foreground">4.9</span>
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  Buddhist Circuit Premium
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  7 Days • Bodh Gaya, Rajgir, Nalanda, Vaishali
                </p>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Starting from</p>
                    <p className="text-2xl font-bold text-primary">₹45,000</p>
                  </div>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-primary-foreground/60 text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-3 rounded-full bg-primary-foreground/60" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
