import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// ==================================================================
// INTERFACES (Definem a "forma" dos nossos dados)
// ==================================================================
export interface Produto {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: number;
    stock: number;
    supplierUrl: string;
    supplierPrice: number;
    reviews: Avaliacao[];
    seller: string;
    featured: boolean;
    originalPrice?: number;
    discount?: number;
}
export interface Avaliacao { id: string; userId: string; userName: string; rating: number; comment: string; date: string; }
export interface ItemCarrinho { product: Produto; quantity: number; }
export interface Usuario { id: string; name: string; email: string; phone: string; address: string; isSeller: boolean; avatar?: string; }
export interface Pedido { id: string; userId: string; items: ItemCarrinho[]; total: number; status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'; paymentMethod: string; date: string; shippingAddress: string; }

// ==================================================================
// TIPO DO CONTEXTO (O "contrato" do que nosso contexto fornece)
// ==================================================================
interface MarketplaceContextType {
    products: Produto[];
    cart: ItemCarrinho[];
    user: Usuario | null;
    orders: Pedido[];
    categories: string[];
    loading: boolean;
    error: string | null;
    addProduct: (productData: any) => Promise<boolean>;
    [key: string]: any;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

// ==================================================================
// CONFIGURAÇÕES GLOBAIS
// ==================================================================
const API_PRODUCTS_URL = "http://localhost:8080/api/products";

// LISTA MESTRA DE CATEGORIAS PREDEFINIDAS
const CATEGORIAS_PREDEFINIDAS = [
  'Eletrônicos',
  'Moda e Vestuário',
  'Casa e Cozinha',
  'Esportes e Lazer',
  'Saúde e Bem-estar',
  'Beleza e Cuidados Pessoais',
  'Livros e Mídia',
  'Brinquedos e Jogos',
  'Automotivo',
  'Informática e Periféricos'
];

// ==================================================================
// PROVEDOR DO CONTEXTO (O "coração" da nossa lógica de frontend)
// ==================================================================
export const MarketplaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // --- ESTADOS ---
    const [products, setProducts] = useState<Produto[]>([]);
    // O estado de 'categories' agora usa nossa lista predefinida para os filtros.
    const [categories] = useState<string[]>(['Todas', ...CATEGORIAS_PREDEFINIDAS]);
    const [cart, setCart] = useState<ItemCarrinho[]>([]);
    const [user, setUser] = useState<Usuario | null>(null);
    const [orders, setOrders] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // --- EFEITOS ---
    // O useEffect agora apenas busca os produtos, ele não define mais as categorias.
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Produto[]>(API_PRODUCTS_URL);
                setProducts(response.data);
                setError(null);
            } catch (err) {
                console.error("Erro ao buscar produtos da API:", err);
                setError("Falha ao carregar produtos. Verifique se o backend está no ar.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // --- FUNÇÕES DE API ---
    const addProduct = async (productData: Omit<Produto, 'id' | 'reviews' | 'rating' | 'featured' | 'seller'>): Promise<boolean> => {
        try {
            const response = await axios.post<Produto>(API_PRODUCTS_URL, productData);
            // Adiciona o novo produto retornado pelo backend ao estado local
            setProducts(prev => [...prev, response.data]);
            return true;
        } catch (error) {
            console.error("Erro ao adicionar o produto via API:", error);
            return false;
        }
    };
    
    // --- FUNÇÕES MOCK ---
    const login = async (email: string, password: string): Promise<boolean> => {
        if (email === 'vendedor@teste.com' && password === '123') {
            setUser({ id: '1', name: 'Vendedor Teste', email: 'vendedor@teste.com', isSeller: true, address: 'Rua das Flores, 123', phone: '11999998888' });
            return true;
        }
        return false;
    };
    const logout = () => setUser(null);
    const addToCart = () => console.log('addToCart precisa ser implementado com a API');
    const searchProducts = (query: string): Produto[] => products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    const filterProducts = (category: string): Produto[] => (category === 'Todas' ? products : products.filter(p => p.category === category));


    // Objeto de valor que será fornecido para toda a aplicação
    const value = {
        products,
        cart,
        user,
        orders,
        categories,
        loading,
        error,
        addProduct,
        login,
        logout,
        addToCart,
        searchProducts,
        filterProducts
    };

    return (
        <MarketplaceContext.Provider value={value as MarketplaceContextType}>
            {children}
        </MarketplaceContext.Provider>
    );
};

export const useMarketplace = () => {
    const context = useContext(MarketplaceContext);
    if (context === undefined) {
        throw new Error('useMarketplace deve ser usado dentro de um MarketplaceProvider');
    }
    return context;
};