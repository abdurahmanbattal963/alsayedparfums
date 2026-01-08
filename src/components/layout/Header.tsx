import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, User, Shield, UserCircle, Package } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { getCartCount, openCart } = useCart();
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const location = useLocation();
  const cartCount = getCartCount();

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      const { data } = await supabase.rpc('has_role', {
        _user_id: user.id,
        _role: 'admin',
      });

      setIsAdmin(data || false);
    };

    checkAdminRole();
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/shop', label: t('nav.shop') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const isHomePage = location.pathname === '/';
  const headerBg = isScrolled || !isHomePage 
    ? 'bg-background/95 backdrop-blur-md shadow-sm' 
    : 'bg-transparent';
  const textColor = isScrolled || !isHomePage ? 'text-foreground' : 'text-white';
  const logoColor = isScrolled || !isHomePage ? 'text-foreground' : 'text-white';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        headerBg
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className={cn("flex items-center justify-between h-20 lg:h-24", isRTL && "flex-row-reverse")}>
          {/* Logo */}
          <Link to="/" className={cn("flex flex-col", isRTL ? "items-end" : "items-start")}>
            <span className={cn(
              'text-xl lg:text-2xl font-display font-semibold tracking-ultra-wide transition-colors duration-300',
              logoColor
            )}>
              ALSAYED
            </span>
            <span className={cn(
              'text-[10px] lg:text-xs tracking-[0.3em] uppercase transition-colors duration-300',
              isScrolled || !isHomePage ? 'text-gold' : 'text-gold-light'
            )}>
              PERFUMES
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={cn("hidden lg:flex items-center gap-10", isRTL && "flex-row-reverse")}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-sm tracking-widest uppercase font-medium animated-underline transition-colors duration-300',
                  textColor,
                  location.pathname === link.href && 'text-gold'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className={cn("flex items-center gap-4 lg:gap-6", isRTL && "flex-row-reverse")}>
            <button
              className={cn(
                'hidden lg:block transition-colors duration-300 hover:text-gold',
                textColor
              )}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={openCart}
              className={cn(
                'relative transition-colors duration-300 hover:text-gold',
                textColor
              )}
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className={cn(
                  "absolute -top-2 bg-gold text-primary text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center",
                  isRTL ? "-left-2" : "-right-2"
                )}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Track Order Link */}
            <Link
              to="/track-order"
              className={cn(
                'hidden lg:flex items-center gap-2 transition-colors duration-300 hover:text-gold text-sm',
                textColor
              )}
              aria-label={t('nav.trackOrder')}
            >
              <Package className="w-5 h-5" />
            </Link>

            {/* Language Toggle */}
            <div className="hidden lg:block">
              <LanguageToggle className={textColor} />
            </div>

            {/* Theme Toggle */}
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

            {/* Admin Link */}
            {isAdmin && (
              <Link
                to="/admin"
                className={cn(
                  'hidden lg:flex items-center gap-2 transition-colors duration-300 hover:text-gold text-sm',
                  textColor
                )}
                aria-label="Admin Dashboard"
              >
                <Shield className="w-5 h-5" />
              </Link>
            )}

            {/* User Profile & Auth */}
            {user ? (
              <Link
                to="/profile"
                className={cn(
                  'hidden lg:flex items-center gap-2 transition-colors duration-300 hover:text-gold text-sm',
                  textColor
                )}
                aria-label="Profile"
              >
                <UserCircle className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                to="/auth"
                className={cn(
                  'hidden lg:flex items-center gap-2 transition-colors duration-300 hover:text-gold text-sm',
                  textColor
                )}
              >
                <User className="w-5 h-5" />
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn('lg:hidden transition-colors duration-300', textColor)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 top-20 bg-background z-40 transition-all duration-500 ease-in-out',
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'text-2xl font-display tracking-widest uppercase transition-all duration-300 hover:text-gold',
                location.pathname === link.href ? 'text-gold' : 'text-foreground',
                isMobileMenuOpen && 'animate-fade-in'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.label}
            </Link>
          ))}

          {/* Track Order Mobile */}
          <Link
            to="/track-order"
            className="text-2xl font-display tracking-widest uppercase transition-all duration-300 hover:text-gold text-foreground animate-fade-in"
            style={{ animationDelay: `${navLinks.length * 100}ms` }}
          >
            {t('nav.trackOrder')}
          </Link>
          
          {/* Mobile Language & Theme Toggle */}
          <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: `${(navLinks.length + 1) * 100}ms` }}>
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* Mobile Admin Link */}
          {isAdmin && (
            <Link
              to="/admin"
              className="text-2xl font-display tracking-widest uppercase transition-all duration-300 hover:text-gold text-gold animate-fade-in"
              style={{ animationDelay: `${(navLinks.length + 2) * 100}ms` }}
            >
              {t('nav.admin')}
            </Link>
          )}
          
          {/* Mobile Profile & Auth Links */}
          {user ? (
            <Link
              to="/profile"
              className="text-2xl font-display tracking-widest uppercase transition-all duration-300 hover:text-gold text-foreground animate-fade-in"
              style={{ animationDelay: `${(navLinks.length + (isAdmin ? 3 : 2)) * 100}ms` }}
            >
              {t('nav.profile')}
            </Link>
          ) : (
            <Link
              to="/auth"
              className="text-2xl font-display tracking-widest uppercase transition-all duration-300 hover:text-gold text-foreground animate-fade-in"
              style={{ animationDelay: `${(navLinks.length + 2) * 100}ms` }}
            >
              {t('nav.signIn')}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
