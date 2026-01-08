import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Truck, Award } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { getFeaturedProducts } from '@/data/products';
import heroBg from '@/assets/hero-bg.jpg';
import heroPerfume from '@/assets/hero-perfume.jpg';
const HomePage = () => {
  const featuredProducts = getFeaturedProducts();
  const features = [{
    icon: Sparkles,
    title: 'Premium Quality',
    titleAr: 'جودة فائقة',
    description: 'Only the finest ingredients sourced from around the world'
  }, {
    icon: Shield,
    title: 'Authenticity Guaranteed',
    titleAr: 'أصالة مضمونة',
    description: '100% authentic fragrances with certificate of origin'
  }, {
    icon: Truck,
    title: 'Luxury Delivery',
    titleAr: 'توصيل فاخر',
    description: 'Premium packaging and white-glove delivery service'
  }, {
    icon: Award,
    title: 'Expert Curation',
    titleAr: 'اختيار متخصص',
    description: 'Hand-selected by world-renowned perfume experts'
  }];
  return <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src={heroBg} alt="Luxury Perfume Boutique" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold font-arabic text-xl mb-4 animate-fade-in opacity-0" style={{
            animationDelay: '0.2s',
            animationFillMode: 'forwards'
          }}>
              عطور تُجسد الفخامة والذوق الرفيع
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 tracking-wide animate-fade-in opacity-0" style={{
            animationDelay: '0.4s',
            animationFillMode: 'forwards'
          }}>
              ALSAYED
              <span className="block text-gold">PERFUMES</span>
            </h1>
            
            <div className="flex flex-wrap gap-4 animate-fade-in opacity-0" style={{
            animationDelay: '0.8s',
            animationFillMode: 'forwards'
          }}>
              <Link to="/shop" className="btn-gold group inline-flex items-center gap-3">
                Explore Collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/about" className="btn-outline-gold border-white text-white hover:bg-white hover:text-primary">
                Our Story
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        
      </section>

      {/* Featured Perfume Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="animate-fade-in">
              <span className="text-xs tracking-ultra-wide text-gold uppercase mb-4 block">
                The Art of Fragrance
              </span>
              <h2 className="text-4xl lg:text-5xl font-display font-semibold mb-6">
                Crafted for
                <span className="text-gold block">Excellence</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                At ALSAYED PERFUMES, we believe that fragrance is more than a scent—it's an expression of identity. Our master perfumers blend the rarest ingredients from across the globe to create compositions that transcend time and trend.
              </p>
              <p className="font-arabic text-lg text-gold mb-8">
                كل قطرة تحكي قصة من الفخامة والتميز
              </p>
              <Link to="/about" className="btn-luxury inline-flex items-center gap-3 group">
                <span className="relative z-10">Discover Our Heritage</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square bg-muted rounded overflow-hidden shadow-luxury">
                <img src={heroPerfume} alt="Signature Perfume" className="w-full h-full object-cover" />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-gold/20" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gold/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 lg:py-32 bg-cream-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs tracking-ultra-wide text-gold uppercase mb-4 block">
              Curated Selection
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-semibold mb-4">
              Featured Fragrances
            </h2>
            <p className="font-arabic text-lg text-muted-foreground">
              عطور مميزة لذوق استثنائي
            </p>
            <div className="luxury-divider mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
          </div>

          <div className="text-center mt-16">
            <Link to="/shop" className="btn-luxury inline-flex items-center gap-3 group">
              <span className="relative z-10">View All Collection</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs tracking-ultra-wide text-gold uppercase mb-4 block">
              Our Promise
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-semibold mb-4">
              Why Choose ALSAYED
            </h2>
            <p className="font-arabic text-lg text-gold">
              لماذا نحن الأفضل
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => <div key={feature.title} className="text-center p-8 border border-primary-foreground/10 hover:border-gold/50 transition-all duration-500 animate-fade-in group" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 border border-gold/30 group-hover:border-gold transition-colors duration-500">
                  <feature.icon className="w-7 h-7 text-gold" />
                </div>
                <p className="font-arabic text-sm text-gold mb-2">{feature.titleAr}</p>
                <h3 className="font-display text-lg mb-3">{feature.title}</h3>
                <p className="text-sm text-primary-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_hsl(43_76%_52%),_transparent_70%)]" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <span className="text-xs tracking-ultra-wide text-gold uppercase mb-4 block">
            Begin Your Journey
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-semibold mb-6">
            Find Your Signature Scent
          </h2>
          <p className="font-arabic text-xl text-gold mb-4">
            اكتشف عطرك المميز
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Every fragrance tells a story. Let us help you discover the scent that perfectly captures your essence and leaves an unforgettable impression.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop" className="btn-gold inline-flex items-center gap-3 group">
              Shop Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/contact" className="btn-outline-gold">
              Get Expert Advice
            </Link>
          </div>
        </div>
      </section>
    </main>;
};
export default HomePage;