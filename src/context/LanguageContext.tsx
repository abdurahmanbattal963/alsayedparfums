import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    'nav.profile': 'My Account',
    'nav.signIn': 'Sign In',
    'nav.signOut': 'Sign Out',
    'nav.trackOrder': 'Track Order',

    // Home Page
    'home.hero.subtitle': 'Fragrances that embody luxury and refined taste',
    'home.hero.explore': 'Explore Collection',
    'home.hero.story': 'Our Story',
    'home.featured.label': 'Curated Selection',
    'home.featured.title': 'Featured Fragrances',
    'home.featured.subtitle': 'Distinctive fragrances for exceptional taste',
    'home.featured.viewAll': 'View All Collection',
    'home.crafted.label': 'The Art of Fragrance',
    'home.crafted.title': 'Crafted for',
    'home.crafted.titleGold': 'Excellence',
    'home.crafted.desc': 'At ALSAYED PERFUMES, we believe that fragrance is more than a scent—it\'s an expression of identity. Our master perfumers blend the rarest ingredients from across the globe to create compositions that transcend time and trend.',
    'home.crafted.arabic': 'Every drop tells a story of luxury and distinction',
    'home.crafted.discover': 'Discover Our Heritage',
    'home.promise.label': 'Our Promise',
    'home.promise.title': 'Why Choose ALSAYED',
    'home.promise.subtitle': 'Why we are the best',
    'home.cta.label': 'Begin Your Journey',
    'home.cta.title': 'Find Your Signature Scent',
    'home.cta.subtitle': 'Discover your distinctive fragrance',
    'home.cta.desc': 'Every fragrance tells a story. Let us help you discover the scent that perfectly captures your essence and leaves an unforgettable impression.',
    'home.cta.shop': 'Shop Now',
    'home.cta.advice': 'Get Expert Advice',

    // Features
    'feature.quality': 'Premium Quality',
    'feature.quality.ar': 'جودة فائقة',
    'feature.quality.desc': 'Only the finest ingredients sourced from around the world',
    'feature.authentic': 'Authenticity Guaranteed',
    'feature.authentic.ar': 'أصالة مضمونة',
    'feature.authentic.desc': '100% authentic fragrances with certificate of origin',
    'feature.delivery': 'Luxury Delivery',
    'feature.delivery.ar': 'توصيل فاخر',
    'feature.delivery.desc': 'Premium packaging and white-glove delivery service',
    'feature.curation': 'Expert Curation',
    'feature.curation.ar': 'اختيار متخصص',
    'feature.curation.desc': 'Hand-selected by world-renowned perfume experts',

    // Shop Page
    'shop.label': 'Our Collection',
    'shop.title': 'Luxury Fragrances',
    'shop.subtitle': 'Our luxury fragrance collection',
    'shop.search': 'Search fragrances...',
    'shop.filters': 'Filters',
    'shop.categories': 'Categories',
    'shop.priceRange': 'Price Range',
    'shop.apply': 'Apply Filters',
    'shop.clear': 'Clear All Filters',
    'shop.showing': 'Showing',
    'shop.fragrances': 'fragrances',
    'shop.noResults': 'No fragrances found',
    'shop.noResultsDesc': 'Try adjusting your search or filter criteria',
    'shop.all': 'All Fragrances',
    'shop.men': "Men's Collection",
    'shop.women': "Women's Collection",
    'shop.unisex': 'Unisex Collection',
    'shop.newest': 'Newest First',
    'shop.priceLow': 'Price: Low to High',
    'shop.priceHigh': 'Price: High to Low',
    'shop.nameAZ': 'Name: A-Z',

    // Product
    'product.addToCart': 'Add to Cart',
    'product.selectSize': 'Select Size',

    // About Page
    'about.label': 'Our Story',
    'about.title': 'The Art of Luxury Fragrance',
    'about.subtitle': 'Four decades of creativity in the world of luxury perfumes',
    'about.intro': 'For over four decades, ALSAYED PERFUMES has been the epitome of luxury fragrance in the Middle East. Our journey began with a simple vision: to create scents that transcend time and touch the soul.',
    'about.heritage.label': 'Our Heritage',
    'about.heritage.title': 'A Legacy of',
    'about.heritage.titleGold': 'Excellence',
    'about.values.label': 'What Drives Us',
    'about.values.title': 'Our Values',
    'about.values.subtitle': 'Our values and principles',
    'about.journey.label': 'Our Journey',
    'about.journey.title': 'Milestones',
    'about.journey.subtitle': 'Stations in our journey',
    'about.cta.label': 'Experience Luxury',
    'about.cta.title': 'Discover Your Signature',
    'about.cta.subtitle': 'Discover your distinctive fragrance',
    'about.cta.desc': 'Every fragrance in our collection tells a unique story. Let us help you find the scent that perfectly captures your essence.',
    'about.cta.explore': 'Explore Our Collection',

    // Contact Page
    'contact.label': 'Get In Touch',
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Contact us',
    'contact.visit': 'Visit Our Boutique',
    'contact.call': 'Call Us',
    'contact.email': 'Email Us',
    'contact.hours': 'Opening Hours',
    'contact.form.label': 'Send a Message',
    'contact.form.title': "We'd Love to Hear From You",
    'contact.form.subtitle': 'We are happy to hear from you',
    'contact.form.name': 'Full Name',
    'contact.form.emailLabel': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.subject': 'Subject',
    'contact.form.selectSubject': 'Select a subject',
    'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'How can we help you?',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.sent': 'Message Sent',
    'contact.form.sentDesc': 'Thank you for reaching out. Our team will get back to you within 24 hours.',
    'contact.form.another': 'Send Another Message',
    'contact.map.title': 'Visit Our Flagship Boutique',

    // Profile Page
    'profile.title': 'My Account',
    'profile.subtitle': 'My Account',
    'profile.tab.profile': 'Profile',
    'profile.tab.orders': 'Orders',
    'profile.personal': 'Personal Information',
    'profile.email': 'Email',
    'profile.fullName': 'Full Name',
    'profile.phone': 'Phone',
    'profile.country': 'Country',
    'profile.region': 'Region / Governorate',
    'profile.selectRegion': 'Select region',
    'profile.city': 'City',
    'profile.address': 'Address',
    'profile.addressPlaceholder': 'Street, building, apartment...',
    'profile.save': 'Save Changes',
    'profile.saving': 'Saving...',
    'profile.orderHistory': 'Order History',
    'profile.noOrders': 'No orders yet',
    'profile.signOut': 'Sign Out',
    'profile.signOutConfirm': 'Are you sure you want to sign out?',

    // Order Tracking Page
    'tracking.label': 'Order Status',
    'tracking.title': 'Track Your Order',
    'tracking.subtitle': 'Track your order',
    'tracking.search': 'Enter order number...',
    'tracking.searchBtn': 'Track',
    'tracking.noOrder': 'Enter your order number to track its status',
    'tracking.notFound': 'Order not found',
    'tracking.notFoundDesc': 'Please check the order number and try again',
    'tracking.orderNumber': 'Order Number',
    'tracking.orderDate': 'Order Date',
    'tracking.status': 'Status',
    'tracking.total': 'Total',
    'tracking.items': 'Order Items',
    'tracking.shippingInfo': 'Shipping Information',
    'tracking.stages': 'Shipping Stages',
    'tracking.stage.pending': 'Order Placed',
    'tracking.stage.pending.desc': 'Your order has been received',
    'tracking.stage.processing': 'Processing',
    'tracking.stage.processing.desc': 'We are preparing your order',
    'tracking.stage.shipped': 'Shipped',
    'tracking.stage.shipped.desc': 'Your order is on its way',
    'tracking.stage.delivered': 'Delivered',
    'tracking.stage.delivered.desc': 'Order delivered successfully',

    // Footer
    'footer.desc': 'Crafting exceptional fragrances that embody luxury, sophistication, and timeless elegance since 1985.',
    'footer.tagline': 'Fragrances that embody luxury and refined taste',
    'footer.quickLinks': 'Quick Links',
    'footer.collections': 'Collections',
    'footer.contact': 'Contact Us',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.shipping': 'Shipping',

    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.subtotal': 'Subtotal',
    'cart.checkout': 'Checkout',
    'cart.continueShopping': 'Continue Shopping',

    // Auth
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.fullName': 'Full Name',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.back': 'Back',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.shop': 'المتجر',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.admin': 'لوحة التحكم',
    'nav.profile': 'حسابي',
    'nav.signIn': 'تسجيل الدخول',
    'nav.signOut': 'تسجيل الخروج',
    'nav.trackOrder': 'تتبع الطلب',

    // Home Page
    'home.hero.subtitle': 'عطور تُجسد الفخامة والذوق الرفيع',
    'home.hero.explore': 'استكشف المجموعة',
    'home.hero.story': 'قصتنا',
    'home.featured.label': 'مختارات مميزة',
    'home.featured.title': 'عطور مميزة',
    'home.featured.subtitle': 'عطور مميزة لذوق استثنائي',
    'home.featured.viewAll': 'عرض كل المجموعة',
    'home.crafted.label': 'فن العطور',
    'home.crafted.title': 'صُنعت من أجل',
    'home.crafted.titleGold': 'التميز',
    'home.crafted.desc': 'في عطور السيد، نؤمن بأن العطر أكثر من مجرد رائحة - إنه تعبير عن الهوية. يمزج عطارونا المتمرسون أندر المكونات من جميع أنحاء العالم لابتكار تركيبات تتجاوز الزمن والموضة.',
    'home.crafted.arabic': 'كل قطرة تحكي قصة من الفخامة والتميز',
    'home.crafted.discover': 'اكتشف تراثنا',
    'home.promise.label': 'وعدنا',
    'home.promise.title': 'لماذا تختار السيد',
    'home.promise.subtitle': 'لماذا نحن الأفضل',
    'home.cta.label': 'ابدأ رحلتك',
    'home.cta.title': 'اعثر على عطرك المميز',
    'home.cta.subtitle': 'اكتشف عطرك المميز',
    'home.cta.desc': 'كل عطر يحكي قصة. دعنا نساعدك في اكتشاف العطر الذي يجسد شخصيتك بشكل مثالي ويترك انطباعًا لا يُنسى.',
    'home.cta.shop': 'تسوق الآن',
    'home.cta.advice': 'احصل على نصيحة خبير',

    // Features
    'feature.quality': 'جودة فائقة',
    'feature.quality.ar': 'جودة فائقة',
    'feature.quality.desc': 'فقط أجود المكونات المستوردة من حول العالم',
    'feature.authentic': 'أصالة مضمونة',
    'feature.authentic.ar': 'أصالة مضمونة',
    'feature.authentic.desc': 'عطور أصلية 100% مع شهادة المنشأ',
    'feature.delivery': 'توصيل فاخر',
    'feature.delivery.ar': 'توصيل فاخر',
    'feature.delivery.desc': 'تغليف فاخر وخدمة توصيل متميزة',
    'feature.curation': 'اختيار متخصص',
    'feature.curation.ar': 'اختيار متخصص',
    'feature.curation.desc': 'مختارة بعناية من خبراء العطور العالميين',

    // Shop Page
    'shop.label': 'مجموعتنا',
    'shop.title': 'العطور الفاخرة',
    'shop.subtitle': 'مجموعة العطور الفاخرة',
    'shop.search': 'ابحث عن العطور...',
    'shop.filters': 'الفلاتر',
    'shop.categories': 'الفئات',
    'shop.priceRange': 'نطاق السعر',
    'shop.apply': 'تطبيق الفلاتر',
    'shop.clear': 'مسح كل الفلاتر',
    'shop.showing': 'عرض',
    'shop.fragrances': 'عطر',
    'shop.noResults': 'لم يتم العثور على عطور',
    'shop.noResultsDesc': 'جرب تعديل البحث أو معايير الفلتر',
    'shop.all': 'جميع العطور',
    'shop.men': 'عطور رجالية',
    'shop.women': 'عطور نسائية',
    'shop.unisex': 'عطور للجنسين',
    'shop.newest': 'الأحدث أولاً',
    'shop.priceLow': 'السعر: من الأقل للأعلى',
    'shop.priceHigh': 'السعر: من الأعلى للأقل',
    'shop.nameAZ': 'الاسم: أ-ي',

    // Product
    'product.addToCart': 'أضف للسلة',
    'product.selectSize': 'اختر الحجم',

    // About Page
    'about.label': 'قصتنا',
    'about.title': 'فن العطور الفاخرة',
    'about.subtitle': 'أربعة عقود من الإبداع في عالم العطور الفاخرة',
    'about.intro': 'على مدار أربعة عقود، كانت عطور السيد رمزًا للعطور الفاخرة في الشرق الأوسط. بدأت رحلتنا برؤية بسيطة: ابتكار عطور تتجاوز الزمن وتلامس الروح.',
    'about.heritage.label': 'تراثنا',
    'about.heritage.title': 'إرث من',
    'about.heritage.titleGold': 'التميز',
    'about.values.label': 'ما يحركنا',
    'about.values.title': 'قيمنا',
    'about.values.subtitle': 'قيمنا ومبادئنا',
    'about.journey.label': 'رحلتنا',
    'about.journey.title': 'محطات',
    'about.journey.subtitle': 'محطات في مسيرتنا',
    'about.cta.label': 'تجربة الفخامة',
    'about.cta.title': 'اكتشف عطرك المميز',
    'about.cta.subtitle': 'اكتشف عطرك المميز',
    'about.cta.desc': 'كل عطر في مجموعتنا يحكي قصة فريدة. دعنا نساعدك في العثور على العطر الذي يجسد شخصيتك بشكل مثالي.',
    'about.cta.explore': 'استكشف مجموعتنا',

    // Contact Page
    'contact.label': 'تواصل معنا',
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'تواصل معنا',
    'contact.visit': 'زورونا',
    'contact.call': 'اتصل بنا',
    'contact.email': 'راسلنا',
    'contact.hours': 'ساعات العمل',
    'contact.form.label': 'أرسل رسالة',
    'contact.form.title': 'نسعد بتواصلكم معنا',
    'contact.form.subtitle': 'نسعد بتواصلكم معنا',
    'contact.form.name': 'الاسم الكامل',
    'contact.form.emailLabel': 'البريد الإلكتروني',
    'contact.form.phone': 'رقم الهاتف',
    'contact.form.subject': 'الموضوع',
    'contact.form.selectSubject': 'اختر موضوعًا',
    'contact.form.message': 'الرسالة',
    'contact.form.messagePlaceholder': 'كيف يمكننا مساعدتك؟',
    'contact.form.send': 'إرسال الرسالة',
    'contact.form.sending': 'جاري الإرسال...',
    'contact.form.sent': 'تم إرسال الرسالة',
    'contact.form.sentDesc': 'شكراً لتواصلك معنا. سيرد عليك فريقنا خلال 24 ساعة.',
    'contact.form.another': 'إرسال رسالة أخرى',
    'contact.map.title': 'زوروا متجرنا الرئيسي',

    // Profile Page
    'profile.title': 'حسابي',
    'profile.subtitle': 'حسابي',
    'profile.tab.profile': 'الملف الشخصي',
    'profile.tab.orders': 'الطلبات',
    'profile.personal': 'المعلومات الشخصية',
    'profile.email': 'البريد الإلكتروني',
    'profile.fullName': 'الاسم الكامل',
    'profile.phone': 'الهاتف',
    'profile.country': 'البلد',
    'profile.region': 'المنطقة / المحافظة',
    'profile.selectRegion': 'اختر المنطقة',
    'profile.city': 'المدينة',
    'profile.address': 'العنوان',
    'profile.addressPlaceholder': 'الشارع، البناء، الشقة...',
    'profile.save': 'حفظ التغييرات',
    'profile.saving': 'جاري الحفظ...',
    'profile.orderHistory': 'سجل الطلبات',
    'profile.noOrders': 'لا توجد طلبات بعد',
    'profile.signOut': 'تسجيل الخروج',
    'profile.signOutConfirm': 'هل أنت متأكد أنك تريد تسجيل الخروج؟',

    // Order Tracking Page
    'tracking.label': 'حالة الطلب',
    'tracking.title': 'تتبع طلبك',
    'tracking.subtitle': 'تتبع طلبك',
    'tracking.search': 'أدخل رقم الطلب...',
    'tracking.searchBtn': 'تتبع',
    'tracking.noOrder': 'أدخل رقم طلبك لتتبع حالته',
    'tracking.notFound': 'لم يتم العثور على الطلب',
    'tracking.notFoundDesc': 'يرجى التحقق من رقم الطلب والمحاولة مرة أخرى',
    'tracking.orderNumber': 'رقم الطلب',
    'tracking.orderDate': 'تاريخ الطلب',
    'tracking.status': 'الحالة',
    'tracking.total': 'الإجمالي',
    'tracking.items': 'عناصر الطلب',
    'tracking.shippingInfo': 'معلومات الشحن',
    'tracking.stages': 'مراحل الشحن',
    'tracking.stage.pending': 'تم الطلب',
    'tracking.stage.pending.desc': 'تم استلام طلبك',
    'tracking.stage.processing': 'قيد التجهيز',
    'tracking.stage.processing.desc': 'نحن نجهز طلبك',
    'tracking.stage.shipped': 'تم الشحن',
    'tracking.stage.shipped.desc': 'طلبك في الطريق',
    'tracking.stage.delivered': 'تم التوصيل',
    'tracking.stage.delivered.desc': 'تم توصيل الطلب بنجاح',

    // Footer
    'footer.desc': 'نصنع عطورًا استثنائية تجسد الفخامة والرقي والأناقة الخالدة منذ 1985.',
    'footer.tagline': 'عطور تُجسد الفخامة والذوق الرفيع',
    'footer.quickLinks': 'روابط سريعة',
    'footer.collections': 'المجموعات',
    'footer.contact': 'اتصل بنا',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'footer.shipping': 'الشحن',

    // Cart
    'cart.title': 'سلة التسوق',
    'cart.empty': 'سلة التسوق فارغة',
    'cart.subtotal': 'المجموع الفرعي',
    'cart.checkout': 'إتمام الشراء',
    'cart.continueShopping': 'متابعة التسوق',

    // Auth
    'auth.signIn': 'تسجيل الدخول',
    'auth.signUp': 'إنشاء حساب',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.fullName': 'الاسم الكامل',
    'auth.noAccount': 'ليس لديك حساب؟',
    'auth.hasAccount': 'لديك حساب بالفعل؟',

    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجاح',
    'common.cancel': 'إلغاء',
    'common.confirm': 'تأكيد',
    'common.back': 'رجوع',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'ar';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
