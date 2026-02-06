import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle, User, Mail, Phone, Globe, Users, Calendar, Wallet, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { z } from "zod";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const destinationOptions = [
  "Bodh Gaya", "Rajgir", "Nalanda", "Pawapuri", "Vaishali", 
  "Kesariya", "Patna", "Gaya", "Vikramshila", "Rohtasgarh"
];

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(50).optional(),
  country: z.string().trim().max(100).optional(),
  travelerType: z.string().optional(),
  packageTier: z.string().optional(),
  destinations: z.array(z.string()).optional(),
  travelDates: z.string().trim().max(255).optional(),
  groupSize: z.number().min(1).max(100).optional(),
  budget: z.string().optional(),
  requirements: z.string().trim().max(1000).optional(),
});

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    travelerType: "",
    packageTier: "",
    destinations: [] as string[],
    travelDates: "",
    groupSize: "",
    budget: "",
    requirements: "",
  });

  const handleDestinationToggle = (dest: string) => {
    setFormData(prev => ({
      ...prev,
      destinations: prev.destinations.includes(dest)
        ? prev.destinations.filter(d => d !== dest)
        : [...prev.destinations, dest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate form data
    const validationResult = inquirySchema.safeParse({
      ...formData,
      groupSize: formData.groupSize ? parseInt(formData.groupSize) : undefined,
    });

    if (!validationResult.success) {
      const newErrors: Record<string, string> = {};
      validationResult.error.errors.forEach(err => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from('inquiries').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        country: formData.country || null,
        language: language,
        traveler_type: formData.travelerType || null,
        package_tier: formData.packageTier || null,
        destinations: formData.destinations.length > 0 ? formData.destinations : null,
        travel_dates: formData.travelDates || null,
        group_size: formData.groupSize ? parseInt(formData.groupSize) : null,
        budget_range: formData.budget || null,
        special_requirements: formData.requirements || null,
      });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "Success!",
        description: t.quote.success,
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: "", email: "", phone: "", country: "",
          travelerType: "", packageTier: "", destinations: [],
          travelDates: "", groupSize: "", budget: "", requirements: "",
        });
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: "Error",
        description: t.common.error,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full max-h-[90vh] overflow-auto bg-background rounded-2xl shadow-2xl z-50"
          >
            {/* Success State */}
            {isSuccess ? (
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  {t.quote.success}
                </h3>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-foreground">
                      {t.quote.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t.quote.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Basic Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        {t.quote.name} *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        required
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        {t.quote.email} *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        required
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" />
                        {t.quote.phone}
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Globe className="w-4 h-4 text-primary" />
                        {t.quote.country}
                      </label>
                      <Input
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="India"
                      />
                    </div>
                  </div>

                  {/* Traveler Type & Package Tier */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      {t.quote.travelerType}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(t.quote.travelerTypes).map(([key, label]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setFormData({ ...formData, travelerType: key })}
                          className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-all",
                            formData.travelerType === key
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          )}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">{t.quote.packageTier}</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['essential', 'deluxe', 'premium'].map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setFormData({ ...formData, packageTier: tier })}
                          className={cn(
                            "p-4 rounded-xl text-center transition-all border-2",
                            formData.packageTier === tier
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <span className={cn(
                            "text-lg font-bold capitalize",
                            tier === 'premium' && "text-gold",
                            tier === 'deluxe' && "text-primary",
                          )}>
                            {t.tiers[tier as keyof typeof t.tiers].name}
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">
                            {t.tiers[tier as keyof typeof t.tiers].tagline}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Destinations */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">{t.quote.destinations}</label>
                    <div className="flex flex-wrap gap-2">
                      {destinationOptions.map((dest) => (
                        <button
                          key={dest}
                          type="button"
                          onClick={() => handleDestinationToggle(dest)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-sm transition-all",
                            formData.destinations.includes(dest)
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          )}
                        >
                          {dest}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Travel Details */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        {t.quote.travelDates}
                      </label>
                      <Input
                        value={formData.travelDates}
                        onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                        placeholder="March 2025"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        {t.quote.groupSize}
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="100"
                        value={formData.groupSize}
                        onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                        placeholder="2"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-primary" />
                        {t.quote.budget}
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        <option value="">Select...</option>
                        {Object.entries(t.quote.budgetRanges).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Special Requirements */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      {t.quote.requirements}
                    </label>
                    <Textarea
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="Any dietary restrictions, accessibility needs, specific interests..."
                      rows={3}
                      maxLength={1000}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        {t.quote.submitting}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {t.quote.submit}
                      </>
                    )}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
