import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';

const RESTAURANTS = [
  {
    id: 1,
    name: 'Sri Sairam Parlour',
    cuisine: 'South Indian',
    rating: 4.6,
    deliveryTime: '25-35',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    name: 'Ramaiah Vegetarian Meals',
    cuisine: 'South Indian',
    rating: 4.4,
    deliveryTime: '30-40',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    name: 'Sai Priya Beach Resort',
    cuisine: 'Multi-Cuisine',
    rating: 4.7,
    deliveryTime: '35-45',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    name: 'Hotel Daspalla',
    cuisine: 'North Indian & Chinese',
    rating: 4.5,
    deliveryTime: '40-50',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 5,
    name: 'The Spicy Venue',
    cuisine: 'Andhra',
    rating: 4.8,
    deliveryTime: '30-40',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=800',
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleRestaurantClick = (id: number) => {
    navigate(`/restaurant/${id}`);
  };

  const filteredRestaurants = RESTAURANTS.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for restaurants or cuisines..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      </div>

      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Popular Restaurants</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105"
              onClick={() => handleRestaurantClick(restaurant.id)}
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
                <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="flex items-center text-sm text-gray-700">
                    ⭐ {restaurant.rating}
                  </span>
                  <span className="text-sm text-gray-600">{restaurant.deliveryTime} mins</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}