import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { MagadhExploraLogo } from "@/assets/assets";

interface HeaderProps {
  onGetQuote?: () => void;
}

export function Header({ onGetQuote }: HeaderProps) {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.packages, path: "/packages" },
    { name: t.nav.customize, path: "/customize" },
    {
      name: t.nav.specialTours,
      children: [
        { name: t.nav.jainTours, path: "/jain-tours" },
        { name: t.nav.buddhistTours, path: "/buddhist-tours" },
      ],
    },
    { name: t.nav.destinations, path: "/destinations" },
    { name: t.nav.blog, path: "/blog" },
    { name: t.nav.contact, path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-medium py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={scrollToTop} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-white shadow-medium overflow-hidden flex items-center justify-center">
                <img
                  src={MagadhExploraLogo}
                  alt="Magadh Explora Logo"
                  className="w-11 h-11 object-contain"
                />
              </div>
              {/* <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-background" /> */}
            </div>
            <div className="hidden sm:block">
              <h1
                className={cn(
                  "font-display font-bold text-xl transition-colors duration-300",
                  isScrolled ? "text-foreground" : "text-primary-foreground"
                )}
              >
                Magadh Explora
              </h1>
              <p
                className={cn(
                  "text-xs tracking-wider transition-colors duration-300",
                  isScrolled ? "text-muted-foreground" : "text-primary-foreground/80"
                )}
              >
                {t.hero.badge}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl2:flex items-center gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={cn(
                      "px-4 py-2 text-sm font-medium flex items-center gap-1 rounded-lg transition-all duration-300",
                      isScrolled
                        ? "text-foreground hover:bg-muted"
                        : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    )}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-300",
                        activeDropdown === item.name && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-background rounded-xl shadow-large border border-border overflow-hidden"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                    location.pathname === item.path
                      ? isScrolled
                        ? "text-primary bg-primary/10"
                        : "text-primary-foreground bg-primary-foreground/20"
                      : isScrolled
                        ? "text-foreground hover:bg-muted"
                        : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  )}
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden xl2:flex items-center gap-3">
            {/* <a
              href="tel:+919876543210"
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors duration-300",
                isScrolled ? "text-foreground" : "text-primary-foreground/90"
              )}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">+91 98765 43210</span>
            </a> */}
            <LanguageSelector variant={isScrolled ? 'default' : 'transparent'} />
            <Button
              variant={isScrolled ? "default" : "hero"}
              size="sm"
              onClick={onGetQuote}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              {t.nav.getQuote}
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="xl2:hidden flex items-center gap-2">
            <LanguageSelector variant={isScrolled ? 'default' : 'transparent'} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                isScrolled
                  ? "text-foreground hover:bg-muted"
                  : "text-primary-foreground hover:bg-primary-foreground/10"
              )}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl2:hidden mt-2 bg-background border-t border-border"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) =>
                  item.children ? (
                    <div key={item.name} className="space-y-1">
                      <p className="px-4 py-2 text-sm font-semibold text-muted-foreground">
                        {item.name}
                      </p>
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-6 py-2 text-sm text-foreground hover:bg-muted rounded-lg"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                        location.pathname === item.path
                          ? "text-primary bg-primary/10"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </nav>
              <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  <Phone className="w-4 h-4" />
                  +91 98765 43210
                </a>
                <Button variant="hero" className="w-full" onClick={onGetQuote}>
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {t.nav.getQuote}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
