import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Video, Film, Upload, Play, Heart, Eye, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
    bodhGayaSharedImg,
    nalandaUniversityImg,
    rajgirMainImg,
    ashokanPillarVaishaliImg,
    golGharPatnaImg,
    rajgir1Img,
    sunsetBodhgayaImg,
    walkingNalandaImg,
    meditationRajgirImg,
} from "@/assets/assets";

// Sample UGC content (mock data - in production this would come from database)
const sampleContent = {
    photos: [
        { id: 1, url: bodhGayaSharedImg, user: "Amit K.", location: "Bodh Gaya", likes: 234 },
        { id: 2, url: nalandaUniversityImg, user: "Sarah M.", location: "Nalanda", likes: 189 },
        { id: 3, url: rajgirMainImg, user: "Raj P.", location: "Rajgir", likes: 156 },
        { id: 4, url: rajgir1Img, user: "Emily C.", location: "Rajgir", likes: 203 },
        { id: 5, url: ashokanPillarVaishaliImg, user: "Chen W.", location: "Vaishali", likes: 178 },
        { id: 6, url: golGharPatnaImg, user: "Priya S.", location: "Patna", likes: 145 },
    ],
    videos: [
        { id: 1, thumbnail: sunsetBodhgayaImg, user: "Travel Monk", title: "Sunrise at Bodh Gaya", views: 12500, duration: "4:32" },
        { id: 2, thumbnail: walkingNalandaImg, user: "Bihar Explorer", title: "Walking Through Nalanda", views: 8900, duration: "6:15" },
        { id: 3, thumbnail: meditationRajgirImg, user: "Spiritual Journey", title: "Meditation in Rajgir", views: 15200, duration: "3:45" },
    ],
    reels: [
        { id: 1, thumbnail: "https://images.unsplash.com/photo-1590845947698-8924d7409b56?w=400", user: "@bihartravel", likes: 5600 },
        { id: 2, thumbnail: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400", user: "@spiritualseeker", likes: 8200 },
        { id: 3, thumbnail: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=400", user: "@wanderlust_in", likes: 4300 },
        { id: 4, thumbnail: "https://images.unsplash.com/photo-1544015759-237f87627549?w=400", user: "@travelgram", likes: 9100 },
    ],
};

type ContentType = "photos" | "videos" | "reels";

export function ShareJourneySection() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<ContentType>("photos");
    const [showUploadModal, setShowUploadModal] = useState(false);
    const { toast } = useToast();

    const tabs = [
        { id: "photos" as ContentType, icon: Camera, label: t.shareJourney.photos },
        { id: "videos" as ContentType, icon: Video, label: t.shareJourney.videos },
        { id: "reels" as ContentType, icon: Film, label: t.shareJourney.reels },
    ];

    const handleShareClick = () => {
        toast({
            title: "Feature Coming Soon 🚀",
            description:
                "We’re building something exciting! Soon you’ll be able to share your travel stories, photos, and reels with the Magadh Explora community.",
        });
    };

    return (
        <section className="py-24 bg-gradient-warm relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 pattern-heritage opacity-30" />

            <div className="container mx-auto px-4 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        <Share2 className="w-4 h-4" />
                        {t.shareJourney.badge}
                    </span>

                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        {t.shareJourney.title}
                    </h2>

                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t.shareJourney.subtitle}
                    </p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-center gap-2 mb-8"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300",
                                activeTab === tab.id
                                    ? "bg-primary text-primary-foreground shadow-medium"
                                    : "bg-background hover:bg-muted text-muted-foreground"
                            )}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </motion.div>

                {/* Content Grid */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === "photos" && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {sampleContent.photos.map((photo, index) => (
                                <motion.div
                                    key={photo.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="group relative aspect-square rounded-xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-300 cursor-pointer"
                                >
                                    <img
                                        src={photo.url}
                                        alt={`${photo.location} by ${photo.user}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-primary-foreground text-sm font-medium">{photo.user}</p>
                                        <p className="text-primary-foreground/70 text-xs">{photo.location}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                                            <span className="text-primary-foreground/80 text-xs">{photo.likes}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {activeTab === "videos" && (
                        <div className="grid md:grid-cols-3 gap-6">
                            {sampleContent.videos.map((video, index) => (
                                <motion.div
                                    key={video.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="group relative rounded-xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-300 cursor-pointer bg-background"
                                >
                                    <div className="relative aspect-video">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <Play className="w-7 h-7 text-primary-foreground ml-1" />
                                            </div>
                                        </div>
                                        <span className="absolute bottom-2 right-2 px-2 py-1 rounded bg-foreground/80 text-primary-foreground text-xs">
                                            {video.duration}
                                        </span>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-semibold text-foreground mb-1">{video.title}</h4>
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <span>{video.user}</span>
                                            <span className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                {video.views.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {activeTab === "reels" && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {sampleContent.reels.map((reel, index) => (
                                <motion.div
                                    key={reel.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="group relative aspect-[9/16] rounded-xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-300 cursor-pointer"
                                >
                                    <img
                                        src={reel.thumbnail}
                                        alt={`Reel by ${reel.user}`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                                    <div className="absolute top-3 right-3">
                                        <Film className="w-5 h-5 text-primary-foreground" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <p className="text-primary-foreground font-medium text-sm">{reel.user}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                                            <span className="text-primary-foreground/80 text-sm">{reel.likes.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
                                            <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Upload CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-background border border-border shadow-soft">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Upload className="w-7 h-7 text-primary" />
                        </div>
                        <div className="text-center sm:text-left">
                            <h4 className="font-display text-lg font-bold text-foreground">
                                {t.shareJourney.uploadTitle}
                            </h4>
                            <p className="text-muted-foreground text-sm max-w-md">
                                {t.shareJourney.uploadSubtitle}
                            </p>
                        </div>
                        <Button variant="default" size="lg" className="shrink-0" onClick={handleShareClick}>
                            <Camera className="w-4 h-4 mr-2" />
                            {t.shareJourney.shareNow}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
