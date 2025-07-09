import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Star, Filter, Grid, List, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMarketplace } from '@/contexts/MarketplaceContext';

const Index = () => {
  const { products, categories, searchProducts, filterProducts } = useMarketplace();
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const searchQuery = searchParams.get('search') || '';
    const categoryParam = searchParams.get('category') || 'All';
    
    let filtered = products;
    
    if (searchQuery) {
      filtered = searchProducts(searchQuery);
    }
    
    if (categoryParam !== 'All') {
      filtered = filterProducts(categoryParam);
    }
    
    setFilteredProducts(filtered);
    setSelectedCategory(categoryParam);
  }, [searchParams, products, searchProducts, filterProducts]);

  const applyFilters = () => {
    let filtered = products;
    
    if (selectedCategory !== 'All') {
      filtered = filterProducts(selectedCategory);
    }
    
    if (priceRange.min || priceRange.max) {
      filtered = filterProducts(
        selectedCategory,
        priceRange.min ? parseFloat(priceRange.min) : undefined,
        priceRange.max ? parseFloat(priceRange.max) : undefined
      );
    }
    
    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return a.name.localeCompare(b.name);
      }
    });
    
    setFilteredProducts(filtered);
  };

  const featuredProducts = products.filter(p => p.featured);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            Encontre tudo o que precisa
          </h1>
          <p className="text-xl mb-8 animate-fade-in-up">
            Milhares de produtos com os melhores preços
          </p>
          <div className="max-w-2xl mx-auto animate-scale-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
              <Input 
                placeholder="Buscar produtos..." 
                className="pl-10 py-3 text-lg text-foreground"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Produtos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <Card key={product.id} className="group hover:shadow-glow transition-all duration-300 animate-fade-in">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform"
                    />
                    {product.discount && (
                      <Badge className="absolute top-2 right-2 bg-destructive">
                        -{product.discount}%
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground ml-2">
                        ({product.reviews.length})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-primary">
                          R$ {product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            R$ {product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Link to={`/product/${product.id}`}>
                        <Button size="sm" className="animate-bounce-gentle">
                          Ver produto
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Listing */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Todos os Produtos</h2>
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nome</SelectItem>
                  <SelectItem value="price-low">Menor preço</SelectItem>
                  <SelectItem value="price-high">Maior preço</SelectItem>
                  <SelectItem value="rating">Mais avaliados</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
                {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Filter className="h-5 w-5 mr-2" />
                    <h3 className="font-semibold">Filtros</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Categoria</h4>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">Todas</SelectItem>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Faixa de Preço</h4>
                      <div className="space-y-2">
                        <Input
                          placeholder="Preço mínimo"
                          type="number"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                        />
                        <Input
                          placeholder="Preço máximo"
                          type="number"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                        />
                      </div>
                    </div>

                    <Button onClick={applyFilters} className="w-full">
                      Aplicar Filtros
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {filteredProducts.map(product => (
                  <Card key={product.id} className="group hover:shadow-medium transition-all duration-300">
                    <CardContent className="p-4">
                      <div className={`${viewMode === 'list' ? 'flex space-x-4' : ''}`}>
                        <div className={`${viewMode === 'list' ? 'w-24 h-24' : 'w-full h-48'} relative`}>
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover rounded"
                          />
                          {product.discount && (
                            <Badge className="absolute top-2 right-2 bg-destructive">
                              -{product.discount}%
                            </Badge>
                          )}
                        </div>
                        
                        <div className={`${viewMode === 'list' ? 'flex-1' : 'mt-4'}`}>
                          <h3 className="font-semibold mb-2">{product.name}</h3>
                          <div className="flex items-center mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground ml-2">
                              ({product.reviews.length})
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-xl font-bold text-primary">
                                R$ {product.price.toFixed(2)}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through ml-2">
                                  R$ {product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            <Link to={`/product/${product.id}`}>
                              <Button size="sm">Ver produto</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
