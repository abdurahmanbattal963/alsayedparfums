import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

interface ProductSize {
  size: string;
  price: number;
  stock: number;
}

interface Product {
  id: string;
  name_en: string;
  name_ar: string;
  slug: string;
  category: string;
  description_en: string | null;
  description_ar: string | null;
  top_notes: string[] | null;
  heart_notes: string[] | null;
  base_notes: string[] | null;
  sizes: ProductSize[];
  image_url: string | null;
  is_featured: boolean;
}

interface ProductFormDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductFormDialog = ({ open, onClose, product }: ProductFormDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name_en: '',
    name_ar: '',
    slug: '',
    category: 'unisex',
    description_en: '',
    description_ar: '',
    top_notes: '',
    heart_notes: '',
    base_notes: '',
    image_url: '',
    is_featured: false,
  });
  const [sizes, setSizes] = useState<ProductSize[]>([{ size: '50ml', price: 0, stock: 0 }]);

  useEffect(() => {
    if (product) {
      setFormData({
        name_en: product.name_en,
        name_ar: product.name_ar,
        slug: product.slug,
        category: product.category,
        description_en: product.description_en || '',
        description_ar: product.description_ar || '',
        top_notes: product.top_notes?.join(', ') || '',
        heart_notes: product.heart_notes?.join(', ') || '',
        base_notes: product.base_notes?.join(', ') || '',
        image_url: product.image_url || '',
        is_featured: product.is_featured,
      });
      setSizes(product.sizes.length > 0 ? product.sizes : [{ size: '50ml', price: 0, stock: 0 }]);
    } else {
      setFormData({
        name_en: '',
        name_ar: '',
        slug: '',
        category: 'unisex',
        description_en: '',
        description_ar: '',
        top_notes: '',
        heart_notes: '',
        base_notes: '',
        image_url: '',
        is_featured: false,
      });
      setSizes([{ size: '50ml', price: 0, stock: 0 }]);
    }
  }, [product, open]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const parseNotes = (notes: string) => 
      notes.split(',').map(n => n.trim()).filter(n => n.length > 0);

    const productData = {
      name_en: formData.name_en,
      name_ar: formData.name_ar,
      slug: formData.slug || generateSlug(formData.name_en),
      category: formData.category,
      description_en: formData.description_en || null,
      description_ar: formData.description_ar || null,
      top_notes: parseNotes(formData.top_notes),
      heart_notes: parseNotes(formData.heart_notes),
      base_notes: parseNotes(formData.base_notes),
      sizes: JSON.parse(JSON.stringify(sizes)),
      image_url: formData.image_url || null,
      is_featured: formData.is_featured,
    };

    try {
      if (product) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);
        
        if (error) throw error;
        toast.success('Product updated successfully');
      } else {
        const { error } = await supabase.from('products').insert([productData]);
        if (error) throw error;
        toast.success('Product created successfully');
      }
      onClose();
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast.error(error.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const addSize = () => {
    setSizes([...sizes, { size: '', price: 0, stock: 0 }]);
  };

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const updateSize = (index: number, field: keyof ProductSize, value: string | number) => {
    const updated = [...sizes];
    updated[index] = { ...updated[index], [field]: value };
    setSizes(updated);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name_en">Name (English) *</Label>
              <Input
                id="name_en"
                value={formData.name_en}
                onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="name_ar">Name (Arabic) *</Label>
              <Input
                id="name_ar"
                value={formData.name_ar}
                onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                className="font-arabic text-right"
                dir="rtl"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="auto-generated if empty"
              />
            </div>
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="men">Men</SelectItem>
                  <SelectItem value="women">Women</SelectItem>
                  <SelectItem value="unisex">Unisex</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description_en">Description (English)</Label>
            <Textarea
              id="description_en"
              value={formData.description_en}
              onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="description_ar">Description (Arabic)</Label>
            <Textarea
              id="description_ar"
              value={formData.description_ar}
              onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
              className="font-arabic text-right"
              dir="rtl"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="top_notes">Top Notes</Label>
              <Input
                id="top_notes"
                value={formData.top_notes}
                onChange={(e) => setFormData({ ...formData, top_notes: e.target.value })}
                placeholder="Comma separated"
              />
            </div>
            <div>
              <Label htmlFor="heart_notes">Heart Notes</Label>
              <Input
                id="heart_notes"
                value={formData.heart_notes}
                onChange={(e) => setFormData({ ...formData, heart_notes: e.target.value })}
                placeholder="Comma separated"
              />
            </div>
            <div>
              <Label htmlFor="base_notes">Base Notes</Label>
              <Input
                id="base_notes"
                value={formData.base_notes}
                onChange={(e) => setFormData({ ...formData, base_notes: e.target.value })}
                placeholder="Comma separated"
              />
            </div>
          </div>

          <div>
            <Label>Sizes & Pricing *</Label>
            <div className="space-y-2 mt-2">
              {sizes.map((size, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    placeholder="Size (e.g., 50ml)"
                    value={size.size}
                    onChange={(e) => updateSize(index, 'size', e.target.value)}
                    className="w-24"
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={size.price}
                    onChange={(e) => updateSize(index, 'price', parseFloat(e.target.value) || 0)}
                    className="w-24"
                  />
                  <Input
                    type="number"
                    placeholder="Stock"
                    value={size.stock}
                    onChange={(e) => updateSize(index, 'stock', parseInt(e.target.value) || 0)}
                    className="w-24"
                  />
                  {sizes.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeSize(index)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addSize}>
                <Plus className="w-4 h-4 mr-1" /> Add Size
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="is_featured"
              checked={formData.is_featured}
              onCheckedChange={(v) => setFormData({ ...formData, is_featured: v })}
            />
            <Label htmlFor="is_featured">Featured Product</Label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-gold text-primary hover:bg-gold-light">
              {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
