export interface ProductSize {
  size: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  category: 'men' | 'women' | 'unisex';
  description: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  sizes: ProductSize[];
  images: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "royal-oud-excellence",
    nameEn: "Royal Oud Excellence",
    nameAr: "عود ملكي فاخر",
    category: "men",
    description: "An opulent masterpiece that captures the essence of Arabian royalty. This extraordinary fragrance opens with the rarest Laotian oud, aged for decades to achieve unparalleled depth. The composition evolves through precious rose absolute and saffron from Kashmir, before settling into a majestic base of aged sandalwood and amber. Each spray is a journey through the grand halls of ancient palaces, where tradition meets modern luxury.",
    topNotes: ["Laotian Oud", "Saffron", "Pink Pepper"],
    heartNotes: ["Bulgarian Rose", "Jasmine Absolute", "Orris"],
    baseNotes: ["Aged Sandalwood", "Amber", "Musk", "Vanilla"],
    sizes: [
      { size: "50ml", price: 450, stock: 15 },
      { size: "100ml", price: 750, stock: 10 },
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    featured: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: "2",
    slug: "velvet-rose-noir",
    nameEn: "Velvet Rose Noir",
    nameAr: "وردة المخمل الأسود",
    category: "women",
    description: "A darkly romantic ode to the most precious rose gardens of the world. This intoxicating elixir weaves together the velvety petals of Turkish roses with the mysterious allure of black current and oud. The heart reveals layers of dark plum and violet, while the dry down embraces you in a warm cocoon of benzoin, patchouli, and precious woods. A fragrance for the woman who commands attention without saying a word.",
    topNotes: ["Black Currant", "Bergamot", "Saffron"],
    heartNotes: ["Turkish Rose", "Dark Plum", "Violet"],
    baseNotes: ["Oud", "Patchouli", "Benzoin", "Amber"],
    sizes: [
      { size: "50ml", price: 380, stock: 20 },
      { size: "100ml", price: 650, stock: 12 },
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    featured: true,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10"
  },
  {
    id: "3",
    slug: "arabian-nights-intense",
    nameEn: "Arabian Nights Intense",
    nameAr: "ليالي عربية مكثفة",
    category: "unisex",
    description: "Step into the mystique of desert nights where ancient caravans carried the world's most precious treasures. This masterfully blended fragrance captures the warmth of amber mixed with the cool freshness of desert winds. Rare frankincense and myrrh create an almost spiritual experience, while the base of leather and oud tells stories of adventures across endless dunes. A timeless creation for souls who seek the extraordinary.",
    topNotes: ["Frankincense", "Bergamot", "Pink Pepper"],
    heartNotes: ["Myrrh", "Rose", "Incense"],
    baseNotes: ["Leather", "Oud", "Amber", "Vanilla"],
    sizes: [
      { size: "50ml", price: 520, stock: 8 },
      { size: "100ml", price: 890, stock: 5 },
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    featured: true,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05"
  },
  {
    id: "4",
    slug: "imperial-saffron",
    nameEn: "Imperial Saffron",
    nameAr: "زعفران إمبراطوري",
    category: "men",
    description: "A bold declaration of power and sophistication. This commanding fragrance showcases the finest Kashmiri saffron, harvested at dawn when its aromatic properties are at their peak. The golden threads weave through a heart of leather and tobacco, creating an addictive warmth that speaks of confidence and success. The foundation of oud and sandalwood ensures this scent leaves an unforgettable impression in every room.",
    topNotes: ["Kashmiri Saffron", "Cinnamon", "Cardamom"],
    heartNotes: ["Leather", "Tobacco", "Rose"],
    baseNotes: ["Oud", "Sandalwood", "Musk", "Tonka Bean"],
    sizes: [
      { size: "50ml", price: 420, stock: 18 },
      { size: "100ml", price: 720, stock: 9 },
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    featured: false,
    createdAt: "2024-02-01",
    updatedAt: "2024-02-01"
  },
  {
    id: "5",
    slug: "midnight-jasmine",
    nameEn: "Midnight Jasmine",
    nameAr: "ياسمين منتصف الليل",
    category: "women",
    description: "Inspired by moonlit gardens where jasmine blooms release their most intoxicating perfume. This sensual creation captures the heady sweetness of night-blooming jasmine, enhanced by the exotic warmth of tuberose and ylang-ylang. A touch of sandalwood and white musk creates a soft, powdery embrace that lingers on the skin like a whispered secret. For the woman who embodies grace and mystery.",
    topNotes: ["Neroli", "Mandarin", "Pink Pepper"],
    heartNotes: ["Indian Jasmine", "Tuberose", "Ylang-Ylang"],
    baseNotes: ["Sandalwood", "White Musk", "Vanilla", "Cedar"],
    sizes: [
      { size: "50ml", price: 340, stock: 25 },
      { size: "100ml", price: 580, stock: 15 },
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    featured: true,
    createdAt: "2024-02-10",
    updatedAt: "2024-02-10"
  },
  {
    id: "6",
    slug: "amber-elixir",
    nameEn: "Amber Elixir",
    nameAr: "إكسير العنبر",
    category: "unisex",
    description: "A liquid gold tribute to the legendary amber of the Orient. This sophisticated blend opens with the warmth of ancient amber, enhanced by precious resins that have been treasured for millennia. The heart reveals a bouquet of spices including cardamom and cinnamon, while the base offers a rich tapestry of benzoin, labdanum, and aged woods. A fragrance that transforms the wearer into a living work of art.",
    topNotes: ["Amber", "Bergamot", "Orange Blossom"],
    heartNotes: ["Cardamom", "Cinnamon", "Nutmeg"],
    baseNotes: ["Benzoin", "Labdanum", "Vetiver", "Oud"],
    sizes: [
      { size: "50ml", price: 390, stock: 22 },
      { size: "100ml", price: 670, stock: 11 },
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    featured: false,
    createdAt: "2024-02-15",
    updatedAt: "2024-02-15"
  },
  {
    id: "7",
    slug: "platinum-musk",
    nameEn: "Platinum Musk",
    nameAr: "مسك البلاتين",
    category: "men",
    description: "The epitome of modern masculinity wrapped in timeless elegance. This refined composition showcases the purest white musk, elevated by cooling notes of lavender and mint. The heart reveals a sophisticated blend of violet leaf and iris, while the base grounds the fragrance with premium sandalwood and ambergris. Clean yet complex, this is the signature scent for the contemporary gentleman.",
    topNotes: ["Lavender", "Mint", "Bergamot"],
    heartNotes: ["Violet Leaf", "Iris", "Geranium"],
    baseNotes: ["White Musk", "Sandalwood", "Ambergris", "Cedar"],
    sizes: [
      { size: "50ml", price: 360, stock: 30 },
      { size: "100ml", price: 620, stock: 18 },
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    featured: false,
    createdAt: "2024-03-01",
    updatedAt: "2024-03-01"
  },
  {
    id: "8",
    slug: "golden-orchid",
    nameEn: "Golden Orchid",
    nameAr: "السحلبية الذهبية",
    category: "women",
    description: "An exotic journey to tropical paradises where rare orchids bloom in secret gardens. This luxurious fragrance captures the ethereal beauty of golden orchid, enhanced by notes of exotic fruits and precious spices. The heart blooms with jasmine and magnolia, while the base embraces you in rich vanilla, patchouli, and precious woods. A statement fragrance for the woman who refuses to be ordinary.",
    topNotes: ["Golden Orchid", "Passion Fruit", "Pink Pepper"],
    heartNotes: ["Jasmine", "Magnolia", "Ylang-Ylang"],
    baseNotes: ["Vanilla", "Patchouli", "Sandalwood", "Musk"],
    sizes: [
      { size: "50ml", price: 410, stock: 16 },
      { size: "100ml", price: 700, stock: 8 },
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    featured: false,
    createdAt: "2024-03-10",
    updatedAt: "2024-03-10"
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};

export const getProductsByCategory = (category: 'men' | 'women' | 'unisex'): Product[] => {
  return products.filter(p => p.category === category);
};
