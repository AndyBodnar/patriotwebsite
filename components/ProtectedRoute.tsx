'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'USER' | 'ADMIN';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to home if not authenticated
      router.push('/');
    }

    if (!isLoading && isAuthenticated && requiredRole) {
      // Check role permission
      if (user?.role !== requiredRole && user?.role !== 'ADMIN') {
        // Redirect to home if user doesn't have required role
        router.push('/');
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Don't render if role check fails
  if (requiredRole && user?.role !== requiredRole && user?.role !== 'ADMIN') {
    return null;
  }

  return <>{children}</>;
}
