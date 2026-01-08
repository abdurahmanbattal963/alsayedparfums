import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { products, Product } from '@/data/products';
import { cn } from '@/lib/utils';

type Category = 'all' | 'men' | 'women' | 'unisex';
type SortOption = 'newest' | 'price-low' | 'price-high' | 'name';

const ShopPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  const categories: { value: Category; label: string; labelAr: string }[] = [
    { value: 'all', label: 'All Fragrances', labelAr: 'جميع العطور' },
    { value: 'men', label: "Men's Collection", labelAr: 'عطور رجالية' },
    { value: 'women', label: "Women's Collection", labelAr: 'عطور نسائية' },
    { value: 'unisex', label: 'Unisex Collection', labelAr: 'عطور للجنسين' },
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A-Z' },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.nameEn.toLowerCase().includes(query) ||
          p.nameAr.includes(searchQuery) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by price range
    result = result.filter((p) => {
      const minPrice = Math.min(...p.sizes.map((s) => s.price));
      return minPrice >= priceRange[0] && minPrice <= priceRange[1];
    });

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-low':
        result.sort((a, b) => {
          const aMin = Math.min(...a.sizes.map((s) => s.price));
          const bMin = Math.min(...b.sizes.map((s) => s.price));
          return aMin - bMin;
        });
        break;
      case 'price-high':
        result.sort((a, b) => {
          const aMin = Math.min(...a.sizes.map((s) => s.price));
          const bMin = Math.min(...b.sizes.map((s) => s.price));
          return bMin - aMin;
        });
        break;
      case 'name':
        result.sort((a, b) => a.nameEn.localeCompare(b.nameEn));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  return (
    <main className="min-h-screen pt-24 lg:pt-32 pb-20">
      {/* Hero Banner */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-24 mb-12">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="text-xs tracking-ultra-wide text-gold uppercase mb-4 block">
            Our Collection
          </span>
          <h1 className="text-4xl lg:text-6xl font-display font-semibold mb-4">
            Luxury Fragrances
          </h1>
          <p className="font-arabic text-xl text-gold">
            مجموعة العطور الفاخرة
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8">
        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search fragrances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background border border-border focus:border-gold focus:outline-none transition-colors text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none text-sm cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Sidebar Filters */}
          <aside
            className={cn(
              'w-full lg:w-64 flex-shrink-0 space-y-8',
              'fixed inset-0 z-40 bg-background p-6 lg:p-0 lg:static lg:block transition-transform duration-300',
              showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            )}
          >
            {/* Mobile Close */}
            <div className="lg:hidden flex items-center justify-between mb-6">
              <h3 className="font-display text-lg">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-sm font-semibold tracking-widest uppercase mb-4">
                Categories
              </h4>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat.value}>
                    <button
                      onClick={() => {
                        setSelectedCategory(cat.value);
                        setShowFilters(false);
                      }}
                      className={cn(
                        'w-full text-left text-sm transition-colors duration-300',
                        selectedCategory === cat.value
                          ? 'text-gold font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {cat.label}
                      <span className="font-arabic block text-xs mt-0.5">{cat.labelAr}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="text-sm font-semibold tracking-widest uppercase mb-4">
                Price Range
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full px-3 py-2 bg-background border border-border text-sm focus:border-gold focus:outline-none"
                    placeholder="Min"
                  />
                  <span className="text-muted-foreground">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full px-3 py-2 bg-background border border-border text-sm focus:border-gold focus:outline-none"
                    placeholder="Max"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  AED {priceRange[0]} - AED {priceRange[1]}
                </p>
              </div>
            </div>

            {/* Apply Button (Mobile) */}
            <button
              onClick={() => setShowFilters(false)}
              className="lg:hidden btn-gold w-full text-center"
            >
              Apply Filters
            </button>
          </aside>

          {/* Mobile Overlay */}
          {showFilters && (
            <div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} fragrances
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-display text-xl mb-2">No fragrances found</p>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setPriceRange([0, 1000]);
                  }}
                  className="btn-outline-gold"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
