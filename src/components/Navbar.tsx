import { Link } from 'react-router-dom';
import { UtensilsCrossed, ShoppingCart, User } from 'lucide-react';
import { Button } from './ui/Button';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <UtensilsCrossed className="h-6 w-6 text-orange-600" />
            <span className="text-xl font-bold text-gray-900">FoodieHub</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/cart">
              <Button variant="secondary" size="sm">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Cart
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="primary" size="sm">
                <User className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}