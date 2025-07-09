import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Menu, Package, LogOut, Settings, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useMarketplace } from '@/contexts/MarketplaceContext';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { cart, user, logout, categories } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MarketPlace
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar produtos, marcas e muito mais..."
                  className="pl-10 pr-4 py-2 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            {/* User actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span className="hidden md:inline">Olá, {user.name}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="w-full">
                          <Settings className="h-4 w-4 mr-2" />
                          Minha Conta
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/purchases" className="w-full">
                          <History className="h-4 w-4 mr-2" />
                          Minhas Compras
                        </Link>
                      </DropdownMenuItem>
                      {user.isSeller && (
                        <DropdownMenuItem asChild>
                          <Link to="/admin/products" className="w-full">
                            <Package className="h-4 w-4 mr-2" />
                            Meus Produtos
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="text-destructive">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">Entre ou cadastre-se</span>
                  </Button>
                </Link>
              )}

              <Button variant="ghost" size="sm" className="relative">
                <Heart className="h-4 w-4" />
                <span className="hidden md:inline ml-2">Favoritos</span>
              </Button>

              <Link to="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs">
                      {cartItemsCount}
                    </Badge>
                  )}
                  <span className="hidden md:inline ml-2">Carrinho</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <nav className="border-t py-2">
            <div className="flex items-center space-x-6 overflow-x-auto">
              <Link
                to="/"
                className={`whitespace-nowrap py-2 px-1 text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/') ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
                }`}
              >
                Início
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/?category=${encodeURIComponent(category)}`}
                  className="whitespace-nowrap py-2 px-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {category}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-lg bg-gradient-primary bg-clip-text text-transparent">
                MarketPlace
              </h3>
              <p className="text-sm text-muted-foreground">
                Sua plataforma de e-commerce moderna e segura.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Atendimento</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Central de Ajuda</li>
                <li>Fale Conosco</li>
                <li>Devolução</li>
                <li>Garantia</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sobre</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Quem Somos</li>
                <li>Trabalhe Conosco</li>
                <li>Investidores</li>
                <li>Sustentabilidade</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Segurança</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Compra Segura</li>
                <li>Privacidade</li>
                <li>Termos de Uso</li>
                <li>Políticas</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 MarketPlace. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;