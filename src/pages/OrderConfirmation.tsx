import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function OrderConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="mb-4 text-2xl font-bold">Order Confirmed!</h2>
        <p className="mb-8 text-gray-600">
          Thank you for your order. We'll send you a confirmation email with your order details.
        </p>
        <Button onClick={() => navigate('/')} className="w-full">
          Return to Home
        </Button>
      </div>
    </div>
  );
}