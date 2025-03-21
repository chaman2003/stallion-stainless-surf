import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-7xl font-bold text-gold">404</h1>
        <h2 className="text-2xl font-serif mt-4 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          We couldn't find the page you're looking for.
        </p>
        <div className="space-y-4">
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
