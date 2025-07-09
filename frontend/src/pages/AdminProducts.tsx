import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useMarketplace } from '@/contexts/MarketplaceContext';
import { useToast } from '@/hooks/use-toast';

const AdminProducts: React.FC = () => {
  const { products, user, addProduct, categories } = useMarketplace();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);

  const initialFormState = {
    name: '',
    description: '',
    price: '',
    category: '',
    image: '/api/placeholder/400/400', // URL de imagem de exemplo
    stock: '',
    supplierUrl: '',
    supplierPrice: '',
  };
  const [formData, setFormData] = useState(initialFormState);

  if (!user?.isSeller) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Package className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Acesso Restrito</h1>
        <p className="text-muted-foreground">Apenas vendedores podem acessar esta página.</p>
      </div>
    );
  }

  // A função de submissão agora é async e chama a nova função addProduct do contexto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productDataForApi = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image,
      rating: 0, // Valor padrão
      stock: parseInt(formData.stock),
      seller: user.name, // Adiciona o nome do vendedor
      featured: false, // Valor padrão
      supplierUrl: formData.supplierUrl,
      supplierPrice: parseFloat(formData.supplierPrice),
    };

    const success = await addProduct(productDataForApi);

    if (success) {
      toast({ title: 'Produto adicionado com sucesso!' });
      setIsDialogOpen(false);
      setFormData(initialFormState);
    } else {
      toast({ title: 'Erro ao adicionar produto', description: 'Verifique os dados ou o console para mais detalhes.', variant: 'destructive' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Meus Produtos</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProduct(null)}><Plus className="h-4 w-4 mr-2" />Novo Produto</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Produto</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} required />
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} required />
              </div>
              <div>
                <Label htmlFor="price">Preço de Venda (R$)</Label>
                <Input id="price" type="number" step="0.01" value={formData.price} onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))} required />
              </div>
              <div>
                <Label htmlFor="supplierPrice">Preço do Fornecedor (R$)</Label>
                <Input id="supplierPrice" type="number" step="0.01" value={formData.supplierPrice} onChange={(e) => setFormData(prev => ({ ...prev, supplierPrice: e.target.value }))} required />
              </div>
              <div>
                <Label htmlFor="supplierUrl">URL do Produto no Fornecedor</Label>
                <Input id="supplierUrl" value={formData.supplierUrl} onChange={(e) => setFormData(prev => ({ ...prev, supplierUrl: e.target.value }))} required />
              </div>
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))} required>
                  <SelectTrigger><SelectValue placeholder="Selecione uma categoria" /></SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (cat !== 'Todas' && <SelectItem key={cat} value={cat}>{cat}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="stock">Estoque</Label>
                <Input id="stock" type="number" value={formData.stock} onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))} required />
              </div>
              <Button type="submit" className="w-full">{editingProduct ? 'Atualizar Produto' : 'Adicionar Produto'}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.filter(p => p.seller === user?.name).map(product => (
          <Card key={product.id}>
            <CardHeader className='p-0'><img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" /></CardHeader>
            <CardContent className='p-4'>
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-primary font-bold mb-2">R$ {product.price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mb-4">Estoque: {product.stock}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;