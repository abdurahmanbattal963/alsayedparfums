import { Award, Globe, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroPerfume from '@/assets/hero-perfume.jpg';

const AboutPage = () => {
  const values = [
    {
      icon: Sparkles,
      title: 'Excellence',
      titleAr: 'التميز',
      description: 'We source only the finest ingredients from around the world, ensuring every fragrance meets the highest standards of quality.',
    },
    {
      icon: Heart,
      title: 'Passion',
      titleAr: 'الشغف',
      description: 'Our master perfumers pour their hearts into every creation, crafting scents that evoke emotion and tell stories.',
    },
    {
      icon: Globe,
      title: 'Heritage',
      titleAr: 'التراث',
      description: 'Rooted in Arabian tradition yet embracing modern innovation, we honor the ancient art of perfumery.',
    },
    {
      icon: Award,
      title: 'Authenticity',
      titleAr: 'الأصالة',
      description: 'Every bottle carries our promise of genuine luxury, backed by certificates of authenticity.',
    },
  ];

  const milestones = [
    { year: '1985', event: 'ALSAYED PERFUMES founded in Dubai' },
    { year: '1992', event: 'Opened first flagship boutique' },
    { year: '2005', event: 'Launched exclusive oud collection' },
    { year: '2015', event: 'Expanded to 10 locations across UAE' },
    { year: '2020', event: 'Introduced online luxury experience' },
    { year: 'Today', event: 'Serving discerning customers worldwide' },
  ];

  return (
    <main className="min-h-screen pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs tracking-ultra-wide text-gold uppercase mb-4 block">
              Our Story
            </span>
            <h1 className="text-4xl lg:text-6xl font-display font-semibold mb-6">
              The Art of Luxury Fragrance
            </h1>
            <p className="font-arabic text-xl text-gold mb-8">
              أربعة عقود من الإبداع في عالم العطور الفاخرة
            </p>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              For over four decades, ALSAYED PERFUMES has been the epitome of luxury fragrance in the Middle East. Our journey began with a simple vision: to create scents that transcend time and touch the soul.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] bg-muted overflow-hidden">
                <img
                  src={heroPerfume}
                  alt="ALSAYED Heritage"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-gold/20 -z-10" />
            </div>

            <div className="space-y-8">
              <div>
                <span className="text-xs tracking-ultra-wide text-gold uppercase mb-4 block">
                  Our Heritage
                </span>
                <h2 className="text-4xl font-display font-semibold mb-6">
                  A Legacy of
                  <span className="text-gold block">Excellence</span>
                </h2>
              </div>

              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 1985 by Sheikh Mohammed Al Sayed, our house was born from a deep appreciation for the ancient art of Arabian perfumery. What started as a small boutique in the heart of Dubai has grown into one of the most prestigious fragrance houses in the region.
                </p>
                <p>
                  Our master perfumers travel the world seeking the rarest ingredients—from the aged oud of Laos to the delicate rose of Bulgaria. Each fragrance in our collection is a masterpiece, crafted with meticulous attention to detail and an unwavering commitment to quality.
                </p>
                <p>
                  Today, ALSAYED PERFUMES continues to honor our founder's vision, creating fragrances that speak to the modern connoisseur while remaining true to our Arabian roots.
                </p>
              </div>

              <p className="font-arabic text-lg text-gold">
                "الجودة ليست ترفاً، بل هي معيارنا"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-32 bg-cream-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs tracking-ultra-wide text-gold uppercase mb-4 block">
              What Drives Us
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-semibold mb-4">
              Our Values
            </h2>
            <p className="font-arabic text-lg text-gold">قيمنا ومبادئنا</p>
            <div className="luxury-divider mt-6" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center p-8 bg-card border border-border hover:border-gold/50 transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 border border-gold/30">
                  <value.icon className="w-7 h-7 text-gold" />
                </div>
                <p className="font-arabic text-sm text-gold mb-2">{value.titleAr}</p>
                <h3 className="font-display text-lg mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs tracking-ultra-wide text-gold uppercase mb-4 block">
              Our Journey
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-semibold mb-4">
              Milestones
            </h2>
            <p className="font-arabic text-lg text-gold">محطات في مسيرتنا</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-gold/30 transform lg:-translate-x-1/2" />

              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center gap-8 mb-12 last:mb-0 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                    } pl-8 lg:pl-0`}
                  >
                    <span className="text-3xl font-display text-gold block mb-2">
                      {milestone.year}
                    </span>
                    <p className="text-primary-foreground/80">{milestone.event}</p>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-0 lg:left-1/2 w-4 h-4 bg-gold rounded-full transform lg:-translate-x-1/2" />

                  <div className="flex-1 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="text-xs tracking-ultra-wide text-gold uppercase mb-4 block">
            Experience Luxury
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-semibold mb-6">
            Discover Your Signature
          </h2>
          <p className="font-arabic text-xl text-gold mb-8">اكتشف عطرك المميز</p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Every fragrance in our collection tells a unique story. Let us help you find the scent that perfectly captures your essence.
          </p>
          <Link to="/shop" className="btn-gold">
            Explore Our Collection
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
