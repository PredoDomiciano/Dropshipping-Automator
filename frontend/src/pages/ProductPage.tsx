import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Plus, Minus, ShoppingCart, Heart, Shield, Truck, ArrowLeft, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useMarketplace } from '@/contexts/MarketplaceContext';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/contexts/MarketplaceContext';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, user, addReview } = useMarketplace();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const product = products.find(p => p.id === id);

  useEffect(() => {
    if (!product) return;
    setSelectedImage(0);
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Link to="/">
            <Button>Voltar ao início</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: 'Produto adicionado ao carrinho',
      description: `${quantity}x ${product.name}`
    });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: 'Faça login para avaliar',
        description: 'É necessário estar logado para deixar uma avaliação.',
        variant: 'destructive'
      });
      return;
    }

    if (!newReview.comment.trim()) {
      toast({
        title: 'Comentário obrigatório',
        description: 'Por favor, escreva um comentário sobre o produto.',
        variant: 'destructive'
      });
      return;
    }

    addReview(product.id, {
      userId: user.id,
      userName: user.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    });

    setNewReview({ rating: 5, comment: '' });
    toast({
      title: 'Avaliação enviada',
      description: 'Obrigado por sua avaliação!'
    });
  };

  const averageRating = product.reviews.length > 0 
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : product.rating;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Início</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
            {product.discount && (
              <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                -{product.discount}%
              </Badge>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground mb-4">por {product.seller}</p>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviews.length} avaliações)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-3xl font-bold text-primary">
                  R$ {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    R$ {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                ou em até 12x de R$ {(product.price / 12).toFixed(2)} sem juros
              </p>
            </div>

            {/* Stock */}
            <div className="mb-6">
              <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                {product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}
              </Badge>
            </div>

            {/* Quantity and Add to Cart */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">Quantidade:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={handleAddToCart} className="flex-1">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm">Compra Protegida</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Frete Grátis</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Descrição do Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{product.description}</p>
        </CardContent>
      </Card>

      {/* Reviews */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Avaliações ({product.reviews.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add Review Form */}
          {user && (
            <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-4">Deixe sua avaliação</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Nota:</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                      className="p-1"
                    >
                      <Star
                        className={`h-5 w-5 ${star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Comentário:</label>
                <Textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Conte sobre sua experiência com o produto..."
                  rows={3}
                />
              </div>
              <Button type="submit">Enviar Avaliação</Button>
            </form>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {product.reviews.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Seja o primeiro a avaliar este produto!
              </p>
            ) : (
              product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{review.userName}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPage;