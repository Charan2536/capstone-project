import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

const RESTAURANT_MENUS: Record<string, MenuItem[]> = {
  "1": [ // Sri Sairam Parlour
    {
      id: 1,
      name: 'Masala Dosa',
      description: 'Crispy dosa with spiced potato filling',
      price: 120,
      image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&q=80&w=800',
      quantity: 0,
    },
    {
      id: 2,
      name: 'Idli Sambar',
      description: 'Steamed rice cakes with lentil soup and chutneys',
      price: 80,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800',
      quantity: 0,
    },
    {
      id: 3,
      name: 'Vada',
      description: 'Crispy lentil doughnuts served with chutney',
      price: 60,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800',
      quantity: 0,
    }
  ],
  "2": [ // Ramaiah Vegetarian Meals
    {
      id: 1,
      name: 'South Indian Thali',
      description: 'Complete meal with rice, curries, and sides',
      price: 180,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800',
      quantity: 0,
    },
    {
      id: 2,
      name: 'Puliyogare',
      description: 'Tamarind flavored rice with peanuts',
      price: 100,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800',
      quantity: 0,
    }
  ],
  "3": [ // Sai Priya Beach Resort
    {
      id: 1,
      name: 'Chicken Biryani',
      description: 'Fragrant rice cooked with spiced chicken',
      price: 280,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800',
      quantity: 0,
    },
    {
      id: 2,
      name: 'Fish Curry',
      description: 'Coastal style fish curry',
      price: 320,
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800',
      quantity: 0,
    }
  ],
  "4": [ // Hotel Daspalla
    {
      id: 1,
      name: 'Butter Chicken',
      description: 'Creamy tomato based chicken curry',
      price: 340,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800',
      quantity: 0,
    },
    {
      id: 2,
      name: 'Paneer Butter Masala',
      description: 'Cottage cheese in rich tomato gravy',
      price: 280,
      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800',
      quantity: 0,
    },
    {
      id: 3,
      name: 'Schezwan Noodles',
      description: 'Spicy Chinese style noodles',
      price: 220,
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800',
      quantity: 0,
    }
  ],
  "5": [ // The Spicy Venue
    {
      id: 1,
      name: 'Andhra Chicken Curry',
      description: 'Spicy Andhra style chicken curry',
      price: 320,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800',
      quantity: 0,
    },
    {
      id: 2,
      name: 'Gongura Mutton',
      description: 'Traditional Andhra mutton with sorrel leaves',
      price: 380,
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800',
      quantity: 0,
    },
    {
      id: 3,
      name: 'Andhra Meals',
      description: 'Complete spicy Andhra thali with pappu, vegetables and more',
      price: 250,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800',
      quantity: 0,
    }
  ]
};

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState<MenuItem[]>([]);

  const menuItems = id ? RESTAURANT_MENUS[id] : [];

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return prevCart.filter((cartItem) => cartItem.id !== item.id);
    });
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart, total: getTotalAmount() } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl font-bold">Menu Items</h2>
          <div className="space-y-4">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="mt-2 font-semibold">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFromCart(item)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">
                    {cart.find((cartItem) => cartItem.id === item.id)?.quantity || 0}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addToCart(item)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky top-4">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-xl font-bold">Your Order</h3>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <>
                <div className="mb-4 space-y-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>₹{(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="mb-4 border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{getTotalAmount()}</span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Proceed to Checkout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}