import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ProductSize {
  size: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  slug: string;
  category: 'men' | 'women' | 'unisex';
  description: string;
  descriptionAr?: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  sizes: ProductSize[];
  images: string[];
  featured: boolean;
  createdAt: string;
}

// Transform Supabase product to app Product type
const transformProduct = (dbProduct: any): Product => {
  return {
    id: dbProduct.id,
    nameEn: dbProduct.name_en,
    nameAr: dbProduct.name_ar,
    slug: dbProduct.slug,
    category: dbProduct.category as 'men' | 'women' | 'unisex',
    description: dbProduct.description_en || '',
    descriptionAr: dbProduct.description_ar,
    topNotes: dbProduct.top_notes || [],
    heartNotes: dbProduct.heart_notes || [],
    baseNotes: dbProduct.base_notes || [],
    sizes: (dbProduct.sizes as ProductSize[]) || [],
    images: dbProduct.image_url ? [dbProduct.image_url] : ['/placeholder.svg'],
    featured: dbProduct.is_featured || false,
    createdAt: dbProduct.created_at,
  };
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data.map(transformProduct);
    },
  });
};

export const useProduct = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      if (!slug) return null;
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;
      
      return transformProduct(data);
    },
    enabled: !!slug,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data.map(transformProduct);
    },
  });
};

export const useProductById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['product', 'id', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;
      
      return transformProduct(data);
    },
    enabled: !!id,
  });
};
