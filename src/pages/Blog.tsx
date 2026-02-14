import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

import bodhGayaImg from "@/assets/bodh-gaya.jpg";
import nalandaImg from "@/assets/nalanda.jpg";
import rajgirImg from "@/assets/rajgir.jpg";
import pawapuriImg from "@/assets/pawapuri.jpg";
import kesariyaImg from "@/assets/kesariya.jpg";
import heroImg from "@/assets/hero-nalanda.jpg";
import { blogCover } from "@/assets/assets";

const blogPosts = [
  {
    id: 1,
    title: {
      en: "The Spiritual Journey: Buddha's Path to Enlightenment in Bihar",
      hi: "आध्यात्मिक यात्रा: बिहार में बुद्ध का ज्ञान प्राप्ति का मार्ग",
      zh: "心灵之旅：佛陀在比哈尔的觉悟之路",
      ja: "精神の旅：ビハールにおけるブッダの悟りへの道",
    },
    excerpt: {
      en: "Explore the sacred sites where Siddhartha Gautama meditated, attained enlightenment, and began his journey as the Buddha. From the Bodhi Tree to the first sermon.",
      hi: "उन पवित्र स्थलों का अन्वेषण करें जहां सिद्धार्थ गौतम ने ध्यान किया, ज्ञान प्राप्त किया और बुद्ध के रूप में अपनी यात्रा शुरू की।",
      zh: "探索悉达多乔达摩冥想、证悟并开始成为佛陀之旅的圣地。从菩提树到第一次说法。",
      ja: "シッダールタ・ゴータマが瞑想し、悟りを開き、ブッダとしての旅を始めた聖地を探索しましょう。",
    },
    image: bodhGayaImg,
    category: "spirituality",
    author: "Dr. Rajesh Kumar",
    date: "2024-12-15",
    readTime: 8,
  },
  {
    id: 2,
    title: {
      en: "Nalanda: The World's First Residential University",
      hi: "नालंदा: विश्व का प्रथम आवासीय विश्वविद्यालय",
      zh: "那烂陀：世界第一所寄宿大学",
      ja: "ナーランダ：世界初の寄宿制大学",
    },
    excerpt: {
      en: "Discover the ancient seat of learning that attracted scholars from across Asia. Learn about its remarkable library, curriculum, and the devastating destruction that ended its 800-year legacy.",
      hi: "उस प्राचीन शिक्षा केंद्र की खोज करें जिसने पूरे एशिया से विद्वानों को आकर्षित किया। इसके उल्लेखनीय पुस्तकालय के बारे में जानें।",
      zh: "发现这个吸引了来自亚洲各地学者的古老学习中心。了解其非凡的图书馆、课程以及结束其800年遗产的毁灭性破坏。",
      ja: "アジア中から学者を引きつけた古代の学問の中心地を発見してください。その素晴らしい図書館について学びましょう。",
    },
    image: nalandaImg,
    category: "history",
    author: "Prof. Meera Singh",
    date: "2024-12-10",
    readTime: 10,
  },
  {
    id: 3,
    title: {
      en: "Rajgir: Where Hot Springs Meet Ancient History",
      hi: "राजगीर: जहां गर्म पानी के झरने प्राचीन इतिहास से मिलते हैं",
      zh: "王舍城：温泉与古老历史的交汇处",
      ja: "ラージギル：温泉と古代史の出会い",
    },
    excerpt: {
      en: "Experience the unique blend of natural wonders and historical significance in Rajgir. From the famous Brahmakund hot springs to the ruins of ancient Magadh capital.",
      hi: "राजगीर में प्राकृतिक अजूबों और ऐतिहासिक महत्व के अनूठे मिश्रण का अनुभव करें। प्रसिद्ध ब्रह्मकुंड गर्म झरनों से लेकर प्राचीन मगध राजधानी के खंडहरों तक।",
      zh: "体验王舍城自然奇观与历史意义的独特融合。从著名的梵天泉温泉到古代摩揭陀首都的遗迹。",
      ja: "ラージギルで自然の驚異と歴史的重要性のユニークな融合を体験してください。",
    },
    image: rajgirImg,
    category: "travel",
    author: "Amit Sharma",
    date: "2024-12-05",
    readTime: 6,
  },
  {
    id: 4,
    title: {
      en: "Jain Pilgrimage: The Sacred Journey to Pawapuri",
      hi: "जैन तीर्थयात्रा: पावापुरी की पवित्र यात्रा",
      zh: "耆那教朝圣：通往帕瓦普里的神圣之旅",
      ja: "ジャイナ教巡礼：パワプリへの聖なる旅",
    },
    excerpt: {
      en: "Discover the serene Jal Mandir, where Lord Mahavira attained Moksha. Learn about the significance of this pilgrimage site for Jain devotees worldwide.",
      hi: "शांत जल मंदिर की खोज करें, जहां भगवान महावीर ने मोक्ष प्राप्त किया। दुनिया भर के जैन भक्तों के लिए इस तीर्थ स्थल के महत्व के बारे में जानें।",
      zh: "发现宁静的水中寺庙，这里是大雄得道之处。了解这个朝圣地对全世界耆那教信徒的意义。",
      ja: "マハーヴィーラがモクシャを達成した静かなジャル・マンディールを発見してください。",
    },
    image: pawapuriImg,
    category: "spirituality",
    author: "Dr. Priya Jain",
    date: "2024-11-28",
    readTime: 7,
  },
  {
    id: 5,
    title: {
      en: "Kesariya Stupa: The Tallest Buddhist Monument",
      hi: "केसरिया स्तूप: सबसे ऊंचा बौद्ध स्मारक",
      zh: "凯萨利亚佛塔：最高的佛教纪念碑",
      ja: "ケサリヤ仏塔：最も高い仏教記念碑",
    },
    excerpt: {
      en: "Standing at 104 feet, Kesariya Stupa predates even the famous Borobudur. Explore this magnificent structure and learn about its connection to Buddha's final journey.",
      hi: "104 फीट की ऊंचाई पर खड़ा केसरिया स्तूप प्रसिद्ध बोरोबुदुर से भी पुराना है। इस शानदार संरचना का अन्वेषण करें।",
      zh: "高达104英尺的凯萨利亚佛塔甚至比著名的婆罗浮屠还要古老。探索这座宏伟的建筑。",
      ja: "104フィートの高さを誇るケサリヤ仏塔は、有名なボロブドゥールよりも古いものです。",
    },
    image: kesariyaImg,
    category: "history",
    author: "Dr. Suresh Verma",
    date: "2024-11-20",
    readTime: 5,
  },
  {
    id: 6,
    title: {
      en: "Bihar's Cuisine: A Culinary Journey Through the Land",
      hi: "बिहार का व्यंजन: भूमि के माध्यम से एक पाक यात्रा",
      zh: "比哈尔美食：穿越这片土地的美食之旅",
      ja: "ビハールの料理：この地を巡る美食の旅",
    },
    excerpt: {
      en: "From the famous Litti Chokha to the sweet delights of Khaja, explore the rich culinary heritage of Bihar. Discover the stories behind each dish.",
      hi: "प्रसिद्ध लिट्टी चोखा से लेकर खाजा की मिठास तक, बिहार की समृद्ध पाक विरासत का अन्वेषण करें।",
      zh: "从著名的Litti Chokha到Khaja的甜蜜美味，探索比哈尔丰富的烹饪遗产。",
      ja: "有名なリッティ・チョカからカジャの甘い喜びまで、ビハールの豊かな料理遺産を探索してください。",
    },
    image: heroImg,
    category: "food",
    author: "Chef Anita Devi",
    date: "2024-11-15",
    readTime: 6,
  },
];

const categories = ["all", "history", "spirituality", "culture", "travel", "food"];

export default function Blog() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPosts = selectedCategory === "all"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-warm relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${blogCover})` }}
        />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center py-12"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.blog.title}
            </h1>
            <p className="text-white text-lg">
              {t.blog.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-border sticky top-16 bg-background/95 backdrop-blur-md z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {t.blog.categories[category as keyof typeof t.blog.categories]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title[language]}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

                    {/* Category Tag */}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                      {t.blog.categories[post.category as keyof typeof t.blog.categories]}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString(language === 'zh' ? 'zh-CN' : language === 'ja' ? 'ja-JP' : language === 'hi' ? 'hi-IN' : 'en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} {t.blog.minRead}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title[language]}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                      {post.excerpt[language]}
                    </p>

                    {/* Author & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                      <Button variant="ghost" size="sm" className="group/btn">
                        {t.blog.readMore}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
