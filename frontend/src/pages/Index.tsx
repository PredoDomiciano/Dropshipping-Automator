import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMarketplace } from '@/contexts/MarketplaceContext';

const Index = () => {
  const { products, loading, error } = useMarketplace();

  if (loading) {
    return <div className="text-center p-10">Carregando produtos...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Erro ao carregar produtos: {error}</div>;
  }
  
  if (!products || products.length === 0) {
    return <div className="text-center p-10">Nenhum produto encontrado.</div>;
  }

  return (
    <div>
      <section className="bg-gradient-hero py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Encontre tudo o que precisa</h1>
          <p className="text-xl mb-8">Milhares de produtos com os melhores preços</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Nosso Catálogo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {products.map(product => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={product.image || '/api/placeholder/300/300'}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {product.discount && (
                      <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                        -{product.discount}%
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 h-12">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < (product.rating ?? 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">
                        ({product.reviews?.length ?? 0})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">
                          R$ {product.price?.toFixed(2) ?? '0.00'}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            R$ {product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Link to={`/product/${product.id}`}>
                        <Button size="sm">Ver</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;