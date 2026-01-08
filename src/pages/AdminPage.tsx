import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Users, ShoppingBag } from 'lucide-react';
import OrdersTable from '@/components/admin/OrdersTable';
import CustomersTable from '@/components/admin/CustomersTable';
import ProductsTable from '@/components/admin/ProductsTable';
import AdminStats from '@/components/admin/AdminStats';

const AdminPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setCheckingRole(false);
        return;
      }

      const { data, error } = await supabase.rpc('has_role', {
        _user_id: user.id,
        _role: 'admin',
      });

      if (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      } else {
        setIsAdmin(data);
      }
      setCheckingRole(false);
    };

    if (!loading) {
      checkAdminRole();
    }
  }, [user, loading]);

  useEffect(() => {
    if (!loading && !checkingRole) {
      if (!user) {
        navigate('/auth');
      } else if (!isAdmin) {
        navigate('/');
      }
    }
  }, [user, isAdmin, loading, checkingRole, navigate]);

  if (loading || checkingRole) {
    return (
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="animate-pulse text-gold">Loading...</div>
          </div>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <main className="min-h-screen pt-24 lg:pt-32 pb-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-semibold mb-2">Admin Dashboard</h1>
          <p className="font-arabic text-lg text-gold">لوحة التحكم</p>
        </div>

        <AdminStats />

        <Tabs defaultValue="orders" className="mt-8">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="orders" className="data-[state=active]:bg-gold data-[state=active]:text-primary">
              <Package className="w-4 h-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-gold data-[state=active]:text-primary">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="customers" className="data-[state=active]:bg-gold data-[state=active]:text-primary">
              <Users className="w-4 h-4 mr-2" />
              Customers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <OrdersTable />
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <ProductsTable />
          </TabsContent>

          <TabsContent value="customers" className="mt-6">
            <CustomersTable />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default AdminPage;
