import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Package, MapPin, Phone, Mail, Save, LogOut, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { countries, getRegionsByCountry } from '@/data/countries';

interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  emirate: string | null;
  city: string | null;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
}

const ProfilePage = () => {
  const { user, loading, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [saving, setSaving] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('SY');
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: '',
    emirate: '',
    city: '',
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        setProfile(data);
        setFormData({
          full_name: data.full_name || '',
          phone: data.phone || '',
          address: data.address || '',
          emirate: data.emirate || '',
          city: data.city || '',
        });
      }
    };

    const fetchOrders = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('orders')
        .select('id, order_number, status, total, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data) setOrders(data);
    };

    fetchProfile();
    fetchOrders();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    const { error } = await supabase
      .from('profiles')
      .update(formData)
      .eq('id', user.id);

    if (error) {
      toast.error('Failed to update profile');
    } else {
      toast.success('Profile updated successfully');
    }
    setSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const regions = getRegionsByCountry(selectedCountry);

  if (loading) {
    return (
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse text-gold">{t('common.loading')}</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 lg:pt-32 pb-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-semibold mb-2">{t('profile.title')}</h1>
          <p className="font-arabic text-lg text-gold">{t('profile.subtitle')}</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="profile" className="data-[state=active]:bg-gold data-[state=active]:text-primary">
              <User className="w-4 h-4 mr-2" />
              {t('profile.tab.profile')}
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-gold data-[state=active]:text-primary">
              <Package className="w-4 h-4 mr-2" />
              {t('profile.tab.orders')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="bg-card border border-border p-6 max-w-2xl">
              <h2 className="font-display text-xl mb-6">{t('profile.personal')}</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" /> {t('profile.email')}
                  </Label>
                  <Input id="email" value={user?.email || ''} disabled className="mt-1 bg-muted" />
                </div>

                <div>
                  <Label htmlFor="full_name" className="flex items-center gap-2">
                    <User className="w-4 h-4" /> {t('profile.fullName')}
                  </Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> {t('profile.phone')}
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1"
                    placeholder={countries.find(c => c.code === selectedCountry)?.phoneCode}
                  />
                </div>

                <div>
                  <Label htmlFor="country" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {t('profile.country')}
                  </Label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.nameEn} - {country.nameAr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {regions.length > 0 && (
                  <div>
                    <Label htmlFor="emirate">{t('profile.region')}</Label>
                    <Select value={formData.emirate} onValueChange={(v) => setFormData({ ...formData, emirate: v })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={t('profile.selectRegion')} />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="city">{t('profile.city')}</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="address">{t('profile.address')}</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="mt-1"
                    placeholder={t('profile.addressPlaceholder')}
                  />
                </div>

                <Button onClick={handleSave} disabled={saving} className="btn-gold mt-4">
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? t('profile.saving') : t('profile.save')}
                </Button>
              </div>

              {/* Sign Out Button */}
              <div className="mt-8 pt-6 border-t border-border">
                <Button 
                  onClick={handleSignOut} 
                  variant="outline" 
                  className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('profile.signOut')}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="bg-card border border-border p-6">
              <h2 className="font-display text-xl mb-6">{t('profile.orderHistory')}</h2>
              
              {orders.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">{t('profile.noOrders')}</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-border p-4 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="font-medium">{order.order_number}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                        <span className="text-gold font-medium">${order.total.toFixed(2)}</span>
                        <Link 
                          to={`/track-order?order=${order.order_number}`}
                          className="text-sm text-muted-foreground hover:text-gold flex items-center gap-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ProfilePage;
